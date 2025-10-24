<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
include("../../config/database.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

// Get JSON body
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit();
}

$role_name = mysqli_real_escape_string($connection, $data['role_name']);
$description = mysqli_real_escape_string($connection, $data['description']);
$department = mysqli_real_escape_string($connection, $data['department']);
$skills = $data['skills'];
$behaviors = $data['behaviors'];
$knowledge = $data['knowldge'];

// Insert Job Role
$sql = "INSERT INTO job_roles (role_name, description, department) 
        VALUES ('$role_name', '$description', '$department')";
if (mysqli_query($connection, $sql)) {
    $role_id = mysqli_insert_id($connection);

    // Helper function to insert competencies
    function insertCompetencies($connection, $items, $type, $role_id) {
        foreach ($items as $item) {
            $item = mysqli_real_escape_string($connection, $item);

            // Check if competency already exists
            $check = mysqli_query($connection, "SELECT CID FROM competencies WHERE competency_name='$item' AND type='$type'");
            if (mysqli_num_rows($check) > 0) {
                $row = mysqli_fetch_assoc($check);
                $competency_id = $row['CID'];
            } else {
                // Insert new competency
                mysqli_query($connection, "INSERT INTO competencies (type, competency_name) VALUES ('$type', '$item')");
                $competency_id = mysqli_insert_id($connection);
            }

            // Link role to competency
            mysqli_query($connection, "INSERT INTO role_competencies (JRID, CID) VALUES ($role_id, $competency_id)");
        }
    }

    insertCompetencies($connection, $skills, "skills", $role_id);
    insertCompetencies($connection, $behaviors, "behavior", $role_id);
    insertCompetencies($connection, $knowledge, "knowldge", $role_id);

    $response["status"] = "success";
    $response["message"] = "Job role and competencies added successfully";
} else {
    $response["message"] = "Error: " . mysqli_error($connection);
}

echo json_encode($response);
mysqli_close($connection);
?>
