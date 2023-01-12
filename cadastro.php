<?php
include("DBsetup.php");

//Se existe o post para nome e senha para verificar se a chave do array está definida antes de tentar acessá-la. Para fazer isso, você pode usar a função "isset()":
if(isset($_POST['nome']) || isset($_POST['email']) || isset($_POST['senha'])){

    //Atribui o valor dos formularios e protege de ataques de sql injection
    $nome = $mysqli->real_escape_string($_POST['nome']);
    $email = $mysqli->real_escape_string($_POST['email']);
    $senha = $mysqli->real_escape_string($_POST['senha']);
    
    // Encriptar a senha antes de armazenar no banco de dados
    // $senha = password_hash($senha, PASSWORD_DEFAULT);
    
//Algoritmo para evitar que aconteca o reenvio de formulario

    //Codigo SQL
    $sql_code = "SELECT * FROM usuarios WHERE nome = '$nome' AND email = '$email'";
    //Consulta no banco de dados
    $sql_query = $mysqli->query($sql_code) or die("falha na execucao do codigo SQL: ".$mysqli->error);

    $quantidade = $sql_query->num_rows;

    if($quantidade == 0){

        // Insere os dados na tabela
        $sql = "INSERT INTO usuarios (nome, email, senha)
        VALUES ('$nome', '$email', '$senha')";
        
        if ($mysqli->query($sql) === TRUE) {
            if(strlen($_POST['nome']) && strlen($_POST['senha']) != 0){
                echo "<script> alert('Usuário registrado com sucesso'); </script>";
            }
        } else {
            echo "Erro: " . $sql . "<br>" . $mysqli->error;
        }
        
    }else {
        echo "Este usuario já foi cadastrado!";
    }

}

$mysqli->close();

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
    <title>Cadastre-se</title>
</head>
<body class="bg">

    

    <main class="cadastro-main-flex">
        <header class="header-login">
            <a href="index.html" >
                <i class="fa-solid fa-house fa-3x"></i>
            </a>
        </header>
        <section class="section-cadastro">

            <form action="" method="POST" id="login">
                <div class="div-nome">
                    <label for="nome">Nome Completo<br></label>
                    <input placeholder="Nome" class="login-form" name="nome" 
                    type="text">
                </div>

                <div class="div-email">
                    <label for="email">E-Mail<br></label>
                    <input placeholder="Seu e-mail" class="login-form" name="email" 
                    type="text">
                </div>

                <div class="div-senha">
                    <label for="senha">Senha<br></label>
                    <input placeholder="Crie uma senha" class="login-form" id="senha" name="senha"
                    type="password" required>
                    <span class="show-btn" onclick="mostrar_senha(this, '#senha')"></span>
                </div>

                <div class="div-senha">
                    <label for="senha">Confirmar Senha<br></label>
                    <input placeholder="Confirme a senha" class="login-form" id="conf-senha" name="conf-senha" type="password" required>
                    <span class="show-btn" onclick="mostrar_senha(this, '#conf-senha')"></span>
                </div>
                
                <input type="hidden" name="token" value="<?= $_SESSION['token'] ?>">

                <div class="login-area-button">
                    <a href="login.php">Ja Tenho Cadastro</a>
                    <button type="submit" onclick="">Cadastrar</button>
                </div>
            </form>
    
    </main>

</body>
<script src="script/script.js"></script>
</html>