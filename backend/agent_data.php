<?php

require "configDB.php";

// $connection = $GLOBALS['conn'];


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
        die("Erro INSERT metrics: " .$connection->error);
    }
    
    $alertType1 = "Uso de CPU";
     if($data->cpuUsage >= 70 && $data->cpuUsage < 80){
        $alertDescription = "Uso de processador elevado. O computador pode começar a aquecer ou a fazer mais ruído na ventoinha.";
        create_alert($agentId, 6, $alertType1, $alertDescription);
    }elseif($data->cpuUsage >= 80 && $data->cpuUsage <90){
        $alertDescription = "O processador está quase no limite. Evite iniciar novas tarefas pesadas até que a carga diminua.";
        create_alert($agentId, 8, $alertType1, $alertDescription);        
    }elseif($data->cpuUsage > 90){
        $alertDescription = "Processador esgotado. O sistema está prestes a congelar. Aguarde que os processos terminem ou feche a aplicação travada.";
        create_alert($agentId, 10, $alertType1, $alertDescription);
    }

     $alertType2 = "Bateria";
     if($data->batteryPercentage <= 20 && $data->batteryPercentage > 10){
        $alertDescription = "Bateria fraca: {$data->batteryPercentage} %";
        create_alert($agentId,6, $alertType2, $alertDescription);
    }elseif($data->batteryPercentage  <= 10){
        $alertDescription = "Bateria prestes a esgotar: {$data->batteryPercentage} %";
        create_alert($agentId,8, $alertType2, $alertDescription);        
        }
        
            storeDataInTable_cpu_avg_system_load($systemMetrics_id, $data->averageSystemLoad);
            storeDataInTable_cpu_frequency($systemMetrics_id, $data->cpuFrequency);
            storeDataInTable_cpu_stats($systemMetrics_id, $data->cpuStats);
            storeDataInTable_cpu_times($systemMetrics_id, $data->cpuTimes);
            storeDataInTable_virtual_memory($agentId, $systemMetrics_id, $data->virtualMemory);
            storeDataInTable_swap_memory_stats($agentId, $systemMetrics_id, $data->swapMemoryStats);
            storeDataInTable_disk_usage($agentId,$systemMetrics_id, $data->diskUsage);
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

function storeDataInTable_disk_usage($agentId,$foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertDiskUsage = $connection->query("INSERT INTO disk_usage(systemLevelMetrics_id,total,used,free,percent)VALUES($foreignKey,$data->total, $data->used, $data->free, $data->percent)");
    $diskUsagePercentage = ($data->used / $data->total)*100;  
    $alertType = "Uso de Disco";
    if($diskUsagePercentage >= 70 && $diskUsagePercentage < 80){
        $alertDescription = "Espaço em disco a esgotar. Recomendamos uma limpeza preventiva de ficheiros temporários.";
        create_alert($agentId,6, $alertType, $alertDescription);
    }elseif($diskUsagePercentage >= 80 && $diskUsagePercentage <90){
        $alertDescription = "O disco está quase cheio. Apague ficheiros desnecessários ou mova-os para a nuvem agora";
        create_alert($agentId,8, $alertType, $alertDescription);        
    }elseif($diskUsagePercentage > 90){
        $alertDescription = "Espaço em disco esgotado. O computador pode ficar lento ou bloquear. Liberte espaço imediatamente!";
        create_alert($agentId,10, $alertType, $alertDescription);
    }

    }

