<?php

require "configDB.php";


function manageAgentData($data){
    $connection = $GLOBALS['conn'];

    $requestFeedback = [
        "status" => "ok",
        "message" => "Request Received GG!",
        "agentCode" => ''
    ];

    if($data->macAddress == NULL){
        $getNumberIds = $connection->query("SELECT id FROM agents"); // Get the number of agents ( Use the number to generate code);
        $agentCode = generateRamdomString($getNumberIds->num_rows);
        $requestFeedback["agentCode"] = $agentCode;
        }else{
            $verifyCode = $connection->query("SELECT id FROM agents WHERE mac = '$data->macAddress'");
            if($verifyCode->num_rows == 0){
                storeDataInTable_Agent($data);
                $getId = $connection->query("SELECT id FROM agents WHERE mac = '$data->macAddress'");
                $agentId= $getId->fetch_assoc();
                storeDataInTable_systemLevelMetrics($agentId["id"],$data);
                }else{
                    $getAgentId = $connection->query("SELECT id FROM agents WHERE mac = '$data->macAddress'");
                    storeDataInTable_systemLevelMetrics($agentId, $data);
                    }
            }
                    
        return $requestFeedback;

    //  if($getAgentRow->num_rows == 0){
    //     storeDataInTable_Agent($data);
    //     $getAgentData = $connection->query("SELECT id FROM agents WHERE mac = '$data->macAddress'");
    //     $agentData = $getAgentData->fetch_assoc();
    //     storeDataInTable_systemLevelMetrics($agentData["id"],$data);
    //  }else{
    //     $agentId = $checkAgent["id"];
    //     storeDataInTable_systemLevelMetrics($agentId, $data);
    //  }

}



function generateRandomString() {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    $length = 10;

    for ($i = 0; $i < $length; $i++) {
        $index = random_int(0, strlen($characters) - 1);
        $randomString .= $characters[$index];
    }

    return $randomString;
}

function storeDataInTable_Agent($data){
    $connection = $GLOBALS['conn'];
    $insertAgent = $connection->query("INSERT INTO agents(model,manufacturer,os,mac,architecture, release_version, status)VALUES('$data->model','$data->manufacturer','$data->os','$data->macAddress','$data->architecture', '$data->release', 'up')");
//                                                                                                                                          | id | model          | manufacturer | os    | mac               | architecture | processor         | release_version   | status |


}

function storeDataInTable_systemLevelMetrics($agentId, $data){
    $connection = $GLOBALS['conn'];

    $insertMetrics = $connection->query("INSERT INTO systemLevelMetrics(agent_id,ip_address,cpu_usage,physical_core_count,logical_core_count)VALUES($agentId,'$data->ipAddress','$data->cpuUsage','$data->physicalCoreCount','$data->logicalCoreCount')");
    $systemMetrics_id = $connection->insert_id; 
    if (!$insertMetrics) {
        die("Erro INSERT metrics: " . $connection->error);
    }
    storeDataInTable_cpu_avg_system_load($systemMetrics_id, $data->averageSystemLoad);
    storeDataInTable_cpu_frequency($systemMetrics_id, $data->cpuFrequency);
    storeDataInTable_cpu_stats($systemMetrics_id, $data->cpuStats);
    storeDataInTable_cpu_times($systemMetrics_id, $data->cpuTimes);
    //storeDataInTable_disk_partitions($agentId, $data->diskPartitions);

    }
    

function storeDataInTable_cpu_avg_system_load($foreignKey, $data){
    $connection = $GLOBALS['conn'];   
    $insertCpuAvgSystemLoad = $connection->query("INSERT INTO cpu_avg_system_load(systemLevelMetrics_id,one_min,five_min,fifteen_min)VALUES($foreignKey,'$data->oneMin','$data->fiveMin','$data->fifteenMin')");
}

function storeDataInTable_cpu_frequency($foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertCpuFrequency = $connection->query("INSERT INTO cpu_frequency(systemLevelMetrics_id,current,min,max)VALUES($foreignKey,'$data->current','$data->min','$data->max')");
}

function storeDataInTable_cpu_stats($foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertCpuStats = $connection->query("INSERT INTO cpu_stats(systemLevelMetrics_id,ctx_switches,interrupts,soft_interrupts,syscalls)VALUES($foreignKey,'$data->ctx_switches','$data->interrupts','$data->soft_interrupts','$data->syscalls')");
}

// +-----------------------+--------+------+-----+---------+----------------+
// | Field                 | Type   | Null | Key | Default | Extra          |
// +-----------------------+--------+------+-----+---------+----------------+
// | id                    | int    | NO   | PRI | NULL    | auto_increment |
// | systemLevelMetrics_id | int    | NO   | MUL | NULL    |                |
// | ctx_switches          | bigint | YES  |     | NULL    |                |
// | interrupts            | bigint | YES  |     | NULL    |                |
// | soft_interrupts       | bigint | YES  |     | NULL    |                |
// | syscalls              | bigint | YES  |     | NULL    |                |
// +-----------------------+--------+------+-----+---------+----------------+


function storeDataInTable_cpu_times($foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertCpuTimes = $connection->query("INSERT INTO cpu_times(systemLevelMetrics_id,user,nice,system_time,idle,iowait,irq)VALUES($foreignKey,'$data->user','$data->nice','$data->system','$data->idle','$data->iowait','$data->irq')");    
}

// +-----------------------+-------+------+-----+---------+----------------+
// | Field                 | Type  | Null | Key | Default | Extra          |
// +-----------------------+-------+------+-----+---------+----------------+
// | id                    | int   | NO   | PRI | NULL    | auto_increment |
// | systemLevelMetrics_id | int   | NO   | MUL | NULL    |                |
// | user                  | float | YES  |     | NULL    |                |
// | nice                  | float | YES  |     | NULL    |                |
// | system_time           | float | YES  |     | NULL    |                |
// | idle                  | float | YES  |     | NULL    |                |
// | iowait                | float | YES  |     | NULL    |                |
// | irq                   | float | YES  |     | NULL    |                |
// +-----------------------+-------+------+-----+---------+----------------+


// function storeDataInTable_disk_partitions($agentId, $data){
//     $connection = $GLOBALS['conn'];
//     for($i = 0 ; $i < sizeof($data) ; $i++){
//         $insertDiskPartitions = $connection->query("INSERT INTO disk_partitions(agent_id,device,mountpoint,fstype)VALUES($agentId,'$data[$i]->device','$data[$i]->mountpoint','$data[$i]->fstype')");  
//     }
// }

// // --------------+--------------+------+-----+-------------------+-------------------+
// // | Field        | Type         | Null | Key | Default           | Extra             |
// // +--------------+--------------+------+-----+-------------------+-------------------+
// // | id           | int          | NO   | PRI | NULL              | auto_increment    |
// // | agent_id     | int          | NO   | MUL | NULL              |                   |
// // | device       | varchar(255) | YES  |     | NULL              |                   |
// // | mountpoint   | varchar(255) | YES  |     | NULL              |                   |
// // | fstype       | varchar(50)  | YES  |     | NULL              |                   |
// // | last_updated | datetime     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
// // +--------------+--------------+------+-----+-------------------+-------------------+
