<?php
$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Connexion BDD échouée"]);
    exit;
}

$linkId = intval($_POST['id'] ?? 0);

if ($linkId === 0) {
    echo json_encode(["success" => false, "message" => "ID invalide"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM pin_links WHERE id = ?");
$stmt->bind_param("i", $linkId);
$success = $stmt->execute();

echo json_encode(["success" => $success]);
