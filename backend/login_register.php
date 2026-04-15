<?php

require_once "configDB.php";


function credentialsValidationLogin($username,$password){
    $connection = $GLOBALS['conn'];
    $validUser = false;
    $result = [
        'success' => $validUser,
        'role' => ''
    ];

 $checkUser = $connection->query("SELECT * FROM system_users WHERE username = '$username'");
    if($checkUser->num_rows > 0){
        $user = $checkUser->fetch_assoc();

        if($password === $user['password']){ //password_verify($password , $user['password'])

            $result['success'] = true;
            $result['role'] = $user['role'];

            $_SESSION['username'] = $user['username'];
            $_SESSION['alerts'][] = [
                'type' => 'success',
                'message' => 'Login Successful'
            ];

        }else{
            $_SESSION['alerts'][] = [
                'type' => 'error',
                'message' => 'Incorrect username or password!'
            ];
        }
    }else{
        $_SESSION['alerts'][] = [
            'type' => 'error',
            'message' => 'Incorrect username or password!'
        ];
    }


    return $result;
}



function credentialsValidationRegister($username,$email,$password){
    $connection = $GLOBALS['conn'];
    $registerSuccess = false;

    $checkUsername = $connection->query("SELECT username FROM system_users WHERE username = '$username'");
    $checkEmail = $connection->query("SELECT email FROM system_users WHERE email = '$email'");
    $usernameUnique = ($checkUsername->num_rows == 0)? true:false;
    $emailUnique = ($checkEmail->num_rows == 0)? true:false;

    if($usernameUnique && $emailUnique){
        $insertUser = $connection->query("INSERT INTO system_users (username,email,password,role) VALUES ('$username','$email','$password','user')");
        $registerSuccess = (!$insertUser)? false : true;
    } 

    $result = [$registerSuccess,$usernameUnique,$emailUnique];

    return $result;
}

/*

#----------------------------- require "configDB.php";REGISTER PROCESS --------------------------------------#

session_start();        // Start a php session. It allow us to storage data that can be access across pages during user session
//require_once 'config.php';  // Import the file 'config.php';

if(isset($_POST['registerBtn'])){  //Chek inf register button has been clicked;
    $first_name = $_POST['firstName'];
    $last_name = $_POST['lastName'];
    $username = $_POST['usernameRegister'];
    $password = password_hash($_POST['passwordRegister'], PASSWORD_DEFAULT);

    $checkUsername = $connection->query("SELECT username FROM system_users WHERE username = '$username'");
    if($checkUsername->num_rows > 0){
        $_SESSION['register_error'] = "Username already registered!";
        $_SESSION['active_form'] = 'registerBtn';
    }else{
        $connection->query("INSERT INTO system_users(first_name,last_name,username,password) VALUES ('$first_name','$last_name','$username','$password','user')");
    }

    header("Location: index.php");      //Redirect user back to the main page;
    exit();

}

#------------------------------------ LOGIN PROCCESS --------------------------------------#

if(isset($_POST['loginBtn'])){  
    $username = $_POST['usernameLogin'];
    $password = $_POST['passwordLogin'];

    $checkUser = $connection->query("SELECT * FROM system_users WHERE username = '$username'");
    if($checkUser->num_rows == 0){
        $_SESSION['login_error'] = "User doesn't exists!";
        $_SESSION['active_form'] = 'loginBtn';
    }else{
        $user = $checkUser->fetch_assoc();

        if(password_verify($password , $user['password'])){
            $_SESSION['usernameLogin'] = $user['username'];
            $_SESSION['passwordLogin'] = $user['password'];

                if($user['role'] === 'admin'){
                    header("Location: admin_page.php");
                }else{
                    header("Location: user_page.php");
                }
                exit();

        }else{
            $_SESSION['login_error'] = "Incorrect password!";
            $_SESSION['active_form'] = 'loginBtn';
        }
    }

    header("Location: index.php");
    exit();
}


*/