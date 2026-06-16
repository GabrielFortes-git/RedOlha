<?php

require "configDB.php";

function manageManutentionDeviceData($data){
    $connection = $GLOBALS['conn'];
    $status = False;

    $storeData = $connection->query("INSERT INTO manutention_device_register(serial_number,name,model,category,manufacturer,state,device_ip,device_mac)VALUES('$data->serialNumber','$data->name','$data->model','$data->category','$data->manufacturer','$data->state','$data->ipAddress','$data->macAddress')");
    if($storeData){
        $status = True;

    return json_ecode($status);
}
}