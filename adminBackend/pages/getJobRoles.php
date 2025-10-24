<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
include("../config/database.php");

$sql = "SELECT jr.JRID, jr.role_name, jr.description, jr.department, 
               c.CID, c.competency_name AS competency_name, c.type 
        FROM job_roles jr
        LEFT JOIN role_competencies rc ON jr.JRID = rc.JRID
        LEFT JOIN competencies c ON rc.CID = c.CID
        ORDER BY jr.JRID";

$result = mysqli_query($connection, $sql);

$roles = [];
while ($row = mysqli_fetch_assoc($result)) {
    $role_id = $row['JRID'];

    if (!isset($roles[$role_id])) {
        $roles[$role_id] = [
            "role_id" => $role_id,
            "role_name" => $row['role_name'],
            "description" => $row['description'],
            "department" => $row['department'],
            "skills" => [],
            "behavior" => [],
            "knowldge" => []
        ];
    }

    if ($row['competency_name']) {
        $roles[$role_id][$row['type']][] = $row['competency_name'];
    }
}

echo json_encode(array_values($roles));
mysqli_close($connection);
?>
