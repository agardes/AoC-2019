var fs = require('fs');
var read = fs.readFileSync("input05.txt");
var data = read.toString().split(",").map(Number)
let resetArr = [...data]
let output =''; 

function getDiagnostic(input){
    data = [...resetArr]
    for(let i=0;i<data.length;i++){
        let opcode = data[i].toString().split('');
        opcode.length == 1 ? instruction = parseInt(opcode[opcode.length-1]) :  instruction = parseInt(opcode[opcode.length-2] + opcode[opcode.length-1])
        opcode[opcode.length-3] ? modeFirstP = parseInt(opcode[opcode.length-3]) : modeFirstP = 0;
        opcode[opcode.length-4] ? modeSecondP = parseInt(opcode[opcode.length-4]) : modeSecondP = 0;
        modeFirstP == 1 ? valFirst = data[i+1] : valFirst = data[data[i+1]];
        modeSecondP == 1 ? valSecond= data[i+2] : valSecond = data[data[i+2]];
        i = process(instruction,valFirst,valSecond,i,input)

        if(input==1){
            output > 0 ? i = data.length : undefined
        }      
    }
    return output
}

function process(opcode, firstVal, secondVal,i,input){
    switch(opcode){
        case 1:
            data[data[i+3]] = firstVal + secondVal
            i+=3;
            break;            
        case 2:
            data[data[i+3]] =firstVal * secondVal
            i+=3;
            break;
        case 3:
            data[data[i+1]] = input;
            i+=1;
            break;       
        case 4:
            output = firstVal;
            i+=1;
            break;
        case 5:
            firstVal !== 0 ? i = secondVal - 1 : undefined;          
            break;
        case 6:
            firstVal == 0 ? i = secondVal - 1 : undefined;          
            break;
        case 7:
            firstVal < secondVal ? data[data[i+3]] = 1 : data[data[i+3]] = 0;
            i+=3;
            break;
        case 8:
            firstVal == secondVal ? data[data[i+3]] = 1 : data[data[i+3]] = 0;
            i+=3;
            break;       
    }
    return i
}

console.log('Part one : ' + getDiagnostic(1))
console.log('Part two : '  + getDiagnostic(5))
