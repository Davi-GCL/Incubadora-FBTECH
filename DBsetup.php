<?php

// Definindo o usuario admin do banco de dados
$usuario = 'root';
$senha = '';
$database = 'login_teste';
$host = 'localhost';

$mysqli = new mysqli($host, $usuario, $senha, $database);

if($mysqli->error){
    die("falha ao acessar o banco de dados: ".$mysqli->error);
}