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


function getAgentMonitoringPageData(){
    $connection = $GLOBALS['conn'];

    $getAgentDetails = $connection->query("SELECT model,manufacturer,os,release_version,status FROM agents ORDER BY id DESC LIMIT 1 ");
    $agentDetails = $getAgentDetails->fetch_row();

    $getBattery = $connection->query("SELECT battery_percent From systemLevelMetrics ORDER BY id DESC LIMIT 1 ");
    $battery = $getBattery->fetch_row();

    $getDiskUsage = $connection->query("SELECT total,used,free FROM disk_usage ORDER BY id DESC LIMIT 1");
    $diskUsage = $getDiskUsage->fetch_row();

    $getCPU = $connection->query("SELECT cpu_usage FROM systemLevelMetrics ORDER BY id DESC LIMIT 7");
    $cpu = $getCPU->fetch_all();

    $getVirtualMemory = $connection->query("SELECT percent FROM virtual_memory ORDER BY id DESC LIMIT 7"); 
    $virtualMemory = $getVirtualMemory->fetch_all();

    $getSwap = $connection->query("SELECT percent FROM swap_memory_stats ORDER BY id DESC LIMIT 7");
    $swap = $getSwap->fetch_all();

    $getCPUFrequency = $connection->query("SELECT current,max,min FROM cpu_frequency ORDER BY id DESC LIMIT 1");
    $cpuFrequency = $getCPUFrequency->fetch_row();

    $getCPUTimes = $connection->query("SELECT user,nice,system_time,idle,iowait,irq FROM cpu_times ORDER BY id DESC LIMIT 1");
    $cpuTimes = $getCPUTimes->fetch_row();

    $getCPUStats = $connection->query("SELECT ctx_switches,interrupts,soft_interrupts,syscalls FROM cpu_stats ORDER BY id DESC LIMIT 1");
    $cpuStats = $getCPUStats->fetch_row();

    $getAvgSysLoad = $connection->query("SELECT one_min,five_min,fifteen_min FROM cpu_avg_system_load ORDER BY id DESC LIMIT 1");
    $avgSysLoad = $getAvgSysLoad->fetch_row();

    $getIOCounters = $connection->query("SELECT bytes_sent,bytes_recv,packets_sent,packets_recv,errin,errout,dropin,dropout FROM net_io_counters ORDER BY id DESC LIMIT 1");
    $ioCounters = $getIOCounters->fetch_row();


    $data = [
        "agent_details" => $agentDetails,
        "battery" => $battery[0],
        "disk_usage" => $diskUsage,
        "cpu" => $cpu,
        "ram" => $virtualMemory,
        "swap" => $swap,
        "cpu_frequency" => $cpuFrequency,
        "cpu_times" => $cpuTimes,
        "cpu_stats" => $cpuStats,
        "avg_sys_load" => $avgSysLoad,
        "io_counters" => $ioCounters
    ];

    return $data;
}

