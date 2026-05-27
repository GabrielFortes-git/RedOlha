<?php

require "configDB.php";
require __DIR__ . '/vendor/autoload.php';


function manageNetworkData($data){

    $connection = $GLOBALS['conn'];

    if($data[0] != NULL)
        storeDataInTable_speedTestData($data[0]);

    if($data[1] != NULL)
        storeDataInTable_netIOCountersNet($data[1]);

    if($data[2] != NULL)
        storeDataInTable_devices($data[2]);

    if($data[3] != NULL)
        storeDataInTable_router_data($data[3]);
}

function storeDataInTable_speedTestData($data){
    $connection = $GLOBALS['conn'];
    $insertData = $connection->query("INSERT INTO speed_test_data(download,upload,ping)VALUES($data->download,$data->upload,$data->ping)");
    if($insertData){
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

        $value = [
            "download" => round($data->download,1),
            "upload" => round($data->upload,1),
            "ping" => round($data->ping,1),
        ];
        $pusher->trigger('channel-speedTestData', 'event-SpeedTestData', $value);
    }
}

function storeDataInTable_netIOCountersNet($data){
    $connection = $GLOBALS['conn'];
    $insertData = $connection->query("INSERT INTO net_io_counters_network(bytes_sent,bytes_recv,packets_sent,packets_recv,errin,errout,dropin,dropout)VALUES($data->bytes_sent, $data->bytes_recv, $data->packets_sent, $data->packets_recv, $data->errin, $data->errout, $data->dropin, $data->dropout)");
}

function storeDataInTable_devices($data){
    $connection = $GLOBALS['conn'];

    foreach($data as $device){
        $deviceMac = $device[1];
        $findDevice = $connection->query("SELECT mac_address from devices WHERE mac_address = '$deviceMac'");
        if($findDevice->num_rows > 0){
            $updataStatus = $connection->query("UPDATE devices SET state = 'up' WHERE mac_address = '$deviceMac'");
        }else{
            $insertDevice = $connection->query("INSERT INTO devices (ip_address,mac_address,name,state)VALUES('$device[0]','$device[1]','$device[2]','up')");
        }
    }

    // UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
    
    // for ($i = 1; $i <= 5; $i++)
    // foreach ($iterable as $value)
    // foreach ($iterable as $key => $value)
    // $insertData = $connection->query("INSERT INTO ");
}

function storeDataInTable_router_data($data){
    $connection = $GLOBALS['conn'];
    $datas = $data[0];
    $findRouter = $connection->query("SELECT * FROM router_data WHERE objectId = '$datas->objectID'");
    if($findRouter->num_rows > 0){
        $routerData = $findRouter->fetch_assoc();
        storeDataInTable_router_interfaces($routerData['id'], $data[1]);
    }else{
        $insertRouter = $connection->query("INSERT INTO router_data(name,description,location,objectID,uptime,timeSinceLastChange,numberOfInterfaces)VALUES('$datas->name','$datas->description','$datas->location','$data->objectID',$datas->uptime,$datas->timeSinceLastChange,$datas->numberOfInterfaces)");
        storeDataInTable_router_interfaces($connection->insert_id, $data[1]);
    }
}

function storeDataInTable_router_interfaces($routerId , $interfaces){
    $connection = $GLOBALS['conn'];
    $verifyInterfaces = $connection->query("SELECT * FROM router_interfaces");
    if($verifyInterfaces->num_rows == 0){
        foreach($interfaces as $interface){
            $insertData = $connection->query("INSERT INTO router_interfaces(router_id,interfaceId,name,type,maxPacketSize,speed,status,lastChange,octetsReceived,packetsDelivered,errors,discartedPackets)
            VALUES($routerId,$interface[0],'$interface[1]',$interface[2],$interface[3],$interface[4],$interface[5],$interface[6],$interface[7],$interface[8],$interface[9],$interface[10],$interface[11])");
        }
    }else{
        foreach($interfaces as $interface){
            $i = 1;
            $updataData = $connection->query("UPDATE router_interfaces SET  speed = $interface[4],status = $interface[5],lastChange = $interface[6],octetsReceived = $interface[7],packetsDelivered = $interface[8],errors = $interface[9],discartedPackets = $interface[10] WHERE id = $i ");
            $i++;
        }
    }
}