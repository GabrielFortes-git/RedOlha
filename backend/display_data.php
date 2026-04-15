<?php

require "configDB.php";

function getSystemLevelMetrics(){
    $lastId = $connection->insert_id;
    $getSystemMetrics = $connection->query("SELECT * FROM systemLevelMetrics WHERE id = '$username'");
    $systemMetrics = $checkUser->fetch_assoc();
    return $systemMetrics ;
}



/*

- Interface principal do administrados e users ( Interface que mostre os módulos do sistema);
- Requisição  das metricas coletados de frontend(js) para backend (php). Consulta destes dados na BD, envio dos dados.
Disponibilização destes dados na tela.


*/