const fs = require('fs');
const read = fs.readFileSync("input15.txt");
let data = read.toString().split(',').map(Number)

let output =[]; 
let relativeBase = 0;
let grid = [];
let foundOxSys = false;
let finished = false;

function Tile(x,y,type){
    this.x = x;
    this.y = y;
    this.type = type;
    this.tried = []
    this.visited = false
}

let starter = new Tile(0,0,".");
grid.push(starter);
let g = []
const droid = {
    direction: [1,2,3,4],
    posX:0,
    posY:0,
    askedX:0,
    askedY:0,
    prevDir:'',
    getFullMap: function(){
       drawGrid()
       console.log('PART ONE '  + this.getBFS(0,0,'@').length)
       this.partTwo();
    },
    partTwo: function(){
        let start = grid.find(el => el.type == '@')
        let empty = grid.filter(el => el.type == ".");
        start.type = "O"
        let min = 0
        while(empty.length>0){
            empty = grid.filter(el => el.type == ".");
            let oxy = grid.filter(el => el.type == "O");
            oxy.forEach(function(e){
                let x = e.x;
                let y = e.y
                let left = grid.find(el=>el.x == x-1 && el.y == y);
                left.type == '.' ? left.type = "O" : undefined;
                let right = grid.find(el=>el.x == x+1 && el.y == y)
                right.type == '.' ? right.type = "O" : undefined;
                let up = grid.find(el=>el.x == x && el.y == y-1)
                up.type == '.' ? up.type = "O" : undefined;
                let down = grid.find(el=>el.x == x && el.y == y+1)
                down.type == '.' ? down.type = "O" : undefined;
               
            })
           min++
        }
       console.log('PART TWO ' + (min-1))
    },
    sendMovementTry: function(){
            if(foundOxSys){
                if(g.length==0){ // Build the full map
                    g = this.getBFS(this.posX,this.posY, undefined)
                }
                if(g==false){ // Full map built
                    this.getFullMap()
                    finished = true;
                }else{
                    let m = g.shift()
                    this.askedX = this.posX
                    this.askedY = this.posY
                    switch(m){
                        case 1:
                            this.askedY = this.posY - 1;
                            this.prevDir = 2
                            return m
                        case 2:
                            this.askedY = this.posY + 1;
                            this.prevDir = 1
                            return m
                        case 3:
                            this.askedX = this.posX - 1
                            this.prevDir = 4
                            return m
                        case 4:
                            this.askedX = this.posX + 1;
                            this.prevDir = 3
                            return m
                    }
                }

             
            }
            let currentTile = grid.find(el=>el.x==this.posX && el.y==this.posY)
            let difference = this.direction.filter(x => !currentTile.tried.includes(x));
            this.askedX = this.posX
            this.askedY = this.posY
            let toAsk = difference.pop();
            currentTile.tried.push(toAsk) 

        if(!toAsk){
            currentTile.tried = []
            difference = this.direction.filter(x => !currentTile.tried.includes(x));
            toAsk = difference.pop();
        }
            switch(toAsk){
                case 1:
                    this.askedY = this.posY - 1;
                    this.prevDir = 2
                    return toAsk
                case 2:
                    this.askedY = this.posY + 1;
                    this.prevDir = 1
                    return toAsk
                case 3:
                    this.askedX = this.posX - 1
                    this.prevDir = 4
                    return toAsk
                case 4:
                    this.askedX = this.posX + 1;
                    this.prevDir = 3
                    return toAsk
            }
        
    },
    getStatus: function(status){
        let askedTile = new Tile(this.askedX,this.askedY,undefined);
        let isAlready = grid.find(el=>el.x==this.askedX && el.y==this.askedY)
        switch(status){
            case 0:
                askedTile.type = '#'
                break;
            case 1:
                askedTile.type = "."
                askedTile.tried.push(this.prevDir)
                this.move(this.askedX,this.askedY)
                break;
            case 2:
                askedTile.type = "@"
                askedTile.tried.push(this.prevDir)
                this.move(this.askedX,this.askedY);
                break;
            }
            if(!isAlready){
                grid.push(askedTile);
            }

    },
    move: function(x,y){
        this.posX = x;
        this.posY = y
    },
    getBFS(x,y,use){
        for(const el of grid){
            el.visited = false;
        }
        let minX = grid.map(el=>el.x).reduce((a,b) => a < b ? a : b)
        let maxX = grid.map(el=>el.x).reduce((a,b) => a > b ? a : b)
        let minY = grid.map(el=>el.y).reduce((a,b) => a < b ? a : b)
        let maxY = grid.map(el=>el.y).reduce((a,b) => a > b ? a : b)
        let startingAt = [x,y]
        function getShortest(startingAt, grid,use) {
            let dY = startingAt[1];
            let dX = startingAt[0];
            let location = {
              dY: dY,
              dX: dX,
              path: [],
              status: 'Start'
            };

            let queue = [location];
            while (queue.length > 0) {
                let currentLocation = queue.shift();
                let directions = ['North','East','South','West']

                for(const dir of directions){
                    let newLocation = search(currentLocation, dir, grid,use);
                    if(newLocation.status === 'foundOxSys') {
                        return newLocation.path;
                    }else if(newLocation.status === 'Valid') {
                        queue.push(newLocation);
                    }
                }
                
            }
                return false;

        };

        function status(location, grid,use) {
            let dY = location.dY;
            let dX = location.dX;
            let el = grid.find(el=> el.x == dX && el.y == dY)
            if(!el){
                return 'foundOxSys'
            }
            if (location.dX < minX ||
                location.dX > maxX ||
                location.dY < minY ||
                location.dY > maxY) {
                return 'Invalid';
            }else if(el.type == use){
                return 'foundOxSys';
            }else if (el.type == '#' || el.visited == true) {
                return 'Blocked';
            }else if (el.type == "."){
                return 'Valid';
            }

        };

        function search (currentLocation, direction, grid,use) {
            let newPath = currentLocation.path.slice();
            let c = {'North':1,'South':2,'West':3,"East":4}
            newPath.push(c[direction]);

            let dY = currentLocation.dY;
            let dX = currentLocation.dX;

            direction=='North' ? dY-- : direction=='East' ? dX++ : direction=='South' ? dY++ : dX--

            let newLocation = {
                dY: dY,
                dX: dX,
                path: newPath,
                status: undefined
            };
            newLocation.status = status(newLocation, grid,use);

            let e = grid.find(el=> el.x == dX && el.y == dY)
            if (newLocation.status === 'Valid') {
                e.visited = true;
            }

            return newLocation;
            };
            
        return getShortest(startingAt, grid,use)
        }

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
function getDiagnostic(input){

    for(let i=0;i<data.length;i++){
        let opcode = data[i].toString().split('');
        let instruction = opcode.length == 1 ? parseInt(opcode[opcode.length-1]) :  parseInt(opcode[opcode.length-2] + opcode[opcode.length-1])
        if(instruction==99 || finished){            
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
                input = droid.sendMovementTry();
                data[a] = input;
                i += 1;
                break;
            case 4:
                droid.getStatus(data[a])
                if(data[a]==2){
                    foundOxSys = true;
                }
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

getDiagnostic()

function drawGrid(x,y){
    let minX = grid.map(el=>el.x).reduce((a,b) => a < b ? a : b)
    let maxX = grid.map(el=>el.x).reduce((a,b) => a > b ? a : b)
    let minY = grid.map(el=>el.y).reduce((a,b) => a < b ? a : b)
    let maxY = grid.map(el=>el.y).reduce((a,b) => a > b ? a : b)
    let res = ''
    for(let a=minY;a<=maxY;a++){
        for(let b=minX;b<=maxX;b++){
            if(a==0&&b==0){
                res+="S"
            }else if(a==y && b==x){
                res+='D'
            }else{
                   let d = grid.find(el=> el.x == b && el.y == a)
                 !d ? res+=' ' : res+=d.type  
                }                           
        }
        res+='\n';
    } 
    console.log(res)
}
