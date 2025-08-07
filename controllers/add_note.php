<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erreur de connexion"]);
    exit;
}

$pin_id = intval($_POST["pin_id"] ?? 0);
$title = trim($_POST["title"] ?? "");
$content = trim($_POST["content"] ?? "");
$type = trim($_POST["type"] ?? "STD");
if ($pin_id <= 0 || $title === "" || $content === "") {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données invalides"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO notes (pin_id, title, content, type) VALUES (?, ?, ?,?)");
$stmt->bind_param("isss", $pin_id, $title, $content, $type);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erreur SQL"]);
}
