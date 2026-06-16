<?php

include 'login_register.php';
include 'agent_data.php';
include 'network_data.php';
include 'display_data.php';
include 'emails.php';
include 'manutention_data.php';
    
// Permite que o frontend na porta 3000 aceda a este script
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, header-name");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}


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
                    echo json_encode([
                        "status" => "Ok",
                        "message" => "Request Received!",
                    ]);
                    break;
                case 'netData':
                    $networkData = manageNetworkData($dataRecived->data);
                    echo json_encode([
                        "status" => "Ok",
                        "message" => "Request Received!"
                    ]);
                    break;
                case 'getData':
                    switch ($dataRecived->page){
                        case "admin_main_page":
                            $pageData = getAdminMainPageData();
                            echo json_encode($pageData);
                            break;
                        case "monitoring_page":
                            $pageData = getMonitoringPageData();
                            echo json_encode($pageData);
                            break;
                        default:
                            echo json_encode([
                            "status" => "error",
                            "message" => "Request type not specified"
                            ]);
                    }  
                    break;
                case "email":
                    $sendEmail = sendEmail($dataRecived->code);
                    echo json_encode([
                        "status" => "Code Received!",
                        "message" => $sendEmail
                    ]);
                    break;
                case "manutentionRegisterDevice":
                    $manageManutentionDevice = manageManutentionDeviceData($dataRecived);
                    echo json_encode([
                        "status" => "Data Received!",
                        "message" => $manageManutentionDevice
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







