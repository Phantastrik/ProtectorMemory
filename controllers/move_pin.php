<?php
$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur de connexion"]);
    exit;
}
$id = intval($_POST['id']);
$x = floatval($_POST['x']);
$y = floatval($_POST['y']);

$stmt = $conn->prepare("UPDATE pins SET x_percent = ?, y_percent = ? WHERE id = ?");
$stmt->bind_param("ddi", $x, $y, $id);
$success = $stmt->execute();

echo json_encode(["success" => $success]);
