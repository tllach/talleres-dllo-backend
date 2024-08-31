function findMax(lista){
    num = lista[0]
    for (i = 0; i < lista.length; i++){
        if(lista[i] > num){
            num = lista[i]
        }
    }
    return num
}


function includes(lista, num){
    for (i = 0; i < lista.length; i++){
        if(num == lista[i]){
            return true
        }
    }
    return false
}

function sum(lista){
    suma = 0
    for (i = 0; i < lista.length; i++){
        suma = lista[i] + suma
    }
    return suma
}

function missingNumbers(lista){
    lista.sort((a, b) => a - b)
    menor = lista[0]
    mayor = findMax(lista)
    listaCompleta = []
    for (i = menor; i < mayor; i++){
        if(!includes(lista, i)){
            listaCompleta.push(i)
        }
    }
    return listaCompleta
}