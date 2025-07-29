<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erreur de connexion"]);
    exit;
}

$id = intval($_POST["id"] ?? 0);
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "ID invalide"]);
    exit;
}

// Supprimer les notes associées au pin d'abord (si besoin)
$conn->query("DELETE FROM notes WHERE pin_id = $id");

// Puis supprimer le pin
if ($conn->query("DELETE FROM pins WHERE id = $id")) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erreur SQL"]);
}
