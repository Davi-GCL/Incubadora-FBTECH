export function cleanText(result, name = 'none') {

        
    let fraseSemPoint = "";
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
    else if (name === "nameInObject"){
        for(i of fraseSemPoint){
            if(i == " "){
                fraseSemPoint += "_";
            } else{
                fraseSemPoint += i;
            }
        }
        return fraseSemPoint
    }

    
}
export function inArray(string, vetor){
    for(var i = 0; i < vetor.length; i++){
        if(string == vetor[i]){
            return true
        }
    }
    return false
}   

export function equalsArray(vetor1, vetor2){
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

export function splitString(string) {
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