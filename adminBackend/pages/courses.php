<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
include("../config/database.php");


$sql = "SELECT c.course_id, c.course_name, c.description, c.department, c.duration, c.format, u.name AS created_by
        FROM courses c
        LEFT JOIN hr_users u ON c.created_by = u.HRID";

$result = mysqli_query($connection, $sql);

$courses = [];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $courses[] = $row;
    }
    echo json_encode(["status" => "success", "data" => $courses]);
} else {
    echo json_encode(["status" => "error", "message" => mysqli_error($connection)]);
}

mysqli_close($connection);
?>
