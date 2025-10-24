<?php 
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true"); // <-- THIS IS REQUIRED FOR SESSIONS!
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Stop PHP from continuing for OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include("../config/database.php");    


$data = json_decode(file_get_contents("php://input"), true);

if($_SERVER["REQUEST_METHOD"] === "POST"){
  if(isset($data["email"]) && isset($data["password"])){
      
    $email= mysqli_real_escape_string($connection, $data['email']);
    $password = mysqli_real_escape_string($connection, $data['password']);
    $sql = "SELECT * FROM hr_users WHERE email = '{$email}'";

    try{
      $result = mysqli_query($connection, $sql);
      $row = mysqli_fetch_assoc($result);

      if(mysqli_num_rows($result) == 0){
        echo json_encode(["error" => "Incorrect username & password."]);
        exit;
      }

      if(password_verify($password, $row["password"])){
        // ✅ Set session BEFORE echo
        $_SESSION["isAuthenticated"] = true;
        $_SESSION["id"] = $row["HRID"];

        echo json_encode([
          "isAuthenticated" => true,
          "sessionStored" => $_SESSION // Optional for debugging
        ]);
      } else {
        echo json_encode(["error" => "Incorrect username & password."]);
      }

    } catch(mysqli_sql_exception $e){
      echo json_encode(["error" => $e->getMessage()]);
    }

  } else {
    echo json_encode(["error" => "Complete all fields before submitting."]);
  }
}
