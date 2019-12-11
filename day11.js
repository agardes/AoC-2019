const fs = require('fs');
const read = fs.readFileSync("input11.txt");
let data = read.toString().split(',').map(Number)

/// This is running part two, change value in robot.gridSoFar for part one

let relativeBase = 0;
let partTwo = [];

function PanelGrid(x,y,color='B'){
    this.color = color;
    this.x = x
    this.y = y
    this.paintedOnce = false;
    this.coord = [this.x,this.y]
}

const robot = {
    directions: ['U','L','B','R'],
    indDir: 0,
    gridSoFar: [new PanelGrid(0,0,"W")], /// CHANGE VALUE HERE FOR PART ONE, REPLACE "W" WITH "B"
    run: function(){
        let outputs = getDiagnostic(0,0);
    },
    getPosition: function(index,x,y){
        let direction = this.directions[index];
        switch(direction){
            case 'U':
                y-- 
                break
            case 'L':
                x--
                break
            case 'B':
                y++
                break
            case 'R':
                x++
                break
        }
        return [x,y]
    }



}

robot.run()


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
function mod(n, m) {
    return ((n % m) + m) % m;
  }

function getDiagnostic(x,y){
    
  let output = []
    for(let i=0;i<data.length;i++){
        if(output.length==2){        
           let firstOutput = output.shift()
           let secondOutput = output.shift();
           let currentPanel = robot.gridSoFar.find( el => el.x == x && el.y == y)
           firstOutput == 0 ? currentPanel.color = 'B' : currentPanel.color = "W"       
           currentPanel.paintedOnce == false ? currentPanel.paintedOnce = true : undefined;
           let currX = currentPanel.x;
           let currY = currentPanel.y
           secondOutput == 0 ? robot.indDir = mod((robot.indDir+1),4) : robot.indDir = mod((robot.indDir-1),4) 
           let nextPos = robot.getPosition(robot.indDir,currX,currY)
           let doesExist = robot.gridSoFar.find( el => el.x == nextPos[0] && el.y == nextPos[1])
           if(!doesExist){
              let nextPanel = new PanelGrid(nextPos[0],nextPos[1]); 
              robot.gridSoFar.push(nextPanel); 
           }
            [x,y] = nextPos
            partTwo.push(nextPos)
        }
        let currentPanel = robot.gridSoFar.find( el => el.x == x && el.y == y)
        let opcode = data[i].toString().split('');
        let instruction = opcode.length == 1 ? parseInt(opcode[opcode.length-1]) :  parseInt(opcode[opcode.length-2] + opcode[opcode.length-1])
        if(instruction==99){       
            console.log('Part One ' + robot.gridSoFar.filter(el => el.paintedOnce == true).length)    
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
                input = currentPanel.color=='B'? 0 : 1;
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


let minX = partTwo.map(el => el[0]).reduce((a,b) => a<b ? a : b)
let maxX = partTwo.map(el => el[0]).reduce((a,b) => a>b ? a : b)
let minY = partTwo.map(el => el[1]).reduce((a,b) => a<b ? a : b)
let maxY = partTwo.map(el => el[1]).reduce((a,b) => a>b ? a : b)
res='';
partTwo = partTwo.map(el=> el.toString(','))
for(a=minY;a<=maxY;a++){
    for(b=minX;b<=maxX;b++){
       let coords=b.toString()+','+ a.toString()
       let isEmpty= partTwo.indexOf(coords) < 0 ;
       isEmpty ? res += " " : (curr = robot.gridSoFar.find(el=>el.x==b && el.y==a), curr.color=='B' ? res += " " : res += '▮')
    }
    res+='\n';
} 
console.log(res)

