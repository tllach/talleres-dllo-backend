function convertidorTemp(tempC){
    return tempC*9/5+32
}

function resolvedor(a, b, c, result_postive){
    if(result_postive){
        return (-b + (b**2 - 4*a*c)**(1/2))/(2*a)
    }else{
        return (-b - (b**2 - 4*a*c)**(1/2))/(2*a)
    }
}

function mejorParidad(num){
    if (num%2){
        return "No es par"
    }
    return "Es par"
}

function peorParidad(num){
    if (num == 0){
        return "Es par"
    }
    if (num == 1){
        return "No es par"
    }
    if (num == 2){
        return "Es par"
    }
    if (num == 3){
        return "No es par"
    }
    if (num == 4){
        return "Es par"
    }
    if (num == 5){
        return "No es par"
    }
    if (num == 6){
        return "Es par"
    }
    if (num == 7){
        return "No es par"
    }
    if (num == 8){
        return "Es par"
    }
    if (num == 9){
        return "No es par"
    }
    if (num == 10){
        return "es par"
    }
}


console.log(convertidorTemp(10))
console.log(1,5,4, true)
console.log(mejorParidad(10))
console.log(peorParidad(8))