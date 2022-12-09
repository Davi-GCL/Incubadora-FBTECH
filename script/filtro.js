

/* 
    !!!!!!!!!!!!!README!!!!!!!!!!!!

    Foi usado o paradgma de Orientação a Objetos por ser mais simples e eficiente de ser trabalhado, também foi
    usado funções próprias, que lidam com Strings e Arrays, que limpam o texto digitado pelo usuario e que cria os 
    Cards com os Projetos
    
    O Filtro começa verificando se o Usuario digitou o nome da startup ou se ele quer ver todos os projetos,
    caso ele queira ver todos os projetos, vai ser gerada, via JS, uma sessão com todos os projetos. Porém,
    caso ele digite o nome de uma Startup, vai ser geradao, todos os projetos dessa startup e mostrado para o usuario.

    Caso o usuario queira ver um projeto especifico, o filtro também gera esse resultado. Da mesma forma que o filtro
    também gera os projetos associados a um tema especifico.

    Caso nenhum projeto seja encontrado, ele gera um resultado mostrando a mensagem "Nenhum projeto foi encontrado"

*/

let projectStartups = {
    //Objeto que contem os dados de cada Startup, como seu nome, projetos, imagens e descrições
    names: {
        fbit: {
            name: "Fbit",
            project: [["Show do Milhão", "#show_milhao"], ["Search Engine com Python", "#seach-engine"], ["Site da Incubadora FbTech", "#site-incubadora"]],
           
            imagens: ["styles/imgs/show do milhao.jpg", "styles/imgs/py js.webp", "styles/imgs/html5.webp"],
            descriptions: ["Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam reiciendis dolor quibusdam, laborum quos.", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam reiciendis dolor quibusdam, laborum quos.", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam reiciendis dolor quibusdam, laborum quos."]
            //site = ATUALIZAÇÃO FUTURA
            
        },
        on_livery: {
            name: "On Livery",
            project: [["Projeto 1 de JavaScript", "#projeto_js"], ["Projeto 2 de Python", "#projeto_py"], ["Projeto 3 de C", "#projeto_c"]],
            
            imagens: ["styles/imgs/projeto 1.jpg", "styles/imgs/projeto 2.png", "styles/imgs/images-64.jpeg"],
            descriptions: ["Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam reiciendis dolor quibusdam, laborum quos.", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam reiciendis dolor quibusdam, laborum quos.", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam reiciendis dolor quibusdam, laborum quos."]
            //site = ATUALIZAÇÃO FUTURA
            
        },
        logsystem: {
            name: "LogSystem",
            project: [["Jogo com js", "#jogo_js"], ["Site de vendas", "#site_vendas"], ["Sistema Bancario com C++", "#banco_c"]],
            
            imagens: ["styles/imgs/images-63.jpeg", "styles/imgs/startup.png", "styles/imgs/foto04.jpg"],
            descriptions: ["Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam reiciendis dolor quibusdam, laborum quos.", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam reiciendis dolor quibusdam, laborum quos.", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam reiciendis dolor quibusdam, laborum quos."]
            
        },
    },

    //Metodos

       verifyNameStartup: function(nameByUser){
            //Função que verifica se o usuario digitou o nome da startup ou se ele quer ve todos os projetos
            let startup = Object.keys(this.names)
            
            nameByUser = cleanText(nameByUser, "nameInObject")
            if (inArray(nameByUser, ["all", "todos", "projetos", "projects", "projeto", "todas", "startups"])){
                //Retorno verdadeiro se opitou para ver todos os projetos
                return true
            } else {
                //Retorna True se ele digitou o nome da startup ou False se ele digitou o nome de projeto ou outro qualquer
                return inArray(nameByUser, startup)
            }
            
            
        },


        getNameStartup: function(nameByUser){
            //Funçao que retorna o nome da startup
            nameByUser = cleanText(nameByUser, "nameInObject") //Função que limpa o texto
            for(var i of Object.keys(this.names)){
                if (i == nameByUser) {
                    //Retorna o nome certo que o usuario digitou
                    return nameByUser
                }
            }
            
            
        },
        getProjectStartup: function(nameByUser){
            //Função que gera todos os projetos de uma determinada startup ou todos os projetos
            nameByUser = cleanText(nameByUser, "nameInObject")
            let nameStartup = nameByUser
            removeCard() //Função que remove card pré-existentes

            //Se caso o usuario digitou para ver todos, essa sessão vai gerar os cards de todos os projetos
            if (inArray(nameStartup, ["all", "todos", "projetos", "projects", "projeto", "todas", "startups"])){
                let card = document.querySelector(".desktop")
                let h1 = document.createElement("h1")

                //Gera o titulo
                if(card.getElementsByTagName("h1").length == 0){
                    h1.innerText = "Todos os projetos de nossas startups incubadas"
                    card.appendChild(h1) 
                }else{
                    card.getElementsByTagName("h1")[0].innerText = "Todos os projetos de nossas startups incubadas"
                    
                }
                
                
                //Gera os Cards com a Imagens, o Titulo e as Descrições
                for(var startup of Object.keys(this.names)){
                    for(var index = 0; index < this.names[startup].project.length; index++){
                        createCard(this.names[startup].project[index][0], this.names[startup].descriptions[index], this.names[startup].imagens[index], index, "search")
                        
                        window.scrollTo({
                            top: card.getBoundingClientRect().top, left: 0, behavior: "smooth"
                        })
                    }

                }

            //Se caso ele queira ver projetos de uma determinada Startup, essa sessão vai gerar esses card
            } else{
                let card = document.querySelector(".desktop")
                let h1 = document.createElement("h1")
                //Gera o Titulo da Section
                if(card.getElementsByTagName("h1").length == 0){
                    h1.innerText = "Projetos da " + this.names[nameStartup].name
                    card.appendChild(h1)
                    
                }else{
                     
                    card.getElementsByTagName("h1")[0].innerText = "Projetos da " + this.names[nameStartup].name
                }
                
                //Gerar os Cards com projetos
                for (let index = 0; index < this.names[nameStartup].project.length; index++) {
                
                    createCard(this.names[nameStartup].project[index][0], this.names[nameStartup].descriptions[index], this.names[nameStartup].imagens[index], index, "search")
                    let heigth = document.querySelector(".card-list")
            
                    window.scrollTo({
                        top: heigth.getBoundingClientRect().top, left: 0, behavior: "smooth"
                    })
                }
            }
            
        
        },
        getSpecificProject: function(nameByUser){
            //Função que gera projetos com os temas especificos que o usuario digitou
            let arrayAux = Object.keys(this.names)
            
            let arrayNameProjects = []; //Armazena [Nome da Startup, Nome do Prejeto]
            let aux = 0
            //Gera o titulo principal do section
            let card = document.querySelector(".desktop")
                let h1 = document.createElement("h1")
                
                if(card.getElementsByTagName("h1").length == 0){
                    
                    h1.innerText = "Os projetos de nossas startups incubadas"
                    card.appendChild(h1) 
                }else{
                    
                    card.getElementsByTagName("h1")[0].innerText = "Os projetos de nossas startups incubadas"
                    
                }
            nameByUser = cleanText(nameByUser);

            //Sessão que armazena o nome e os dados de cada projetos especificado
            for(var name of arrayAux){
                for (let i = 0; i < this.names[name].project.length; i++) {

                    //"equalsArray" é uma funçao que retorna true se um array foi igual ao outro
                    if(equalsArray(nameByUser,this.names[name].project[i][0])){ 
                        //Se o Projeto digitado pelo usuario tem o mesmo nome que o titulo do projeto, é
                        //armazenado automaticamente
                        arrayNameProjects.push([name, i]);
                    } else{
                        //Se o nome não for o mesmo, essa sessão vai verificar se alguma palavra digitada tem relação 
                        //com algum projeto

                        //"splitString" é uma funçao que pega cada palavra de uma String e transforma em um Array
                        let arrayString = splitString(nameByUser)

                        //Sessão que verifica
                        for(var j of arrayString){

                        //Se uma palavra digitada pelo usuario tiver no titulo do projeto, entao vai armazenar
                        //esse nome na variavel com os projetos
                            if(inArray(j, splitString(this.names[name].project[i][0]))){
                                aux ++;
                            }
                        }
                        if(aux > 0){
                            arrayNameProjects.push([name, i]);
                        }
                        aux = 0;
                    }
                    
                }
                
            }
            
            removeCard()
            
            //Essa sessão é para caso o nome do projeto ou startup digitada não seja encontrada
            //vai cria uma Div com a mensagem seguinte
            if(typeof arrayNameProjects[0] == typeof undefined){
                const card_project = document.createElement("div")
                card_project.style.backgroundColor = "transparent"
                card_project.style.borderRadius = 0
                card_project.style.width = "100%"
                card_project.style.boxShadow = "none"
                card_project.classList.add("card-project")
                let card_none = document.createElement("h2")
                
                card_none.innerText = "Projeto Não Encontrado"
                card_project.appendChild(card_none)
                document.querySelector(".section-startups").style.display = "flex"
                let cards = document.getElementsByClassName("card")
                for(var i of cards){
                    i.style.display = "none"
                }
                document.getElementById("projects").style.display = "none"
                document.querySelector(".card-list").appendChild(card_project)
            }

            //caso o projeto exista, então vai criar um card com um cada projeto resultante
            for (let index = 0; index < arrayNameProjects.length; index++) {
                    
                    
                    createCard(this.names[arrayNameProjects[index][0]].project[arrayNameProjects[index][1]][0], this.names[arrayNameProjects[index][0]].descriptions[arrayNameProjects[index][1]], this.names[arrayNameProjects[index][0]].imagens[arrayNameProjects[index][1]], index, "search")
                    let heigth = document.querySelector(".card-list")
        
                    window.scrollTo({
                        top: heigth.getBoundingClientRect().top, left: 0, behavior: "smooth"
                    })
            }
            
            //Essa sessão vai acontecer se caso gerar um erro no Array de Projetos
            if(arrayNameProjects === typeof undefined){
                
                let card_none = document.createElement("h2")
                
                card_none.innerText = "Projeto Não Encontrado"
                
                document.querySelector(".section-startups").style.display = "flex"
                let cards = document.getElementsByClassName("card")
                for(var i of cards){
                    i.style.display = "none"
                }
                document.getElementById("projects").style.display = "none"
                document.querySelector(".card-list").appendChild(card_none)
            }

        }
    

}