function storeDataInTable_virtual_memory($agentId, $foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertVirtualMemory = $connection->query("INSERT INTO virtual_memory(systemLevelMetrics_id,total,available,percent,used,free,active,inactive,buffers,cached,shared,slab)VALUES($foreignKey,$data->total , $data->available , $data->percent , $data->used , $data->free , $data->active , $data->inactive , $data->buffers , $data->cached , $data->shared , $data->slab)");
    $alertType = "Memoria Virtual (RAM)";
    if($data->percent >= 70 && $data->percent < 80){
        $alertDescription = "Uso de memória elevado. O computador pode começar a perder alguma fluidez.";
        create_alert($agentId,6, $alertType, $alertDescription);
    }elseif($data->percent >= 80 && $data->percent <90){
        $alertDescription = "A memória RAM está quase cheia. Feche as abas do navegador ou programas que não está a usar.";
        create_alert($agentId,8, $alertType, $alertDescription);        
    }elseif($data->percent > 90){
        $alertDescription = "Memória RAM esgotada. O sistema está instável. Guarde o seu trabalho e reinicie os programas pesados imediatamente!";
        create_alert($agentId,10, $alertType, $alertDescription);
    }
}

function storeDataInTable_swap_memory_stats($agentId, $foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertSwapMemoryStats = $connection->query("INSERT INTO swap_memory_stats(systemLevelMetrics_id,total,used,percent)VALUES($foreignKey,$data->total, $data->used, $data->percent)");
    $alertType = "Memoria Secundária (SWAP)";
    if($data->percent >= 70 && $data->percent < 80){
        $alertDescription = "A memória secundária (SWAP) está sob carga elevada. O sistema poderá apresentar lentidão ao alternar entre janelas.";
        create_alert($agentId, 6, $alertType, $alertDescription);
    }elseif($data->percent >= 80 && $data->percent < 90){
        $alertDescription = "A memória de reserva (SWAP) está quase cheia. Feche programas pesados para evitar que o sistema bloqueie.";
        create_alert($agentId, 8, $alertType, $alertDescription);        
    }elseif($data->percent > 90){
        $alertDescription = "Memória SWAP esgotada. O sistema ficou sem memória e os programas vão começar a fechar sozinhos. Guarde tudo imediatamente!";
        create_alert($agentId, 10, $alertType, $alertDescription);
    }
}

function storeDataInTable_net_io_counters($foreignKey, $data){
    $connection = $GLOBALS['conn'];
    $insertNetIOCounters = $connection->query("INSERT INTO net_io_counters(systemLevelMetrics_id,bytes_sent,bytes_recv,packets_sent,packets_recv,errin,errout,dropin,dropout)VALUES($foreignKey,$data->bytes_sent, $data->bytes_recv, $data->packets_sent, $data->packets_recv, $data->errin, $data->errout, $data->dropin, $data->dropout)");
}


function create_event($type, $description){
    $connection = $GLOBALS['conn'];
    $insertEvent = $connection->query("INSERT INTO events(type,description)VALUES('$type','$description')");
    
}

function create_alert($agentId, $level, $type, $description){
    $connection = $GLOBALS['conn'];
    $status = True;
    $insertAlert = $connection->query("INSERT INTO alerts(agent_id,level,type,descripton,status)VALUES($agentId,'$level','$type','$description', $status)");
    if($insertAlert){
        $options = array(
            'cluster' => 'eu',
            'useTLS' => true
        );
        $pusher = new Pusher\Pusher(
            'e3568febf618e252044b',
            'f12456bf6c98b473c47c',
            '2155687',
            $options
        );

        $getNumberOfAlerts = $connection->query("SELECT COUNT(*) FROM alerts");
        $numberOfAlerts = $getNumberOfAlerts->fetch_row();

        $getNumberOfCriticAlerts = $connection->query("SELECT COUNT(*) FROM alerts WHERE level > 8");
        $numberOfCriticAlerts = $getNumberOfCriticAlerts->fetch_row();

        $getRecentAlerts = $connection->query("SELECT agent_id,level,type,descripton,status FROM alerts ORDER BY id DESC LIMIT 6");
        $recentAlerts = $getRecentAlerts->fetch_all();

        $value = [
            "recentAlerts" => $recentAlerts ?? false,
            "numberAlerts" => $numberOfAlerts[0] ?? "0",
            "numberCriticAlerts" => $numberOfCriticAlerts[0] ?? "0"
        ];

        $pusher->trigger('channel-alert', 'event-alert', $value);
    }
}