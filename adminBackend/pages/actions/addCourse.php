<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
include("../../config/database.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit();
}

// Escape values to prevent SQL injection
$course_name = mysqli_real_escape_string($connection, $data['course_name']);
$description = mysqli_real_escape_string($connection, $data['description']);
$department  = mysqli_real_escape_string($connection, $data['department']);
$duration    = mysqli_real_escape_string($connection, $data['duration']);
$format      = mysqli_real_escape_string($connection, $data['format']);
//$created_by  = intval($data['created_by']); // numeric

// Insert query
$sql = "INSERT INTO courses (course_name, description, department, duration, format, created_by) 
        VALUES ('$course_name', '$description', '$department', '$duration', '$format', 1)";

if (mysqli_query($connection, $sql)) {
    echo json_encode(["status" => "success", "message" => "Course added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => mysqli_error($connection)]);
}

// Close connection
mysqli_close($connection);
?>