//Função que limpa um texto, tirar acentos, pontos, e transforma uma string em uma chave para Objetos
function cleanText(result, name = 'none') {

        
    let fraseSemPoint = "";
    //Sessão que remove os acentos e pontos
    for(var palavra of result){
        
        if(inArray(palavra, "+×÷=/_!@#$%^&*()-':;,?.``~\|<>{}[]]}")){
        
        } else{
            if(inArray(palavra, "áâãà")){
                fraseSemPoint += "a";
            }
            else if(inArray(palavra, "éêè")){
                fraseSemPoint += "e";
            }
            else if(inArray(palavra, "íìî")){
                fraseSemPoint += "i";
            }
            else if(inArray(palavra, "õôóòø")){
                fraseSemPoint += "o";
            }
            else if(inArray(palavra, "úûùü")){
                fraseSemPoint += "u";
            }
            else if(inArray(palavra, "çćč")){
                fraseSemPoint += "c";
            }
            else if(inArray(palavra, "ñń")){
                fraseSemPoint += "n";
            }
                else{
                    fraseSemPoint += palavra;
                }       
        }
    }
    if(name == 'none'){
        return fraseSemPoint;
    }
    //Sessão que transforma o texto em um nome para objeto, com uma padronização: "nome_objeto"
    else if (name == "nameInObject"){
        let newFrase = ""
        for(i of fraseSemPoint){
            
            if(i != " "){
                newFrase += i;
            } else{
                newFrase += "_"
            }
        }
        console.log(newFrase);
        return newFrase
    }

    
}

