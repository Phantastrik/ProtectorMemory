<?php
// Connexion à MySQL
$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur de connexion BDD"]);
    exit;
}

$imageId = isset($_GET['image_id']) ? intval($_GET['image_id']) : 0;

$sql = "
    SELECT l.id, l.color, 
           l.pin1_id, p1.x_percent AS x1, p1.y_percent AS y1,
           l.pin2_id, p2.x_percent AS x2, p2.y_percent AS y2
    FROM pin_links l
    JOIN pins p1 ON l.pin1_id = p1.id
    JOIN pins p2 ON l.pin2_id = p2.id
    WHERE p1.image_id = ? AND p2.image_id = ?
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $imageId, $imageId);
$stmt->execute();
$result = $stmt->get_result();

$links = [];
while ($row = $result->fetch_assoc()) {
    $links[] = $row;
}

header('Content-Type: application/json');
echo json_encode($links);
