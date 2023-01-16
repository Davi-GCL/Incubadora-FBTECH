<?php
include("DBsetup.php");


if(isset($_POST['email']) || isset($_POST['senha'])){

    //Se as entradas dos formularios nao estiverem vazias, armazenara a 'string' digitada
    if(strlen($_POST['email']) && strlen($_POST['senha']) != 0){

        //Atribui o valor dos formularios e protege de ataques de sql injection
        $email = $mysqli->real_escape_string($_POST['email']);
        $senha = $mysqli->real_escape_string($_POST['senha']);
        $conf_senha = $mysqli->real_escape_string($_POST['conf-senha']);

        // Encripta a senha antes de armazenar no banco de dados
        // $senha = password_hash($senha, PASSWORD_DEFAULT);

        
        if($senha != $conf_senha){
            echo "<script>alert('Senhas não conferem!')</script>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">

    <link rel="stylesheet" href="styles/style.css">
    <title>Recuperação de Senha</title>
</head>
<body class="bg">
    

    <main class="login-main-flex">
        <header class="header-login">
            <a href="index.html" >
                <i class="fa-solid fa-house fa-3x"></i>
            </a>
        </header>
        <section class="section-login">

            <form method="POST" action="" id="login">
                <div class="div-email">
                    <label for="email">Email<br></label>
                    <input class="login-form" name="email" type="text" placeholder="E-mail">
                </div>

                <div class="div-codigo">
                    <label for="codigo">Codigo<br></label>
                    <input class="login-form" name="codigo" type="text"placeholder="Digite o código recebido">
                </div>

                <div class="div-senha">
                    <label for="senha">Senha<br></label>
                    <input placeholder="Crie uma senha" name="senha" class="login-form" id="senha" type="password" required>
                    <span class="show-btn" onclick="mostrar_senha(this, '#senha')"></span>
                </div>

                <div class="div-senha">
                    <label for="senha">Confirmar Senha<br></label>
                    <input placeholder="Confirme a senha" name="conf-senha"class="login-form" id="conf-senha" type="password" required>
                    <span class="show-btn" onclick="mostrar_senha(this, '#conf-senha')"></span>
                </div>
                

                <div class="login-area-button">
                    <a href="login.php">Login</a>
                    <button type="submit">Confirmar</button>
                </div>
                <div class="login-area-button">
                </div>
            </form>
    
    </main>

</body>
</html>
<script src="script/script.js"></script>