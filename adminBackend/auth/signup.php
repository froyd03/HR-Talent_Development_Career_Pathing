
<?php

  header("Access-Control-Allow-Origin: http://localhost:5173");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: POST");
  header("Content-Type: Application/json");

  function validatePassword($password) {
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    $pattern = "/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&\-])[A-Za-z\d@$!%*?&\-]{8,}$/";

    return preg_match($pattern, $password);
  }

  include("../config/database.php");
  $data = json_decode(file_get_contents("php://input"), true);

  if($_SERVER["REQUEST_METHOD"] === "POST"){
      if(empty($data["name"]) || empty($data["email"]) || empty($data["password"])){
        echo json_encode(["message" => "complete all input fields before submitting."]);
        exit;
      }else{
        $name = mysqli_real_escape_string($connection, $data['name']);
        $email= mysqli_real_escape_string($connection, $data['email']);
        $password = mysqli_real_escape_string($connection, $data['password']);
        $hash = "";
        
        if(validatePassword($password)){
          $hash = password_hash($password, PASSWORD_DEFAULT);
        }else{
          echo json_encode(["message" => "Follow the criteria above."]);
          exit;
        }
        
        try{
          $sql = "INSERT INTO hr_users (name, email, password, role) 
          VALUES('{$name}', '{$email}', '{$hash}', 'admin');";

          $isSuccess = mysqli_query($connection, $sql);

          if($isSuccess){
            echo json_encode(["confirm" => "success"]);
          }
        }catch(mysqli_sql_exception $e){
          echo json_encode(["message" => "email is already registered. try again"]);
        }
        
        mysqli_close($connection);
      }
    }
?>