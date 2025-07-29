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

        fetch(`controllers/load_pins.php?image_id=${imageId}`)
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
        <button id="delete-pin-btn" class="btn btn-danger btn-sm">Supprimer ce pin</button>
    `;

            loadNotes(pinData.id);

            // Ajouter l'écoute sur le bouton supprimer
            document.getElementById("delete-pin-btn").addEventListener("click", () => {
                if (confirm("Voulez-vous vraiment supprimer ce pin ?")) {
                    deletePin(pinData.id);
                }
            });
        });

        imageContainer.appendChild(pin);
    }

    function loadNotes(pinId) {
        fetch(`controllers/load_notes.php?pin_id=${pinId}`)
            .then(res => res.json())
            .then(notes => {
                const notesUl = document.getElementById("notes-ul");
                notesUl.innerHTML = "";
                notes.forEach(note => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${note.title}</strong><br>${note.content}`;
                    notesUl.appendChild(li);
                });
            });
    }


    function attachNoteActions() {
        document.querySelectorAll(".edit-note").forEach(btn => {
            btn.addEventListener("click", () => {
                const noteId = btn.dataset.id;
                const currentText = btn.closest("li").querySelector(".note-text").textContent;
                const newText = prompt("Modifier la note :", currentText);
                if (newText !== null) {
                    fetch("controllers/edit_note.php", {
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
                    fetch("controllers/delete_note.php", {
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
        const title = document.getElementById("note-title").value.trim();
        const content = document.getElementById("note-content").value.trim();

        if (!title) {
            alert("Merci de saisir un titre pour la note.");
            return;
        }
        if (!content) {
            alert("Le contenu de la note est vide.");
            return;
        }

        // Exemple d'envoi vers le backend
        fetch("controllers/add_note.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `pin_id=${selectedPinId}&title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // rafraîchir la liste des notes
                    loadNotes(selectedPinId);
                    // réinitialiser les champs
                    document.getElementById("note-title").value = "";
                    document.getElementById("note-content").value = "";
                } else {
                    alert("Erreur lors de l'ajout de la note : " + data.message);
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
        fetch(`controllers/get_image.php?id=${newId}`)
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

        fetch("controllers/add_pin.php", {
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
    function deletePin(id) {
        fetch("controllers/delete_pin.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${encodeURIComponent(id)}`
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Supprimer le pin du DOM
                    const pinToDelete = document.querySelector(`.pin[data-pin-id='${id}']`);
                    if (pinToDelete) pinToDelete.remove();

                    // Nettoyer l'affichage des notes
                    selectedPinId = null;
                    document.getElementById("pin-info").innerHTML = `<h5>Selectionne un pin</h5><p>...</p>`;
                    document.getElementById("notes-ul").innerHTML = "";
                    document.getElementById("note-content").value = "";
                } else {
                    alert("Erreur lors de la suppression du pin : " + data.message);
                }
            })
            .catch(() => alert("Erreur réseau lors de la suppression du pin"));
    }


    loadPins();
    // document.addEventListener("click", (e) => {
    //     const picker = document.getElementById("color-picker");
    //     if (picker && !picker.contains(e.target)) {
    //         picker.remove();
    //     }
    // });

});
