<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur de connexion"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$id = $data["id"] ?? 0;
$favorite = $data["favorite"] ?? false; 
$label = $data["label"] ?? " "; 

if ($id <= 0 ) {
    http_response_code(400);
    echo json_encode(["error" => "Paramètres invalides"]);
    exit;
}

$stmt = $conn->prepare("UPDATE pins SET favorite = ?, label = ?, created_at = NOW() WHERE id = ?");
$stmt->bind_param("isi", $favorite,$label, $id);
echo json_encode(["success" => $stmt->execute()]);
