document.addEventListener("DOMContentLoaded", () => {

    //*************************//
    //******DECLARATIONS*******//
    //*************************//

    const imageContainer = document.getElementById("image-container");
    const image = document.getElementById("main-image");
    const imageSelect = document.getElementById("image-select");
    const noteList = document.getElementById("note-list");
    let selectedPinId = null;
    let linkMode = false;
    let linkStartPin = null;
    let links = [];
    const COLORS = [
        { name: "Kiore", value: "#eb9b34" },
        { name: "Bruja", value: "#753b1e" },
        { name: "Curbitus", value: "#7cd121" },
        { name: "Mousseron", value: "#5170d6" },
        { name: "Jardin", value: "#De70d6" },
        { name: "Plaine inondée", value: "#33FFd6" },
        { name: "Dark", value: "#222255" },
        { name: "Light", value: "#CCCCAA" }
    ];

    let imageId = parseInt(image.dataset.imageId);

    //*******************************//
    // FONCTIONS CONCERNANT LES PINS //
    //*******************************//

    // LOAD //
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
        loadLinks();
    }
    // LISTENER CREATION // 
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

    // CREATION //
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
            if (linkMode) {
                if (!linkStartPin) {
                    linkStartPin = pinData;
                } else if (linkStartPin.id !== pinData.id) {
                    // On garde en mémoire les pins à relier
                    pendingLink = {
                        from: linkStartPin.id,
                        to: pinData.id
                    };
                    // Affiche le color picker à la position du clic
                    showLinkColorPicker(event.clientX, event.clientY);
                }
                return; // Sortir du handler si en mode lien
            }


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

    // COLOR PICKER CREATION PIN //
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

    // CREATION DU PIN AVEC LA COULEUR CHOISIE // 
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


    // SUPPRESSION DU PIN //
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

    //**********************************//
    //*******LIENS ENTRE LES PINS*******//
    //**********************************//

    function loadLinks() {
        const svg = document.getElementById("connections");
        svg.innerHTML = ""; // Nettoyer les anciennes lignes
        links = [];
        fetch(`controllers/load_links.php?image_id=${imageId}`)
            .then(res => res.json())
            .then(data => {
                data.forEach(link => {
                    links.push(link);
                    drawConnection(link);
                });
            });
    }
    function drawConnection(link) {
        const svg = document.getElementById("connections");
        const image = document.getElementById("main-image");

        // Met à jour la taille et viewBox du SVG
        const rect = image.getBoundingClientRect();
        svg.style.width = rect.width + "px";
        svg.style.height = rect.height + "px";
        svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);

        // Récupérer les éléments pins (par ex via leurs ids stockés dans link)
        const pin1 = document.querySelector(`.pin[data-pin-id="${link.pin1_id}"]`);
        const pin2 = document.querySelector(`.pin[data-pin-id="${link.pin2_id}"]`);

        if (!pin1 || !pin2) return;


        const x1Percent = parseFloat(pin1.style.left);  // déjà en %
        const y1Percent = parseFloat(pin1.style.top);
        const x2Percent = parseFloat(pin2.style.left);
        const y2Percent = parseFloat(pin2.style.top);

        const x1 = (x1Percent / 100) * rect.width;
        const y1 = (y1Percent / 100) * rect.height;
        const x2 = (x2Percent / 100) * rect.width;
        const y2 = (y2Percent / 100) * rect.height;

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", link.color || "#000");
        line.setAttribute("stroke-width", "2");

        svg.appendChild(line);
    }

    document.getElementById("link-mode-btn").addEventListener("click", () => {
        linkMode = !linkMode;
        linkStartPin = null;

        const btn = document.getElementById("link-mode-btn");
        btn.classList.toggle("btn-primary", linkMode);
        btn.classList.toggle("btn-outline-primary", !linkMode);
        btn.textContent = linkMode ? "Sélectionner 2 pins..." : "Relier des pins";
    });

    function saveLink(pin1_id, pin2_id, color) {
        fetch("controllers/add_link.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `pin1_id=${pin1_id}&pin2_id=${pin2_id}&color=${encodeURIComponent(color)}`
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    loadLinks();
                } else {
                    alert("Erreur lors de l’enregistrement du lien.");
                }
            })
            .catch(() => alert("Erreur réseau lors de la création du lien"));
    }
    function updateSVGViewBox() {
        const svg = document.getElementById("connections");
        const image = document.getElementById("main-image");
        const rect = image.getBoundingClientRect();

        svg.style.width = rect.width + "px";
        svg.style.height = rect.height + "px";

        svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
    }
    function redrawLinks() {
        const svg = document.getElementById("connections");
        // Vider le SVG (toutes les lignes précédentes)
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        // Re-dessiner toutes les connections
        for (const link of links) {
            console.log("draw link from redraw");
            drawConnection(link);
        }
    }


    function showLinkColorPicker(x, y) {
        // Supprime l'ancien picker s'il existe
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
                createLinkWithColor(color.value);
            });
            picker.appendChild(btn);
        });

        document.body.appendChild(picker);
    }


    function createLinkWithColor(color) {
        if (!pendingLink) return;

        saveLink(pendingLink.from, pendingLink.to, color);

        // Reset l'état
        pendingLink = null;
        linkStartPin = null;
        linkMode = false;

        const btn = document.getElementById("link-mode-btn");
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline-primary");
        btn.textContent = "Relier des pins";
    }


    //********************************//
    // FONCTIONS CONCERNANT LES NOTES //
    //********************************//
    // LOAD //
    function loadNotes(pinId) {
        fetch(`controllers/load_notes.php?pin_id=${pinId}`)
            .then(res => res.json())
            .then(notes => {
                const notesUl = document.getElementById("notes-ul");
                notesUl.innerHTML = "";

                notes.forEach(note => {
                    const li = document.createElement("div");
                    li.classList.add("note-item");
                    const formattedContent = note.content.replace(/\n/g, "<br>");


                    li.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${note.title}</h5>
                    <p class="card-text">${formattedContent}</p>
                    <button class="btn btn-sm btn-warning edit-note" data-id="${note.id}">Modifier</button>
                    <button class="btn btn-sm btn-danger delete-note" data-id="${note.id}">Supprimer</button>
                </div>
            </div>
            `;

                    notesUl.appendChild(li);
                });

                // Ajouter les écouteurs pour modifier
                document.querySelectorAll(".edit-note").forEach(button => {
                    button.onclick = () => {
                        const noteId = button.dataset.id;
                        const card = button.closest(".card-body");
                        const title = card.querySelector(".card-title").innerText;
                        const content = card.querySelector(".card-text").innerText;

                        document.getElementById("note-title").value = title;
                        document.getElementById("note-content").value = content;
                        document.getElementById("add-note-btn").innerText = "Modifier";

                        document.getElementById("add-note-btn").onclick = () => noteEditListener(noteId);
                    };
                });

                // Écouteurs pour supprimer
                document.querySelectorAll(".delete-note").forEach(button => {
                    button.addEventListener("click", () => {
                        const noteId = button.dataset.id;
                        if (confirm("Supprimer cette note ?")) {
                            fetch("controllers/delete_note.php", {
                                method: "POST",
                                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                                body: `id=${noteId}`
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.success) {
                                        loadNotes(selectedPinId);
                                    } else {
                                        alert("Erreur de suppression");
                                    }
                                });
                        }
                    });
                });
                document.getElementById("add-note-btn").onclick = noteCreationListener;
            });
    }
    function noteEditListener(noteId) {
        const newTitle = document.getElementById("note-title").value.trim();
        const newContent = document.getElementById("note-content").value.trim();

        if (!newTitle || !newContent) return alert("Titre ou contenu vide.");

        fetch("controllers/edit_note.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${noteId}&title=${encodeURIComponent(newTitle)}&content=${encodeURIComponent(newContent)}`
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    loadNotes(selectedPinId);
                    document.getElementById("note-title").value = "";
                    document.getElementById("note-content").value = "";
                    document.getElementById("add-note-btn").innerText = "Ajouter la note";
                    document.getElementById("add-note-btn").onclick = () => noteCreationListener();

                } else {
                    alert("Erreur de modification");
                }
            });
    }
    // LISTENER CREATION //
    document.getElementById("add-note-btn").onclick = noteCreationListener;
    function noteCreationListener() {
        const title = document.getElementById("note-title").value.trim();
        const content = document.getElementById("note-content").value.trim();
        if (!selectedPinId) {
            alert("Choisir un pin");
            return;
        }

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
    }

    //***************************************//
    // FONCTIONS CONCERNANT L'IMAGE DE FOND' //
    //***************************************//

    // LISTENER CHANGEMENT IMAGE //
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
                updateSVGViewBox();
            });


    });
    window.addEventListener("resize", () => {
        updateSVGViewBox();
        redrawLinks();
    });
    //************************//
    //********* MAIN *********//
    //************************//

    loadPins();

    // document.addEventListener("click", (e) => {
    //     const picker = document.getElementById("color-picker");
    //     if (picker && !picker.contains(e.target)) {
    //         picker.remove();
    //     }
    // });
});
