<?php

require "configDB.php";


function manageAgentData($data){
    $connection = $GLOBALS['conn'];

    $getAgentData = $connection->query("SELECT id From agents WHERE code = '$data->code'");
    if($getAgentData->num_rows == 0){
        $agentId = storeDataInTable_Agent($data);
        storeDataInTable_systemLevelMetrics($agentId,$data);
    }else{
        $agentData = $getAgentData->fetch_assoc();
        storeDataInTable_systemLevelMetrics($agentData["id"], $data);
    }
    

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


function storeDataInTable_Agent($data){
    $connection = $GLOBALS['conn'];
    $insertAgent = $connection->query("INSERT INTO agents(model,manufacturer,os,code,architecture, release_version, status)VALUES('$data->model','$data->manufacturer','$data->os','$data->code','$data->architecture', '$data->release', 'up')");
//                                                                                                                                          | id | model          | manufacturer | os    | mac               | architecture | processor         | release_version   | status |
    return $connection->insert_id;

}

function storeDataInTable_systemLevelMetrics($agentId, $data){
    $connection = $GLOBALS['conn'];

    $insertMetrics = $connection->query("INSERT INTO systemLevelMetrics(agent_id,ip_address,cpu_usage,physical_core_count,logical_core_count, username, battery_percent, boot_time)VALUES($agentId,'$data->ipAddress',$data->cpuUsage,$data->physicalCoreCount, $data->logicalCoreCount, '$data->user', $data->batteryPercentage, $data->bootTime)");
    $systemMetrics_id = $connection->insert_id; 
    if (!$insertMetrics) {
        die("Erro INSERT metrics: " . $connection->error);
    }
    storeDataInTable_cpu_avg_system_load($systemMetrics_id, $data->averageSystemLoad);
    storeDataInTable_cpu_frequency($systemMetrics_id, $data->cpuFrequency);
    storeDataInTable_cpu_stats($systemMetrics_id, $data->cpuStats);
    storeDataInTable_cpu_times($systemMetrics_id, $data->cpuTimes);
    storeDataInTable_virtual_memory($systemMetrics_id, $data->virtualMemory);
    storeDataInTable_swap_memory_stats($systemMetrics_id, $data->swapMemoryStats);
    storeDataInTable_disk_usage($systemMetrics_id, $data->diskUsage);
    storeDataInTable_net_io_counters($systemMetrics_id, $data->netIOCounters);
    }
    

function storeDataInTable_cpu_avg_system_load($foreignKey, $data){
    $connection = $GLOBALS['conn'];   
    $insertCpuAvgSystemLoad = $connection->query("INSERT INTO cpu_avg_system_load(systemLevelMetrics_id,one_min,five_min,fifteen_min)VALUES($foreignKey,$data->oneMin,$data->fiveMin,$data->fifteenMin)");
}

function storeDataInTable_cpu_frequency($foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertCpuFrequency = $connection->query("INSERT INTO cpu_frequency(systemLevelMetrics_id,current,min,max)VALUES($foreignKey,$data->current,$data->min,$data->max)");
}

function storeDataInTable_cpu_stats($foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertCpuStats = $connection->query("INSERT INTO cpu_stats(systemLevelMetrics_id,ctx_switches,interrupts,soft_interrupts,syscalls)VALUES($foreignKey,$data->ctx_switches,$data->interrupts,$data->soft_interrupts,$data->syscalls)");
}

function storeDataInTable_cpu_times($foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertCpuTimes = $connection->query("INSERT INTO cpu_times(systemLevelMetrics_id,user,nice,system_time,idle,iowait,irq)VALUES($foreignKey,$data->user,$data->nice,$data->system,$data->idle,$data->iowait,$data->irq)");    
}

function storeDataInTable_disk_usage($foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertDiskUsage = $connection->query("INSERT INTO disk_usage(systemLevelMetrics_id,total,used,free,percent)VALUES($foreignKey,$data->total, $data->used, $data->free, $data->percent)");
}

function storeDataInTable_virtual_memory($foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertVirtualMemory = $connection->query("INSERT INTO virtual_memory(systemLevelMetrics_id,total,available,percent,used,free,active,inactive,buffers,cached,shared,slab)VALUES($foreignKey,$data->total , $data->available , $data->percent , $data->used , $data->free , $data->active , $data->inactive , $data->buffers , $data->cached , $data->shared , $data->slab)");
}

function storeDataInTable_swap_memory_stats($foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertSwapMemoryStats = $connection->query("INSERT INTO swap_memory_stats(systemLevelMetrics_id,total,used,percent)VALUES($foreignKey,$data->total, $data->used, $data->percent)");
}

function storeDataInTable_net_io_counters($foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertNetIOCounters = $connection->query("INSERT INTO net_io_counters(systemLevelMetrics_id,bytes_sent,bytes_recv,packets_sent,packets_recv,errin,errout,dropin,dropout)VALUES($foreignKey,$data->bytes_sent, $data->bytes_recv, $data->packets_sent, $data->packets_recv, $data->errin, $data->errout, $data->dropin, $data->dropout)");
}