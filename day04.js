const a = 248345;
const b = 746315;
let countPartOne = 0
let countPartTwo = 0

function findPasswords(){
    for(let i=a; i<=b;i++){
    compatible(i,'partOne')==true ? countPartOne++: undefined;
    compatible(i,'partTwo')==true ? countPartTwo++ : undefined;
    }
    console.log('PART ONE   ' + countPartOne)
    console.log('PART TWO   ' + countPartTwo)
}


function compatible(nb,part){
    nb.toString().length==6 && repeated(nb,part)==true && nevDec(nb)==true ? res = true : res = false 
    return res
}

function repeated(nb,part){
    nb = nb.toString()
    if(part=='partTwo'){
        for(let i=0;i<nb.length-1;i++){
            let k = 0            
             if(nb[i] == nb[i+1]){
                     let j = i+2
                     let letter = nb[j]
                 while(letter==nb[i]){
                     j++
                     letter = nb[j]                   
                     k++
                 }
                 if(k==0){
                     return true
                 }else{
                     i += k 
                 }
             }
         }
         return false
         
    }else{
        res = false
        for(let i=0;i<nb.length-1;i++){
            nb[i] == nb[i+1] ? res = true : undefined;
        }
        return res
    }  
}

function nevDec(nb){
    nb = nb.toString()
    res = true
    for(let i=0;i<nb.length-1;i++){
        nb[i] > nb[i+1] ? res = false : undefined;
    }
    return res
}

findPasswords()