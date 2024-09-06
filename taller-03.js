function desglosarString(word, option){
	const vocales = ["a","e","i","o","u"]
	const consonantes = ["b","c","d","f","g","h","j","k","l","m","n","ñ","p","q","r","s","t","v","w","x","y","z"]
    countvocales = 0
    countconsonantes = 0

    word = word.toLowerCase().split("")
    word.forEach((letter) => {
        if (vocales.includes(letter)){
            countvocales++;
        }else if (consonantes.includes(letter)){
            countconsonantes++;
        }
    });

    if (option == "vocales"){
        return countvocales
    }else if(option == "consonantes"){
        return countconsonantes
    }
}

function twoSum(lst, num){
    for (i = 0; i < lst.length; i++){
        for (j = i+1; j < lst.length; j++){
            if(lst[i] + lst[j] == num){
                return [i, j]
            }
        }
    }
    return "No hay solución"
}

function conversionRomana(roman){
    const romanNumbers = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    }
    let result = 0
    for (let i = 0; i < roman.length; i++){
        if(romanNumbers[roman[i]] < romanNumbers[roman[i+1]]){
            result += romanNumbers[roman[i+1]] - romanNumbers[roman[i]]
            i++
        }
        else{
            result += romanNumbers[roman[i]]
        }
    }
    return result
}