const fs = require('fs');
const read = fs.readFileSync("input07.txt");
let data = read.toString().split(",").map(Number)

let output =''; 
let maxValue = 0;
let finished = false;
var indexes = [0,0,0,0,0]
var arrays = [[...data],[...data],[...data],[...data],[...data]]
var queues = [[],[],[],[],[]]

const program = function (part){
    part == 'partOne' ? combinations = getAnagrams('01234') : combinations = getAnagrams('56789');
    combinations.forEach(el =>{
        queues = [[],[],[],[],[]]
        finished = false;
        indexes = [0,0,0,0,0]
        arrays = [[...data],[...data],[...data],[...data],[...data]]
        let arr = el.split('').map(Number)
        for(var i =0;i<arr.length;i++){
            queues[i].push(arr[i]);
        }
        queues[0].push(0)
        const res = function(){
            while(!finished){
                for(let j=0;j<5;j++){
                    signal = getSignal(arrays[j],indexes[j],j,queues[j],queues[(j+1)%5])
                }
            }
                return signal
        }
        res() > maxValue ? maxValue = res() : undefined;
    })
    console.log(part + ' : ' + maxValue)
}

program('partOne')
program('partTwo')

function getSignal(data,iP,id,queue,dest){

    for(let i=iP;i<data.length;i++){
        let opcode = data[i].toString().split('');
        let instruction = '';
        opcode.length == 1 ? instruction = parseInt(opcode[opcode.length-1]) :  instruction = parseInt(opcode[opcode.length-2] + opcode[opcode.length-1])
        if(instruction==3){
            if(queue.length<1){
                indexes[id] = i-1;
                return 
            }else{
              input = queue.shift() 
            }
            
        }
        if(instruction==99){
            dest.push(output)
            id==4 ? finished = true : undefined;
            return output
        }
        opcode[opcode.length-3] ? modeFirstP = parseInt(opcode[opcode.length-3]) : modeFirstP = 0;
        opcode[opcode.length-4] ? modeSecondP = parseInt(opcode[opcode.length-4]) : modeSecondP = 0;
        modeFirstP == 1 ? valFirst = data[i+1] : valFirst = data[data[i+1]];
        modeSecondP == 1 ? valSecond= data[i+2] : valSecond = data[data[i+2]];
        i = process(instruction,valFirst,valSecond,i,input,data)
        if(instruction==4){
            indexes[id] = i;
            dest.push(output)
            return output
        }
    }
    return output
}

function process(opcode, firstVal, secondVal,i,input,data){

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

function swap(chars, i, j) {
    var tmp = chars[i];
    chars[i] = chars[j];
    chars[j] = tmp;
}

function getAnagrams(input) {
    var counter = [],
        anagrams = [],
        chars = input.split(''),
        i;
    for (i = 0; i < chars.length; i++) {
        counter[i] = 0;
    }
    anagrams.push(input);
    i = 0;
    while (i < chars.length) {
        counter[i]<i ? (swap(chars, i % 2 === 1 ? counter[i] : 0, i),counter[i]++, i =0,  anagrams.push(chars.join(''))) : (counter[i] = 0, i++)
    }

    return anagrams;
}
