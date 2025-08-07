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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
    <link rel="stylesheet" href="style.css">

    <script src="js/app.js" defer></script>
</head>

<body class="p-0 bg-dark">

    <div class="container-fluid">
        <!-- NAVBAR -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <!-- Titre -->
                <a class="navbar-brand" href="#">Protector Memory</a>

                <!-- Bouton hamburger (mobile) -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
                    aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Contenu de la navbar -->
                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">

                        <!-- Choix d'image -->
                        <li class="nav-item me-3">
                            <label for="image-select" class="form-label text-white mb-0 me-2">Choisir une image :</label>
                            <select id="image-select" class="form-select form-select-sm d-inline-block w-auto">
                                <?php foreach ($images as $img): ?>
                                    <option value="<?= $img['id'] ?>" <?= $img['id'] == $selectedImageId ? 'selected' : '' ?>>
                                        <?= htmlspecialchars($img['title'] ?? $img['filename']) ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </li>

                        <!-- Bouton relier des pins -->
                        <li class="nav-item me-3">
                            <button id="link-mode-btn" class="btn btn-outline-light btn-sm">Relier des pins</button>
                        </li>

                        <!-- Générateur de PNJ -->
                        <li class="nav-item me-3">
                            <button class="btn btn-outline-light btn-sm"
                                onclick="window.open('PNJ_generator/index.html', '_blank')">Générateur de PNJ</button>
                        </li>
                    </ul>

                    <!-- Horloge à droite -->
                    <div class="d-flex align-items-center text-white" id="clock-container">
                        <canvas id="clock-canvas" width="80" height="80"></canvas>
                        <div class="ms-3 controls">
                            <label for="endurance" class="form-label mb-0 me-1">Endurance :</label>
                            <select id="endurance" class="form-select form-select-sm d-inline-block w-auto me-2">
                                <?php for ($i = 1; $i <= 6; $i++): ?>
                                    <option value="<?= $i ?>" <?= $i == 4 ? 'selected' : '' ?>><?= $i ?></option>
                                <?php endfor; ?>
                            </select>
                            <button id="advance-btn" class="btn btn-sm btn-outline-light">Avancer</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>



        <div class="row">

            <div class="col-md-8 position-relative bg-dark" id="image-container">
                <svg
                    id="connections"
                    class="position-absolute w-100 h-100"
                    style="top: 0; left: 0; pointer-events: none;"></svg>

                <img id="main-image" src="<?= htmlspecialchars($imagePath) ?>" data-image-id="<?= $selectedImageId ?>" alt="Image">

            </div>



            <div class="col-md-4" id="note-list">

                <div class="card mb-3 shadow-sm bg-secondary" id="pin-info">
                    <div class="card-body">
                        <h5 class="card-title text-light">
                            <i class="bi bi-geo-alt-fill me-2 text-light"></i>Selectionner un Pin
                        </h5>

                    </div>
                </div>

                <!-- <div class="card p-2 bg-secondary">

                    <div class="card-body text-light">
                        <div class="card-title">
                            <label for="note-title" class="form-label">Titre</label>
                            <input type="text" id="note-title" class="form-control" placeholder="Titre de la note" />
                        </div>
                        <label for="note-content" class="form-label">Contenu</label>
                        <textarea id="note-content" class="form-control" placeholder="Contenu de la note..."></textarea> <br>
                        <button id="add-note-btn" class="btn btn-primary">Ajouter la note</button>
                    </div>
                </div> -->
                <div class="card bg-secondary text-light shadow-sm mb-3" id="edit-note-container" hidden="true">
                    <div class="card-body">

                        <!-- Titre cliquable -->
                        <h5 class="card-title mb-2" data-bs-toggle="collapse" href="#note-form-collapse" role="button" aria-expanded="true" aria-controls="note-form-collapse" style="cursor: pointer;"
                        id="edit-note-title">
                            <i class="bi bi-journal-plus me-2"></i>Nouvelle note
                            <i class="bi bi-chevron-down float-end"></i>
                        </h5>

                        <!-- Contenu repliable -->
                        <div class="collapse" id="note-form-collapse">
                            <!-- Titre de la note -->
                            <div class="input-group mb-1">
                                <span class="input-group-text bg-dark text-light" id="note-title-label">
                                    <i class="bi bi-bookmark-fill"></i>
                                </span>
                                <input type="text" id="note-title" class="form-control" placeholder="Titre de la note"
                                    aria-label="Titre de la note" aria-describedby="note-title-label">
                            </div>

                            <!-- Contenu de la note -->
                            <div class="input-group mb-2">
                                <span class="input-group-text bg-dark text-light" id="note-content-label">
                                    <i class="bi bi-card-text"></i>
                                </span>
                                <textarea id="note-content" class="form-control" rows="5" placeholder="Contenu de la note"
                                    aria-label="Contenu de la note" aria-describedby="note-content-label"></textarea>
                            </div>

                            <!-- Bouton Ajouter -->
                            <button id="add-note-btn" class="btn btn-success">
                                <i class="bi bi-plus-circle me-1"></i> 
                            </button>
                        </div>

                    </div>
                </div>




                <ul id="notes-ul" class="list-group m-0"></ul>

            </div>


        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>