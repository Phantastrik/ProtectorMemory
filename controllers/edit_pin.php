<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur de connexion"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$id = (int)($data["id"] ?? 0);
$content = trim($data["content"] ?? "");

if ($id <= 0 || $content === "") {
    http_response_code(400);
    echo json_encode(["error" => "Paramètres invalides"]);
    exit;
}

$stmt = $conn->prepare("UPDATE notes SET content = ?, updated_at = NOW() WHERE id = ?");
$stmt->bind_param("si", $content, $id);
echo json_encode(["success" => $stmt->execute()]);
