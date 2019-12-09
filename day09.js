const fs = require('fs');
const read = fs.readFileSync("input09.txt");
let data = read.toString().split(',').map(Number)
let resetArr = [...data]
let output =[]; 
let relativeBase = 0;

console.log('PART ONE : ' + getDiagnostic(1))
console.log('PART TWO : ' + getDiagnostic(2))

function getValue(a){
    return data[a] == undefined ? 0: data[a] ;
}

function getIndex(mode,ip){
    switch(mode){
        case 0: return data[ip]
        case 1: return ip
        case 2: return relativeBase+data[ip]           
    }
}
function getDiagnostic(input){
    
    data = [...resetArr]
    relativeBase = 0;
    output = []

    for(let i=0;i<data.length;i++){
        let opcode = data[i].toString().split('');
        opcode.length == 1 ? instruction = parseInt(opcode[opcode.length-1]) :  instruction = parseInt(opcode[opcode.length-2] + opcode[opcode.length-1])
        if(instruction==99){            
            i = data.length;
            return output
        }
        let modeFirst = opcode[opcode.length-3] ? parseInt(opcode[opcode.length-3]) : 0;
        let modeSecond = opcode[opcode.length-4] ? parseInt(opcode[opcode.length-4]) : 0;
        let modeThird = opcode[opcode.length-5] ? parseInt(opcode[opcode.length-5]) :  0;
        let a = getIndex(modeFirst,i+1)
        let b = getIndex(modeSecond,i+2)
        let c = getIndex(modeThird,i+3)
        switch (instruction) {
            case 1:
                data[c] = getValue(a) + getValue(b);
                i+=3
                break;
            case 2:
                data[c] = getValue(a) * getValue(b);
                i+=3
                break;
            case 3:
                data[a] = input;
                i += 1;
                break;
            case 4:
                output.push(data[a])
                i += 1;
                break;
            case 5:
                getValue(a) != 0 ? i = getValue(b)-1 : i+=2
                break;
            case 6:
                getValue(a)==0 ? i = getValue(b)-1 : i+=2;
                break;
            case 7:
                getValue(a)<getValue(b) ? data[c]=1 : data[c]=0
                i += 3;
                break;
            case 8:
                getValue(a)==getValue(b) ? data[c] = 1 : data[c] = 0;
                i+=3
                break;
            case 9:
                relativeBase += getValue(a);
                i+=1
                break;
        }
        
    }
    return output
}
