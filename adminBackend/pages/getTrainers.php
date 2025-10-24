<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
include("../config/database.php");


$sql = "SELECT trainer_id, name, email, is_external FROM trainer";
$result = mysqli_query($connection, $sql);

$trainers = [];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $trainers[] = $row;
    }
    echo json_encode(["status" => "success", "data" => $trainers]);
} else {
    echo json_encode(["status" => "error", "message" => mysqli_error($connection)]);
}

mysqli_close($connection);
?>
