<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
include("../../config/database.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit();
}

$session_name   = mysqli_real_escape_string($connection, $data['session_name']);
$department     = mysqli_real_escape_string($connection, $data['department']);
$venue          = mysqli_real_escape_string($connection, $data['venue']);
$session_date   = mysqli_real_escape_string($connection, $data['session_date']); // yyyy-mm-dd
$start_time     = mysqli_real_escape_string($connection, $data['start_time']);   // hh:mm:ss
$end_time       = mysqli_real_escape_string($connection, $data['end_time']);
$trainer_id     = intval($data['trainer_id']);
$max_participants = intval($data['max_participants']);
$description       = mysqli_real_escape_string($connection, $data['description']);

$sql = "INSERT INTO TrainingSessions (`session_name`, `department`, `venue`, `session_date`, `start_time`, `end_time`, `description`, `trainer_id`, `max_participants`) 
        VALUES ('$session_name', '$department', '$venue', '$session_date', '$start_time', '$end_time', '$description', $trainer_id, $max_participants)";

if (mysqli_query($connection, $sql)) {
    echo json_encode(["status" => "success", "message" => "Training session created successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => mysqli_error($connection)]);
}

mysqli_close($connection);
?>
