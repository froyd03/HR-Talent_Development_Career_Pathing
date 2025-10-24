<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
include("../../config/database.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo json_encode(["status" => "error", "message" => "Invalid input"]);
        exit();
    }

    $name        = mysqli_real_escape_string($connection, $data['name']);
    $email       = mysqli_real_escape_string($connection, $data['contact']);
    $is_external = mysqli_real_escape_string($connection, $data['is_external']);

    // Insert trainer
    $sql = "INSERT INTO trainer (name, email, is_external) 
            VALUES ('$name', '$email', $is_external)";

    if (mysqli_query($connection, $sql)) {
        echo json_encode(["status" => "success", "message" => "Trainer added successfully"]);
    } else {
        echo json_encode(["status" => "failed", "error" => mysqli_error($connection)]);
    }

    mysqli_close($connection);
}
?>
