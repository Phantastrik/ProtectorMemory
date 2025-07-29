document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("image-container");
    const image = document.getElementById("main-image");
    const imageSelect = document.getElementById("image-select");
    const noteList = document.getElementById("note-list");
    let selectedPinId = null;

    const COLORS = [
        { name: "Rouge", value: "#ff4b4b" },
        { name: "Bleu", value: "#4b7bff" },
        { name: "Vert", value: "#28a745" },
        { name: "Jaune", value: "#ffc107" },
        { name: "Violet", value: "#a347ff" }
    ];

    let imageId = parseInt(image.dataset.imageId);

    function loadPins() {
        // Supprimer les anciens pins
        imageContainer.querySelectorAll(".pin").forEach(pin => pin.remove());

        fetch(`load_pins.php?image_id=${imageId}`)
            .then(res => res.json())
            .then(pins => {
                pins.forEach(pinData => {
                    createPinElement(pinData);
                });
            });
    }

    function createPinElement(pinData) {
        const pin = document.createElement("div");
        pin.classList.add("pin");
        pin.style.left = `${pinData.x_percent}%`;
        pin.style.top = `${pinData.y_percent}%`;
        pin.style.backgroundColor = pinData.color || "#ff0000";
        pin.title = pinData.title || "";
        pin.dataset.pinId = pinData.id;

        pin.addEventListener("click", function (event) {
            event.stopPropagation();
            selectedPinId = pinData.id;

            document.getElementById("pin-info").innerHTML = `
                <h5>${pinData.title || "Sans titre"}</h5>
                <p>Coordonnées : ${pinData.x_percent.toFixed(2)}%, ${pinData.y_percent.toFixed(2)}%</p>
            `;
            loadNotes(pinData.id);
        });

        imageContainer.appendChild(pin);
    }

    function loadNotes(pinId) {
        fetch(`load_notes.php?pin_id=${pinId}`)
            .then(res => res.json())
            .then(notes => {
                const ul = document.getElementById("notes-ul");
                ul.innerHTML = "";
                notes.forEach(note => {
                    const li = document.createElement("li");
                    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                    li.innerHTML = `
                        <span class="note-text">${note.content}</span>
                        <span>
                            <button class="btn btn-sm btn-outline-primary edit-note" data-id="${note.id}">✏️</button>
                            <button class="btn btn-sm btn-outline-danger delete-note" data-id="${note.id}">🗑️</button>
                        </span>
                    `;
                    ul.appendChild(li);
                });

                attachNoteActions();
            });
    }

    function attachNoteActions() {
        document.querySelectorAll(".edit-note").forEach(btn => {
            btn.addEventListener("click", () => {
                const noteId = btn.dataset.id;
                const currentText = btn.closest("li").querySelector(".note-text").textContent;
                const newText = prompt("Modifier la note :", currentText);
                if (newText !== null) {
                    fetch("edit_note.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: noteId, content: newText })
                    }).then(res => res.json())
                        .then(data => data.success && loadNotes(selectedPinId));
                }
            });
        });

        document.querySelectorAll(".delete-note").forEach(btn => {
            btn.addEventListener("click", () => {
                const noteId = btn.dataset.id;
                if (confirm("Supprimer cette note ?")) {
                    fetch("delete_note.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: noteId })
                    }).then(res => res.json())
                        .then(data => data.success && loadNotes(selectedPinId));
                }
            });
        });
    }

    document.getElementById("add-note-btn").addEventListener("click", () => {
        const content = document.getElementById("note-content").value.trim();
        if (!content || !selectedPinId) return;

        fetch("add_note.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pin_id: selectedPinId, content })
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("note-content").value = "";
                    loadNotes(selectedPinId);
                }
            });
    });

    imageContainer.addEventListener("click", (e) => {
        const rect = image.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Demande le titre
        const title = prompt("Titre du pin :", "Mon pin");
        if (title === null) return;

        pendingPinCoords = { x, y, title };

        showColorPicker(e.clientX, e.clientY);

    });

    // Changement d’image via le sélecteur
    imageSelect.addEventListener("change", () => {
        const newId = parseInt(imageSelect.value);
        imageId = newId;
        selectedPinId = null;

        // Recharge image
        fetch(`get_image.php?id=${newId}`)
            .then(res => res.json())
            .then(data => {
                image.src = "images/" + data.filename;
                image.dataset.imageId = newId;
                loadPins();
                document.getElementById("pin-info").innerHTML = "<h5>Pin sélectionné</h5><p>...</p>";
                document.getElementById("notes-ul").innerHTML = "";
            });
    });

    function showColorPicker(x, y) {
        // Supprimer l'existant
        const existing = document.getElementById("color-picker");
        if (existing) existing.remove();

        const picker = document.createElement("div");
        picker.id = "color-picker";
        picker.style.position = "fixed";
        picker.style.top = `${y}px`;
        picker.style.left = `${x}px`;
        picker.style.background = "#fff";
        picker.style.border = "1px solid #ccc";
        picker.style.padding = "8px";
        picker.style.borderRadius = "6px";
        picker.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
        picker.style.zIndex = "9999";
        picker.style.display = "flex";
        picker.style.gap = "6px";

        COLORS.forEach(color => {
            const btn = document.createElement("div");
            btn.style.backgroundColor = color.value;
            btn.title = color.name;
            btn.style.width = "24px";
            btn.style.height = "24px";
            btn.style.borderRadius = "50%";
            btn.style.cursor = "pointer";
            btn.style.border = "2px solid #ddd";
            btn.addEventListener("click", () => {
                document.body.removeChild(picker);
                createPinWithColor(color.value);
            });
            picker.appendChild(btn);
        });

        document.body.appendChild(picker);
    }

    function createPinWithColor(color) {
        const { x, y, title } = pendingPinCoords;
        if (!title) return;

        fetch("add_pin.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ x, y, image_id: imageId, title, color })
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    createPinElement({
                        id: data.pin_id,
                        x_percent: x,
                        y_percent: y,
                        title,
                        color
                    });
                }
            });
    }

    loadPins();
    // document.addEventListener("click", (e) => {
    //     const picker = document.getElementById("color-picker");
    //     if (picker && !picker.contains(e.target)) {
    //         picker.remove();
    //     }
    // });

});
