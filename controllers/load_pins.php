<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur de connexion"]);
    exit;
}

$image_id = isset($_GET['image_id']) ? (int)$_GET['image_id'] : 0;
if ($image_id <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Paramètre image_id manquant ou invalide"]);
    exit;
}

$stmt = $conn->prepare("SELECT id, x_percent, y_percent, title, color, label FROM pins WHERE image_id = ?");
$stmt->bind_param("i", $image_id);
$stmt->execute();
$result = $stmt->get_result();

$pins = [];
while ($row = $result->fetch_assoc()) {
    $pins[] = $row;
}

echo json_encode($pins);