//Funçao que verifica se uma string essa contida em um array
function inArray(string, vetor){
    for(var i = 0; i < vetor.length; i++){
        if(string == vetor[i]){
            return true
        }
    }
    return false
}   

//Funçao que verifica se um Array é igual ao outro
function equalsArray(vetor1, vetor2){
    let aux = 0;
    if(typeof vetor1 == typeof []){
        for(var j = 0; j < vetor1.length; j++){
                
                for(var i = 0; i < vetor2.length; i++){
                    if(vetor1[j] == vetor2[i]){
                        
                        aux++;
                        continue
                    }
                }
            }
            if(aux === vetor1.length){
                return true
            } else{
                return false
            }
    } else{
        
                
        for(var i = 0; i < vetor2.length; i++){
            
            if(vetor1 == vetor2[i]){

                aux++;
                continue
            }
        }
        
        if(aux === vetor2.length){
            return true
        } else{
            return false
        }
    }
    
}

//Função que transforma uma string ou frase em uma array, com cada indice sendo uma palavra: ["ola", "imundo"]
function splitString(string) {
    let vetor = []
    let auxVet = ""
    let auxI = 0
    for(var i of string){
        auxI++
       if (i != " "){
            auxVet += i.toLowerCase()
       } else{
            vetor.push(auxVet)
            auxVet = ""
        }
        if (auxI == string.length){
           
            vetor.push(auxVet)
        }
    }
    return vetor
}
let btn = document.querySelector("#send1")

