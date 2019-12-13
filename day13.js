const fs = require('fs');
const read = fs.readFileSync("input13.txt");
let data = read.toString().split(',').map(Number)
let output =[]; 
let relativeBase = 0;
let tiles = [];
let score = 0;
let blocks = 0;

function Tile(x,y,id){
    this.x = x;
    this.y = y;
    this.id = id;
}

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
function getDiagnostic(){
    relativeBase = 0;
    output = []
    tiles = [];
    data[0] = 2
    for(let i=0;i<data.length;i++){
        if(output.length==3){
            if(output[0]==-1 && output[1]==0){
                score = output[2]
            }else{
                let t = tiles.find(el=>el.x == output[0] && el.y ==output[1])
                if(!t){
                    let tile = new Tile(output[0],output[1],output[2])           
                    tiles.push(tile)
                    if(tile.id==2){
                        blocks++
                    }
                }else{
                    t.id = output[2]
                }           
                if(output[2]==4){
                    let ball= tiles.find(el=> el.id==4)
                    ball.x = output[0]
                    ball.y = output[1] 
                }else if(output[2]==3){
                   let pad= tiles.find(el=> el.id==3)
                    pad.x = output[0]
                    pad.y = output[1] 
                }
            
            } 
            output = []
        }
        
        let opcode = data[i].toString().split('');
        let instruction = opcode.length == 1 ? parseInt(opcode[opcode.length-1]) :  parseInt(opcode[opcode.length-2] + opcode[opcode.length-1])
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
                let ball = tiles.find(el=>el.id==4)
                let pad = tiles.find(el=> el.id==3)           
                ball.x > pad.x ? input = 1 : ball.x < pad.x ? input = -1 : input = 0
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

getDiagnostic();
console.log('PART ONE '  + blocks)
console.log('PART TWO ' + score)