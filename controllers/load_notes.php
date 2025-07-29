<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) { http_response_code(500); echo json_encode(["error" => "Erreur de connexion"]); exit; }

$pin_id = isset($_GET['pin_id']) ? (int)$_GET['pin_id'] : 0;
if ($pin_id <= 0) { http_response_code(400); echo json_encode(["error" => "pin_id manquant"]); exit; }

$stmt = $conn->prepare("SELECT * FROM notes WHERE pin_id = ?");
$stmt->bind_param("i", $pin_id);
$stmt->execute();
$result = $stmt->get_result();

$notes = [];
while ($row = $result->fetch_assoc()) { $notes[] = $row; }

echo json_encode($notes);