btn.addEventListener("click", function(busca){
    busca.preventDefault();
    let search = document.querySelector("#search1");
    let result = search.value
    
    if(projectStartups.verifyNameStartup(result)){
        projectStartups.getProjectStartup(result)
        
    } else{
        projectStartups.getSpecificProject(result)
        
    }
})

let btn2 = document.querySelector("#send2")

btn2.addEventListener("click", function(busca){
    busca.preventDefault();
    let search = document.querySelector("#search2");
    let result = search.value
    
    if(projectStartups.verifyNameStartup(result)){
        
        projectStartups.getProjectStartup(result)
    } else{
        
        projectStartups.getSpecificProject(result)
    }
})
//Funçao que cria os Card de projeto
function createCard(title, text, image, /*link, */ index, typeAction = "click"){
    
    
    let aux = index+1
    while(aux > 3){
        aux = aux - 3
    }
    
    const card_project = document.createElement("div")
    card_project.classList.add("card-project")

    const card_img = document.createElement("div")
    card_img.classList.add("card-image")
    card_project.appendChild(card_img)

    const img =  document.createElement("img")
    img.setAttribute("src", image)
    card_img.appendChild(img)

    const card_body = document.createElement("div")
    card_body.classList.add("card-body")
    card_project.appendChild(card_body)

    const h2 = document.createElement("h2")
    let t = "t" + aux
    h2.classList.add(t)
    h2.innerText = title
    card_body.appendChild(h2)

    const paragraph = document.createElement("p")
    paragraph.innerText = text
    card_body.appendChild(paragraph)

    const card_footer= document.createElement("div")
    card_footer.classList.add("card-footer")
    let ft = "ft" + aux
    card_footer.classList.add(ft)
    card_project.appendChild(card_footer)

    const info = document.createElement("div")
    info.classList.add("info")
    card_footer.appendChild(info)

    const type= document.createElement("div")
    type.classList.add("type")
    type.innerText = "Ver Projeto"
    info.appendChild(type)

    if (typeAction == "click") {
            document.getElementById("lista").appendChild(card_project)
    } else if (typeAction == "search") {
        document.querySelector(".section-startups").style.display = "flex"
        let cards = document.getElementsByClassName("card")
        for(var i of cards){
            i.style.display = "none"
        }
        document.getElementById("projects").style.display = "none"
        document.querySelector(".card-list").appendChild(card_project)
        
    }
    
}
function removeCard(){
    const remove = document.getElementsByClassName("card-project")
    
    if(remove != null){ 
        while(remove.length != 0){
            for(var i = 0; i < remove.length; i++){
                
                remove[i].parentNode.removeChild(remove[i])
                }
        }
        
    }
}




function openLink(url){
    window.location.href = url;    
}


let titleStartups = document.getElementsByClassName("title-startup");


