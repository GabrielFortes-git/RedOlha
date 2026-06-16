<?php

require "configDB.php";


function getAdminMainPageData(){
    $connection = $GLOBALS['conn'];

    $getNumberOfAgents = $connection->query("SELECT COUNT(*) FROM agents");
    $numberOfAgents = $getNumberOfAgents->fetch_row();

    $getNumberOfDevices = $connection->query("SELECT COUNT(*) FROM devices");
    $numberOfDevices = $getNumberOfDevices->fetch_row();

    $getNumberOfAlerts = $connection->query("SELECT COUNT(*) FROM alerts");
    $numberOfAlerts = $getNumberOfAlerts->fetch_row();

    $getNumberOfCriticAlerts = $connection->query("SELECT COUNT(*) FROM alerts WHERE level > 8");
    $numberOfCriticAlerts = $getNumberOfCriticAlerts->fetch_row();

    $getNetSpeed = $connection->query("SELECT * FROM speed_test_data ORDER BY id DESC LIMIT 1");
    $netSpeedData = $getNetSpeed->fetch_row();

    $getDrops = $connection->query("SELECT dropin FROM net_io_counters_network ORDER BY id DESC LIMIT 1");
    $drops = $getDrops->fetch_row();

    $getNumberRegisters = $connection->query("SELECT COUNT(*) FROM manutention_device_register");
    $numberRegisters = $getNumberRegisters->fetch_row();

    $getLastRegister = $connection->query("SELECT timestamp FROM manutention_device_register ORDER BY id DESC LIMIT 1");
    $lastRegister = $getLastRegister->fetch_row();

    $getTwoAgentsData = $connection->query("SELECT model, os , status FROM agents ORDER BY id LIMIT 2");
    $twoAgentsData = $getTwoAgentsData->fetch_all();

    $getRecentAlerts = $connection->query("SELECT agent_id,level,type,descripton,status FROM alerts ORDER BY id DESC LIMIT 6");
    $recentAlerts = $getRecentAlerts->fetch_all();

    // $numberOfMaintanaceLog = $connection->query("SELECT COUNT(*) FROM maintenanceLog")

    $data = json_encode([
        "numberOfAgents" => ($numberOfAgents != null)? $numberOfAgents[0] : "0" ,
        "numberOfDevices" => ($numberOfDevices != null)? $numberOfDevices[0] : "0" ,
        "numberOfAlerts" => ($numberOfAlerts != null)? $numberOfAlerts[0] : "0" ,
        "numberOfCriticAlerts" => ($numberOfCriticAlerts != null)? $numberOfCriticAlerts[0] : "0" ,
        "download" =>  round($netSpeedData[1],1) ?? "0",
        "upload" => round($netSpeedData[2],1) ?? "0" ,
        "ping" =>  round($netSpeedData[3] ,1) ?? "0" ,
        "drops" => ($drops != null)? $drops[0] : "0",
        "numberRegisters" => ($numberRegisters != null)? $numberRegisters[0] : "0",
        "lastRegister" => ($lastRegister != null)? $lastRegister[0] : "0",
        "agentsData" => $twoAgentsData ?? false,
        "recentAlerts" =>  $recentAlerts ?? false
    ]);

    return $data;


}

function getMonitoringPageData(){
    $connection = $GLOBALS['conn'];

    $getNetIOCounters = $connection->query("SELECT bytes_sent,bytes_recv,packets_sent,packets_recv ,errin,dropin FROM net_io_counters_network ORDER BY id DESC LIMIT 1");
    $netIOCounters = $getNetIOCounters->fetch_row();

    $getNetSpeed = $connection->query("SELECT * FROM speed_test_data ORDER BY id DESC LIMIT 1");
    $netSpeedData = $getNetSpeed->fetch_row();

    $getTwoAgentsData = $connection->query("SELECT model, os , status FROM agents ORDER BY id LIMIT 2");
    $twoAgentsData = $getTwoAgentsData->fetch_all();

    $getNetworkDevices = $connection->query("SELECT ip_address,mac_address,name,state  FROM devices ORDER BY id LIMIT 4");
    $networkDevices = $getNetworkDevices->fetch_all();


    $data = json_encode([
        "bytes_sent" => $netIOCounters[0] ?? "0",
        "bytes_recv" => $netIOCounters[1] ?? "0",
        "packets_sent" => $netIOCounters[2] ?? "0",
        "packets_recv" => $netIOCounters[3] ?? "0",
        "errin" => $netIOCounters[4] ?? "0",
        "dropin" => $netIOCounters[5] ?? "0",
        "download" =>  round($netSpeedData[1],1) ?? "0",
        "upload" => round($netSpeedData[2],1) ?? "0" ,
        "ping" =>  round($netSpeedData[3] ,1) ?? "0" ,
        "bandwidth" => round($netSpeedData[1])/8 ?? "0",
        "agentsData" => $twoAgentsData ?? false,
        "networkDevices" => $networkDevices ?? false
    ]);

    return $data;
}




