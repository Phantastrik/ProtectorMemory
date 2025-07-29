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
        <h2 class="mb-3">Notes sur image</h2>

        <!-- Sélecteur d’image -->
        <div class="mb-3">
            <label for="image-select" class="form-label">Choisir une image :</label>
            <select id="image-select" class="form-select w-auto d-inline-block">
                <?php foreach ($images as $img): ?>
                    <option value="<?= $img['id'] ?>" <?= $img['id'] == $selectedImageId ? 'selected' : '' ?>>
                        <?= htmlspecialchars($img['title'] ?? $img['filename']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="row">
            <div class="col-md-8 position-relative" id="image-container">
                <img id="main-image" src="<?= htmlspecialchars($imagePath) ?>" data-image-id="<?= $selectedImageId ?>" alt="Image">

            </div>

            <div class="col-md-4" id="note-list">
                <div id="pin-info" class="mb-3">
                    <h5>Pin sélectionné</h5>
                    <p>...</p>
                </div>

                <ul id="notes-ul" class="list-group mb-3"></ul>

                <div class="mb-2">
                    <input type="text" id="note-title" placeholder="Titre de la note" />
                    <textarea id="note-content" placeholder="Contenu de la note..."></textarea>
                    <button id="add-note-btn">Ajouter la note</button>
                </div>

            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>