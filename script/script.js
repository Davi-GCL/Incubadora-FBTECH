// Adiciona o evento de ao clicar na logo, redireciona para a home(index)
const logo_button = document.querySelector(".logotipo");

logo_button.addEventListener("click", function(){
  window.location.href = "./index.html";
});


// Change style of navbar on scroll
// window.onscroll = function() {myFunction()};
// function myFunction() {
//     var navbar = document.getElementById("header-principal");
//     if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
//         navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
//     } else {
//         navbar.className = navbar.className = "header-sticky";
//     }
//     console.log(window.scrollY);
// }

// Muda os estilo da navbar com o scroll
window.onscroll = function() {myFunction()};
function myFunction() {
    var navbar = document.getElementById("header-principal");

    // aux.push(navbar.className);
   
    if (window.scrollY > 100) {
      aux = true;

    } else {
      aux = false;
    }

    if (aux == true){
      // console.log(navbar.classList.toggle("header-sticky",true));
      navbar.classList.toggle("header-sticky",true);

    }
    else{
      // console.log(navbar.classList.toggle("header-sticky",false));
      navbar.classList.toggle("header-sticky",false);
      
    }

}

//Algoritmo para alternar os campos de senha (para mostrar ou esconder a senha) individualmente
function mostrar_senha(elemento, manipulado){
  let pass_input = document.querySelector(manipulado);
  let show_btn = elemento;
  
  // console.log(pass_input.type);
  
  if (pass_input.type === "password") {

    pass_input.type = "text";
    show_btn.classList.add("hide-btn");
  } 
  else {
    
    pass_input.type = "password";
    show_btn.classList.remove("hide-btn");
  }

}
  
 





