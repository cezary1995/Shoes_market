<?php 
$host = "localhost";
$user = "root";
$password = "";
$dataBase = "sklep";

$mysqli = new mysqli($host, $user, $password, $dataBase);

if(!$mysqli){
    echo "unable to connect to data base";
    die();
}
?>