<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) { http_response_code(500); echo json_encode(["error" => "Erreur de connexion"]); exit; }

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['pin_id']) || !isset($data['content'])) {
  http_response_code(400);
  echo json_encode(["error" => "Paramètres manquants"]);
  exit;
}

$pin_id = (int)$data['pin_id'];
$content = $data['content'];

$stmt = $conn->prepare("INSERT INTO notes (pin_id, content) VALUES (?, ?)");
$stmt->bind_param("is", $pin_id, $content);
if ($stmt->execute()) {
  echo json_encode(["success" => true, "note_id" => $stmt->insert_id]);
} else {
  http_response_code(500);
  echo json_encode(["error" => "Erreur SQL"]);
}
