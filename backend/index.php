<?php

session_start();
include 'login_register.php';
include 'agent_data.php';
    
// Permite que o frontend na porta 3000 aceda a este script
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, header-name");
header("Content-Type: application/json");


if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $request = file_get_contents("php://input");
    $dataRecived = json_decode($request);

    if (!$dataRecived) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON"
    ]);
    exit;
    }else{

        if (!isset($dataRecived->type)) {
            echo json_encode([
                "status" => "error",
                "message" => "missing type field"
            ]);
            exit;
        }else{
            switch($dataRecived->type) {
                case 'login': 
                    $loginValidation = credentialsValidationLogin($dataRecived->username,$dataRecived->password);
                    echo json_encode($loginValidation);
                    break;
                case 'register': 
                    $registerValidation = credentialsValidationRegister($dataRecived->username,$dataRecived->email, $dataRecived->password);
                    echo json_encode($registerValidation);
                    break;
                case 'agent':
                    $agentDataManagement = manageAgentData($dataRecived->data);
                    header('Content-Type: application/json');
                    echo json_encode($agentDataManagement);
                    echo json_encode([
                        "status" => "ok",
                        "message" => "request received",
                    ]);
                    break;
                default:
                    echo json_encode([
                        "status" => "error",
                        "message" => "Request type not specified"
                    ]);
                    break;
            }
        }
    }
}


/*

- Interface principal do administrados ( Interface que mostre os módulos do sistema);
- Requisição  das metricas coletados de frontend(js) para backend (php). Consulta destes dados na BD, envio dos dados.
Disponibilização destes dados na tela.


*/





/*

session_start(); // Start or continue a active session. Necessary step to access the session data storage;

// This array storages error messages that ocour during the login or register processs;
$errors = [
    'login' => $_SESSION['login_error'] ?? '',
    'register' => $_SESSION['register_error'] ?? ''
];

$activeForm = $_SESSION['active_form'] ?? 'login;' ;  // Determine witch for is active . Default value = 'login';
// Doing this the program will display the apropriate form based on the last status;

session_unset();        // Remove all existend session variables. The session it selve remains active;

function showError($error){     // Display error message on the form;
    return !empty($error) ? "<p class='error-message'>$error</p>" : '';
}

function isActiveForm($formName, $activeForm) {     // Check in the given for name matches the active form;
    return $formName === $activeForm ? 'active' : '';
}

*/