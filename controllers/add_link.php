<?php
$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Connexion BDD échouée"]);
    exit;
}

$pin1 = intval($_POST['pin1_id'] ?? 0);
$pin2 = intval($_POST['pin2_id'] ?? 0);
$color = $_POST['color'] ?? '#000000';

if ($pin1 === 0 || $pin2 === 0 || $pin1 === $pin2) {
    echo json_encode(["success" => false, "message" => "Pins invalides"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO pin_links (pin1_id, pin2_id, color) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $pin1, $pin2, $color);
$success = $stmt->execute();

echo json_encode(["success" => $success]);
