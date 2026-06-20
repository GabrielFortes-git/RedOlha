<?php

require "configDB.php";

function manageManutentionDeviceData($data){
    $connection = $GLOBALS['conn'];
    $status = False;

  
    $storeData = $connection->query("INSERT INTO manutention_device_register(serial_number,name,model,category,manufacturer,state,device_ip,device_mac)VALUES('$data->serialNumber','$data->name','$data->model','$data->category','$data->manufacturer','$data->state','$data->ipAddress','$data->macAddress')");
    if($storeData){
        $status = True;
    }
      

    return $status;
}

function manageManutentionManutentionData($data){
    $connection = $GLOBALS['conn'];
    $status = False;

    $storeData = $connection->query("INSERT INTO manutention_manutention_register(registered_device_id ,code,date_stamp,device,device_ip,device_mac ,`type`,`level`,responsable,`description`,`status`,next_manutention)VALUES( 1,'$data->code','$data->date','$data->device','$data->device_ip','$data->device_mac' ,'$data->manutention_type','$data->level','$data->responsable','$data->description','$data->status','$data->next_manutention')");
    if($storeData){
        $status = True;
    }
      
    return $status;
}
