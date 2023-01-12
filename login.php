<?php
include('DBsetup.php');

//Se existe o post para nome e senha para verificar se a chave do array está definida antes de tentar acessá-la. Para fazer isso, você pode usar a função "isset()":
if(isset($_POST['nome']) || isset($_POST['senha'])){

    //Se as entradas dos formularios nao estiverem vazias, armazenara a 'string' digitada
    if(strlen($_POST['nome']) && strlen($_POST['senha']) != 0){

        //limpara os campos (para evitar ataques de SQL injection)
        $nome = $mysqli->real_escape_string($_POST['nome']);
        $senha = $mysqli->real_escape_string($_POST['senha']);

        //Codigo SQL
        $sql_code = "SELECT * FROM usuarios WHERE nome = '$nome' AND senha = '$senha'";
        //Consulta no banco de dados
        $sql_query = $mysqli->query($sql_code) or die("falha na execucao do codigo SQL: ".$mysqli->error);
        $sql_count = $mysqli->query("SELECT * FROM usuarios"); //Conta o numero total de linhas da tabela

        $quantidadeTotal = $sql_count->num_rows;
        $quantidade = $sql_query->num_rows;

        if($quantidade == 1) {
            $usuario = $sql_query->fetch_assoc();

            if(!isset($_SESSION)){
                session_start();
            }
            //Variaveis de sessao (permanecem por ate 1 semana apos o usuario sair do site)
            $_SESSION['id'] = $usuario['id'];
            $_SESSION['nome'] = $usuario['nome'];

            header("Location: index.html");

        }else if($quantidadeTotal != $quantidade){
            
                echo "<script>alert('Nome ou senha incorretos!')</script>";
            
        }

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
    <title>Login</title>
</head>
<body class="bg">

    

    <main class="login-main-flex">
        <header class="header-login">
            <a href="index.html" >
                <i class="fa-solid fa-house fa-3x"></i>
            </a>
        </header>
        <section class="section-login">

            <form action="" method="POST" id="login">
                <div class="div-nome">
                    <label for="nome">Usuario<br></label>
                    <input placeholder="Nome" class="login-form" name="nome" type="text" required>
                </div>

                <div class="div-senha">
                    <label for="senha">Senha<br></label>
                    <input placeholder="Senha" class="login-form" id="senha" name="senha" type="password" required>
                    <span class="show-btn" onclick="mostrar_senha(this, '#senha')"></span>
                </div>
                               
                <div class="login-area-button">
                    <div class="link-login">
                        <a href="recuperacao-de-senha.php">Esqueci minha senha</a>
                        <a href="cadastro.php">Cadastre-se</a>
                    </div>
                    <button type="submit">Login</button>
                </div>
                <!-- <div class="login-area-button">
                    <a href="cadastro.html">Cadastre-se</a>
                </div> -->
            </form>
            
            <!-- <form action="">
                <input type="radio" name="sex" id="a">
                <label for="a">A</label>
                <input type="radio" name="sex" id="b">
                <label for="b">B</label>
            </form> -->
    </main>

</body>
</html>
<script src="script/script.js"></script>