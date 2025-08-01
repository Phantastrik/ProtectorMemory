<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur de connexion"]);
    exit;
}

$data = $_POST;
$id = (int)($data["id"] ?? 0);
$title = trim($data["title"] ?? "");
$content = trim($data["content"] ?? "");
if ($id <= 0 || $content === "") {
    http_response_code(400);
    echo json_encode(["error" => "Paramètres invalides"]);
    exit;
}

$stmt = $conn->prepare("UPDATE notes SET content = ?, title = ?, created_at = NOW() WHERE id = ?");
$stmt->bind_param("ssi", $content,$title, $id);
echo json_encode(["success" => $stmt->execute()]);
