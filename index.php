<?php
// Connexion à MySQL
$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Récupère toutes les images pour le menu déroulant
$images = $conn->query("SELECT * FROM images ORDER BY id ASC")->fetch_all(MYSQLI_ASSOC);

// Détermine l’image à afficher (par défaut : première)
$selectedImageId = $_GET['image_id'] ?? $images[0]['id'];
$currentImage = array_filter($images, fn($img) => $img['id'] == $selectedImageId)[0] ?? $images[0];
$imagePath = "images/" . $currentImage['filename'];
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Image avec notes</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="js/app.js" defer></script>
</head>

<body class="p-4">

    <div class="container-fluid">
        <h2 class="mb-3">Protector Memory Hex Pinner</h2>

        <!-- Sélecteur d’image -->
        <div class="row">
            <div class="col mb4">
                <label for="image-select" class="form-label">Choisir une image :</label>
                <select id="image-select" class="form-select w-auto d-inline-block">
                    <?php foreach ($images as $img): ?>
                        <option value="<?= $img['id'] ?>" <?= $img['id'] == $selectedImageId ? 'selected' : '' ?>>
                            <?= htmlspecialchars($img['title'] ?? $img['filename']) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="col mb4">
                <button id="link-mode-btn" class="btn btn-outline-primary mb-2">Relier des pins</button>
            </div>
            <!-- generateur de PNJ -->
            <div class="col mb4">
                <button class="btn btn-outline-primary mb-2" onclick="window.open('PNJ_generator/index.html', '_blank')">Générateur de PNJ</button>

            </div>

            <div class="col mb4" id="clock-container">
                <canvas id="clock-canvas" width="100" height="100"></canvas>
                <div class="controls">
                    <label for="endurance">Endurance :</label>
                    <select id="endurance">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4" selected>4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <button id="advance-btn">Avancer</button>
                </div>
            </div>
        </div>

        <div class="row">

            <div class="col-md-8 position-relative" id="image-container">
                <svg
                    id="connections"
                    class="position-absolute w-100 h-100"
                    style="top: 0; left: 0; pointer-events: none;"></svg>

                <img id="main-image" src="<?= htmlspecialchars($imagePath) ?>" data-image-id="<?= $selectedImageId ?>" alt="Image">

            </div>


            <div class="col-md-4" id="note-list">
                <div id="pin-info" class="mb-3">
                    <h5>Pin sélectionné</h5>
                    <p>...</p>
                </div>
                <div class="card">

                    <div class="card-body">
                        <div class="card-title">
                            <label for="note-title" class="form-label">Titre</label>
                            <input type="text" id="note-title" class="form-control" placeholder="Titre de la note" />
                        </div>
                        <label for="note-content" class="form-label">Contenu</label>
                        <textarea id="note-content" class="form-control" placeholder="Contenu de la note..."></textarea> <br>
                        <button id="add-note-btn" class="btn btn-primary">Ajouter la note</button>
                    </div>
                </div>

                <ul id="notes-ul" class="list-group mb-3"></ul>

            </div>


        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>