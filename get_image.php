<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "img_notes");
$id = (int)($_GET['id'] ?? 0);

$result = $conn->query("SELECT filename FROM images WHERE id = $id LIMIT 1");
if ($row = $result->fetch_assoc()) {
    echo json_encode(["filename" => $row["filename"]]);
} else {
    http_response_code(404);
    echo json_encode(["error" => "Image non trouvée"]);
}
