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
    // $numberOfMaintanaceLog = $connection->query("SELECT COUNT(*) FROM maintenanceLog")

    $data = json_encode([
        "numberOfAgents" => $numberOfAgents[0],
        "numberOfDevices" => $numberOfDevices[0],
        "numberOfAlerts" => $numberOfAlerts[0],
        "numberOfCriticAlerts" => $numberOfCriticAlerts[0]
    ]);

    return $data;

    /**
     * Numero de agentes;
     * Numero de dispositivos;
     * Numeros de alertas;
     * Numeros de alertas criticos;
     * Numero de registros de manutenção;
     * Último Registros;
     */

}





