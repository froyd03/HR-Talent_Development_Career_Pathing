<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
include("../config/database.php");

$sql = "SELECT ts.session_id, ts.session_name, ts.venue, ts.session_date, ts.start_time, ts.end_time,
               ts.total_enrolled, ts.max_participants,
               t.name AS trainer_name, t.is_external
        FROM TrainingSessions ts
        LEFT JOIN trainer t ON ts.trainer_id = t.trainer_id
        ORDER BY ts.session_date DESC";

$result = mysqli_query($connection, $sql);

$sessions = [];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $sessions[] = $row;
    }
    echo json_encode(["status" => "success", "data" => $sessions]);
} else {
    echo json_encode(["status" => "error", "message" => mysqli_error($connection)]);
}

mysqli_close($connection);
?>