let pStartups = document.getElementsByClassName("p-startup");



 function startupOrderly(result, titleStartups, pStartups){
     result =  result.toLowerCase();
     result = cleanText(result); 
     let auxString = []
     let vetValue = [] , vetIndex = [], vetOrdened = [], auxIndex = [];
     let auxvt = ""
     for(var i = 0; i < titleStartups.length; i++){
        
        auxvt = cleanText(titleStartups[i].textContent).toLowerCase();
        
        auxString.push(splitString(auxvt))
        // auxString = splitString(auxString);
        auxIndex.push(i)
        if(equalsArray(splitString(result),auxString[i])){
            vetOrdened.push(i);
            auxIndex.splice(i, 1)
       } 
        
    }
    
    for (let index of vetOrdened) {
        auxString.splice(index, 1);

    }
    
    let aux = 0;
    for(var j = 0; j < auxString.length; j++){
        
        for (var i = 0; i < splitString(result).length; i++) {
            if(inArray(splitString(result)[i], auxString[j])){
                aux++;
            }  else{
                aux--;
            }
        }    
        vetValue.push(aux);
        vetIndex.push(auxIndex[j]) ;
        aux = 0;
    }
    
    for(var i = 0; i < vetValue.length; i++){
        aux = 0;
        for(var j = 0; j < vetValue.length; j++){
            if(vetValue[i] >= vetValue[j]){
                
                aux = vetIndex[i];
            }
        }
        vetOrdened.push(aux);
    }
    
    let newOrder = [];
    // for(var i of vetOrdened){
    //     newOrder.push(startupsContainers[i])
    // }
   
    newOrder.push(titleStartups[vetOrdened[0]].textContent)
    
    openLink(linkConverter(newOrder))
 }
 







 let time = 5000,
    currentImageIndex = 0,
    images = document.querySelectorAll("#slider .card-slider")
    let max = images.length;
    let portifolio = document.getElementById("portifolio")
    
    function nextImage() {
        
        images[currentImageIndex]
            .classList.remove("selected")

        currentImageIndex++

        if(currentImageIndex >= max)
            currentImageIndex = 0

        images[currentImageIndex]
            .classList.add("selected")
    }
    function prevImage() {

        images[currentImageIndex]
            .classList.remove("selected")

        currentImageIndex--

        if(currentImageIndex < 0)
            currentImageIndex = max - 1

        images[currentImageIndex]
            .classList.add("selected")
    }
     function start() {
         setInterval(() => {
            // troca de image
            nextImage()
         }, time)
     }

    window.addEventListener("load", start)

    let button = document.getElementById("button-portifolio")
    function openPortifolio(){
        portifolio.style.display = "flex"
        button.setAttribute("onclick", "closePortifolio()")
        button.innerHTML = "Fechar Portifolio"
        removeCard()
        let cards = document.getElementsByClassName("card")
            for(var i of cards){
                i.style.display = "flex"
            }
        let heigth = document.querySelector("#portifolio")
        
        window.scrollTo({
            top: heigth.getBoundingClientRect().top, left: 0, behavior: "smooth"
        })
    }
    function closePortifolio(){
        portifolio.style.display = "none"
        button.setAttribute("onclick", "openPortifolio()")
        button.innerHTML = "Mostrar Portifolio"
        removeCard()
        close()
    }

     
    function open(){
        let projects = document.getElementById("projects")
        projects.style.display = "flex"
    }
    function close(){
        let projects = document.getElementById("projects")
        projects.style.display = "none"
    }
    function click2(name){
        
        removeCard()
        open()

        const imgsSrc = projectStartups.names[name].imagens 
        const descriptions = projectStartups.names[name].descriptions
        const aux = projectStartups.names[name].project
        console.log(imgsSrc)
        let titles = []
        for(var j of aux){
            titles.push(j[0])
        }
        for(var i = 0; i < titles.length; i++){
            createCard(titles[i], descriptions[i], imgsSrc[i], i)
        }
        let heigth = document.querySelector(".card-footer")
        
        window.scrollTo({
            top: heigth.getBoundingClientRect().top, left: 0, behavior: "smooth"
        })
    }
    



//Fazer um codigo que vai abrir e ir para o portifolio assim que a gerar os resultados