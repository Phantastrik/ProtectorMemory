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
    let pinMoveMode = null;
    let links = [];
    const COLORS = [
        { name: "Kiore", value: "#eb9b34" },
        { name: "Bruja", value: "#753b1e" },
        { name: "Curbitus", value: "#7cd121" },
        { name: "Mousseron", value: "#5170d6" },
        { name: "Jardin", value: "#De70d6" },
        { name: "Plaine inondée", value: "#33FFd6" },
        { name: "Village", value: "#222255", label: "🏠" },
        { name: "People", value: "#EEEEAA", label: "👨‍🌾" },
        { name: "Train", value: "#EEEEAA", label: "🚂" },
        { name: "Ruin", value: "#222255", label: "🏛️" },
        { name: "Dark", value: "#222255" },
        { name: "Pelerin", value: "#EEEEAA", label: "👤​" }
    ];

    let imageId = parseInt(image.dataset.imageId);

    // gestion de l'horloge
    const canvas = document.getElementById("clock-canvas");
    const ctx = canvas.getContext("2d");
    const enduranceSelect = document.getElementById("endurance");
    const advanceBtn = document.getElementById("advance-btn");

    let currentIndex = 0;

    function drawClock(endurance, index) {
        const totalSlices = endurance * 2; // jour + nuit
        const radius = canvas.width / 2;
        const sliceAngle = (2 * Math.PI) / totalSlices;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < totalSlices; i++) {
            const start = i * sliceAngle - Math.PI;
            const end = start + sliceAngle;
            ctx.beginPath();
            ctx.moveTo(radius, radius);
            ctx.arc(radius, radius, radius, start, end);
            ctx.closePath();
            ctx.fillStyle = i === index
                ? "#8052713d"
                : (i) < (totalSlices / 2) ? "#c6a520ff" : "#061937ff";
            ctx.fill();
        }
    }


    enduranceSelect.addEventListener("change", () => {
        currentIndex = 0;
        drawClock(parseInt(enduranceSelect.value), currentIndex);
    });

    advanceBtn.addEventListener("click", () => {
        const total = parseInt(enduranceSelect.value) * 2;
        currentIndex = (currentIndex + 1) % total;
        drawClock(parseInt(enduranceSelect.value), currentIndex);
    });

    // Initial draw
    drawClock(parseInt(enduranceSelect.value), currentIndex);

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


        if (pinMoveMode) {

            fetch("controllers/move_pin.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `id=${pinMoveMode}&x=${x}&y=${y}`
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        loadPins();
                        pinMoveMode = null;
                    } else {
                        alert("Erreur lors du déplacement");
                    }
                });

            return; // ⛔ Stop ici, on ne crée pas de nouveau pin
        }

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
        if (pinData.label) {
            pin.textContent = pinData.label;
        }

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
        <button class="btn btn-sm btn-secondary move-pin" data-id="${pinData.id}">Déplacer</button>
        <button class="btn btn-sm btn-warning add-pnj" id="add-pnj-btn" data-id="${pinData.id}">Add PNJ</button>
    `;
            document.querySelector(".move-pin").addEventListener("click", () => {
                enterMoveMode(pinData.id);
            });
            loadNotes(pinData.id);

            // Ajouter l'écoute sur le bouton supprimer
            document.getElementById("delete-pin-btn").addEventListener("click", () => {
                if (confirm("Voulez-vous vraiment supprimer ce pin ?")) {
                    deletePin(pinData.id);
                }
            });
            // Ajouter l'écoute sur le bouton add pnj
            document.getElementById("add-pnj-btn").addEventListener("click", () => {
                choices = {
                    'B' : 'Bruja',
                    'M' : 'Mousseron',
                    'C' : 'Cucurbitus',
                    'K' : 'Kiore',
                    'R' : 'Random'
                };
                choice = prompt(`Peuple : \n - (B)ruja\n - (C)ucurbitus\n - (K)iore\n - (M)ousseron)\n - (R)andom`, "R");
                let peuple = choices[choice];
                addPnj(peuple);
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
            if (color.label) {
                btn.textContent = color.label;

                btn.style.display = "flex";
                btn.style.alignItems = "center";
                btn.style.justifyContent = "center";
                btn.style.fontSize = "14px";
                btn.style.fontWeight = "bold";
            }

            btn.addEventListener("click", () => {
                document.body.removeChild(picker);
                createPinWithColor(color);
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
            body: JSON.stringify({ x, y, image_id: imageId, title, color: color.value, label: color.label })
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    createPinElement({
                        id: data.pin_id,
                        x_percent: x,
                        y_percent: y,
                        title,
                        color: color.value,
                        label: color.label
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
                    // // Supprimer le pin du DOM
                    // const pinToDelete = document.querySelector(`.pin[data-pin-id='${id}']`);
                    // if (pinToDelete) pinToDelete.remove();

                    // // Nettoyer l'affichage des notes
                    // selectedPinId = null;
                    // document.getElementById("pin-info").innerHTML = `<h5>Selectionne un pin</h5><p>...</p>`;
                    // document.getElementById("notes-ul").innerHTML = "";
                    // document.getElementById("note-content").value = "";
                    loadPins();
                } else {
                    alert("Erreur lors de la suppression du pin : " + data.message);
                }
            })
            .catch(() => alert("Erreur réseau lors de la suppression du pin"));
    }

    // DEPLACEMENT DU PIN 
    function enterMoveMode(pinId) {
        pinMoveMode = pinId;
        alert("Cliquez sur la nouvelle position du pin");
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
    //********* PNJ *********//
    //************************//


    const peuples = ["Bruja", "Cucurbitus", "Kiore", "Mousseron"];

    // Placeholder pour les noms (à personnaliser)

    const noms = {
        "Bruja": {
            "1-1": "Agata", "1-2": "Galileo", "1-3": "Carmilla", "1-4": "Lontana", "1-5": "Teresa", "1-6": "Gamilo",
            "2-1": "Delfinio", "2-2": "Ludelia", "2-3": "Daldrida", "2-4": "Keliana", "2-5": "Isonela", "2-6": "Sororia",
            "3-1": "Prisca", "3-2": "Florendino", "3-3": "Cornelio", "3-4": "Margarita", "3-5": "Edna", "3-6": "Arnica",
            "4-1": "Estrella", "4-2": "Sibilia", "4-3": "Falco", "4-4": "Lili", "4-5": "Rosalina", "4-6": "Edita",
            "5-1": "Dalia", "5-2": "Monarda", "5-3": "Enice", "5-4": "Avenca", "5-5": "Gaudi", "5-6": "Abil",
            "6-1": "Dolores", "6-2": "Zolernia", "6-3": "Minerva", "6-4": "Alascavar", "6-5": "Glivina", "6-6": "Adonitan"
        },
        "Cucurbitus": {
            "1-1": "Brubru", "1-2": "Pepo", "1-3": "Yana", "1-4": "Morei", "1-5": "Nobo", "1-6": "Silo",
            "2-1": "Lineu", "2-2": "Bunga", "2-3": "Largo", "2-4": "Mungo", "2-5": "Bodo", "2-6": "Tingo",
            "3-1": "Mimil", "3-2": "Gogum", "3-3": "Bosor", "3-4": "Dido", "3-5": "Nabo", "3-6": "Nilso",
            "4-1": "Belco", "4-2": "Gribo", "4-3": "Tamil", "4-4": "Fanfa", "4-5": "Guila", "4-6": "Dodo",
            "5-1": "Tini", "5-2": "Felca", "5-3": "Cobodo", "5-4": "Tilu", "5-5": "Muni", "5-6": "Jerim",
            "6-1": "Apopo", "6-2": "Rumu", "6-3": "Buqui", "6-4": "Bira", "6-5": "Nunumu", "6-6": "Guito"
        },
        "Kiore": {
            "1-1": "Genus", "1-2": "Tierros", "1-3": "Zabynnu", "1-4": "Laokys", "1-5": "Agafya", "1-6": "Faas",
            "2-1": "Darynius", "2-2": "Vaydi", "2-3": "Uffe", "2-4": "Pavoy", "2-5": "Taavy", "2-6": "Ambroos",
            "3-1": "Oydus", "3-2": "Jaako", "3-3": "Talyko", "3-4": "Oynora", "3-5": "Paroiny", "3-6": "Gyattan",
            "4-1": "Payvoli", "4-2": "Taynnier", "4-3": "Alyx", "4-4": "Veyra", "4-5": "Gyno", "4-6": "Yasanima",
            "5-1": "Yutiku", "5-2": "Tabby", "5-3": "Qiussay", "5-4": "Yaffa", "5-5": "Callisty", "5-6": "Qyadir",
            "6-1": "Myaiar", "6-2": "Javvony", "6-3": "Ellysse", "6-4": "Ozylla", "6-5": "Eujy", "6-6": "Hiiyr"
        },
        "Mousseron": {
            "1-1": "Cremonium", "1-2": "Pahlandii", "1-3": "Asconmta", "1-4": "Armihlli", "1-5": "Sodlpe", "1-6": "Bavorhum",
            "2-1": "Auhdur", "2-2": "Ckaero", "2-3": "Ahmenidis", "2-4": "Isetno", "2-5": "Mektre", "2-6": "Anmetus",
            "3-1": "Teplome", "3-2": "Nimtri", "3-3": "Siobhan", "3-4": "Rhiyrnm", "3-5": "Lrhemuin", "3-6": "Sqervno",
            "4-1": "Bsintio", "4-2": "Kchyinmo", "4-3": "Lchalan", "4-4": "Aeihofe", "4-5": "Aghaltorn", "4-6": "Rhiyrzs",
            "5-1": "Zhaphil", "5-2": "Lybzsi", "5-3": "Ahrtenor", "5-4": "Comvrig", "5-5": "Thautlus", "5-6": "Descevrus",
            "6-1": "Jyihrt", "6-2": "Btonie", "6-3": "Vrymtodius", "6-4": "Hjimo", "6-5": "Tyiuhje", "6-6": "Szlohvven"
        }
    };


    const personnalites = {
        "A": "Enthousiaste",
        "2": "Poétique",
        "3": "Sarcastique",
        "4": "Charismatique",
        "5": "Grincheux",
        "6": "Curieux",
        "7": "Amical",
        "8": "Embarassé",
        "9": "Hatif",
        "10": "Reveur",
        "J": "Tranquille",
        "Q": "Joyeux",
        "K": "Triste"
    };

    const valeurs = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const couleurs = ["♥", "♦", "♣", "♠"];
    const tranchesAge = {
        "♥": "Enfant",
        "♦": "Adolescent",
        "♣": "Adulte",
        "♠": "Ancien"
    };
    const phrases = {
        "A": "Pleure une perte récente",
        "2": "A la recherche de quelque chose",
        "3": "Reve de voyager dans un autre village",
        "4": "Est très malade, lui reste très peu de temps ",
        "5": "Cherche l'amitié - ou peut etre l'amour  ?",
        "6": "Se languit d'un etre cher",
        "7": "Est un cartographe",
        "8": "En train de peindre un tableau",
        "9": "Interessé par les ruine, souhaite en savoir plus",
        "10": "Prononce un nom en errant",
        "J": "Achete des objets venus d'ailleurs",
        "Q": "Ressemble a quelqu'un, deja vu ? ",
        "K": "Est un batisseur"
    }

    function tirerCarte() {
        const couleur = couleurs[Math.floor(Math.random() * 4)];
        const valeur = valeurs[Math.floor(Math.random() * 13)];
        return { valeur, couleur };
    }

    function lancerDe(sides = 6) {
        return Math.floor(Math.random() * sides) + 1;
    }



    function getNewPNJ(peuple) {
        if (peuple === "Random") {
            const d6 = lancerDe();
            if (d6 <= 2) peuple = "Bruja";
            else if (d6 <= 4) peuple = "Cucurbitus";
            else if (d6 === 5) peuple = "Kiore";
            else peuple = "Mousseron";
        }

        // Carte pour âge/personnalité
        const carteAge = tirerCarte();
        const age = tranchesAge[carteAge.couleur];
        const personnalite = personnalites[carteAge.valeur];

        // Carte pour phrase d'accroche
        const cartePhrase = tirerCarte();
        const phrase = phrases[cartePhrase.valeur]
        const phraseAccroche = ` ${cartePhrase.valeur} - ${phrase}`;

        // Lancer 2 dés pour le nom
        const d1 = lancerDe();
        const d2 = lancerDe();
        const cleNom = `${d1}-${d2}`;
        const nom = noms[peuple]?.[cleNom];
        return {
            peuple: peuple,
            name: nom,
            age: age,
            trait: personnalite,
            phrase: phrase,
        };
    }
    function addPnj(peuple) {
        let pnj = getNewPNJ(peuple);
        let title = `[Vilageois] - ${pnj.name} (${pnj.peuple})`;
        let content = `[Nom] : ${pnj.name} \n [peuple] : ${pnj.peuple} \n [age] : ${pnj.age} \n [personalite] : ${pnj.trait} \n [phrase] : ${pnj.phrase}`;
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
                } else {
                    alert("Erreur lors de la creation du PNJ : " + data.message);
                }
            });

    }

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
