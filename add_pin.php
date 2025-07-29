<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur de connexion"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['x']) || !isset($data['y']) || !isset($data['image_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Paramètres manquants"]);
    exit;
}

// Récupérer title et color, mettre des valeurs par défaut si absent
$title = isset($data['title']) ? $data['title'] : null;
$color = isset($data['color']) ? $data['color'] : '#ff0000';

// Préparation et exécution de la requête
$stmt = $conn->prepare("INSERT INTO pins (x_percent, y_percent, image_id, title, color) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ddiss", $data['x'], $data['y'], $data['image_id'], $title, $color);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "pin_id" => $stmt->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Erreur SQL : " . $conn->error]);
}
