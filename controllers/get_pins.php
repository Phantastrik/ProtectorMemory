<?php
$conn = new mysqli("localhost", "root", "", "img_notes");
if ($conn->connect_error) {
    die(json_encode(["error" => "DB error"]));
}

$imageId = intval($_GET["image_id"] ?? 0);
$sql = "SELECT * FROM pins WHERE image_id = $imageId";
$result = $conn->query($sql);
var_dump($result);
$pins = [];
while ($row = $result->fetch_assoc()) {
    $pins[] = [
        "id" => $row["id"],
        "x_percent" => floatval($row["x_percent"]),
        "y_percent" => floatval($row["y_percent"]),
        "title" => $row["title"],
        "color" => $row["color"],
        "label" => $row["label"],
    ];
}

echo json_encode(["pins" => $pins]);
