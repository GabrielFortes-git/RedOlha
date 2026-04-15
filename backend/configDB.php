<?php
// This file is responsable for inicilizing the connection with de dababase;


header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$host = "db";
$user = "root";
$password = "root";
$database = "redolha_db";
$port = 3306;
$GLOBALS['conn'] = new mysqli($host,$user,$password,$database,$port);


/*
 - The connection "variable" stores the mysql connection object;
 - "new mysqli" create a new object from the mysqli class. This object automatically attenpts to connecto to the database,
    using the predefined values "($host,$user,$password,$database)";
*/

// Checking for any connection errors:
if($conn->connect_error){
    die("Connection failed: ". $conn->connect_error);
}
