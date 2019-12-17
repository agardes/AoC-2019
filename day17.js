const fs = require('fs');
const read = fs.readFileSync("input17.txt");
let data = read.toString().split(',').map(Number);

function Tile(x,y,type){
    this.x=x;
    this.y=y;
    this.type=type;
}

let resetArr = [...data]
let output =[]; 
let relativeBase = 0;

getDiagnostic('partOne')
output = output.map(el => String.fromCharCode(el));
let x = 0;
let y = 0;
let tiles = []
output.forEach(function(el){
   el == '\n' ? (y++,x=0) : (tiles.push(new Tile(x,y,el)), x++)
})
let scaff = tiles.filter(el=>el.type=='#')
let resp1 = 0
scaff.forEach(function(el){
    let y = el.y;
    let x = el.x
    let up = scaff.find(el=>el.x==x&&el.y==y-1)
    let down = scaff.find(el=>el.x==x&&el.y==y+1)
    let left = scaff.find(el=>el.x==x-1&&el.y==y)
    let right = scaff.find(el=>el.x==x+1&&el.y==y)
    up && down && left && right ? resp1 += (x*y) : undefined;
})

console.log('PART ONE : ' + resp1)

const vacuum = {
    x:tiles.find(el=>el.type=='^').x,
    y:tiles.find(el=>el.type=='^').y,
    prevDir:undefined,
    directions:[],
    facing:'U',
    input:undefined,
    init:function(){
        let running = true;
        while(running){
            let dir = this.getDir()
            let steps = this.getSteps()
            !steps ? running = false :undefined
            this.directions.push([dir,steps])
        }
        this.directions.pop() 
        this.getPatterns()
        this.partTwo()
    },
    partTwo:function(){
        let routine = this.routine+'\n'
        let patterns = this.getPatterns();
        let A = patterns[0]+'\n'
        let B = patterns[1]+'\n'
        let C = patterns[2]+'\n'
        let V = 'n\n'
        let rout_ = [] 
        let A_ = []
        let B_ = []
        let C_ = []
        let v_ = []
        for(let i=0;i<routine.length;i++){
            rout_.push(routine.charCodeAt(i))
        }
        for(let i=0;i<A.length;i++){
           A_.push(A.charCodeAt(i))
        }
        for(let i=0;i<B.length;i++){
            B_.push(B.charCodeAt(i))
        }
        for(let i=0;i<C.length;i++){
            C_.push(C.charCodeAt(i))
        }
        for(let i=0;i<V.length;i++){
            v_.push(V.charCodeAt(i))
        }
        let arr = [...rout_,...A_,...B_,...C_,...v_]
        this.input = arr;
    },
    getPatterns:function(){
        let d = this.directions.map(el=>el.toString());
        let patterns = [];
        let indUsed = []
        for(let i=0;i<d.length;i++){
            if(!indUsed.includes(i)){
            let el = d[i];
            let el2 = d[i+1]
            let el3 = d[i+2]
            let indexes = [i]
            let nextIndex = i;
            while(nextIndex>-1){
                nextIndex = d.indexOf(el,nextIndex+1)
                if(this.directions[nextIndex+1]==el2 && this.directions[nextIndex+2]==el3){
                    indexes.push(nextIndex)
                }        
            }
            
            let pattern = [el,el2,el3]
            let j = 2
            let f = true;
            while(f){
            j++
            let voisin = d[i+j]
                    for(s of indexes){
                        let r = (s+j) 
                        if(voisin==d[r] && !indUsed.includes(r)){

                        }else{
                            f = false;
                        }
                    }
                    if(f){
                        pattern.push(voisin)
                    }
            }
            let l = pattern.length;
            for(p of indexes){
                indUsed.push(p)
                for(let h=1;h<l;h++){
                    indUsed.push(p+h)
                }
            }
            patterns.push(pattern)
            patterns.length<2 ? i+=l-1 : i = i
         }
         
        }
        let A = new RegExp(patterns[0].join(),'gi')
        let B = new RegExp(patterns[1].join(),'gi')
        let C = new RegExp(patterns[2].join(),'gi')
        let routine = d.join().replace(A,"A")
        routine = routine.replace(B,'B')
        routine = routine.replace(C,'C') 
        this.routine = routine;
        return patterns
    },
    getDir:function(){
        let dir;
        if(this.facing=="U" && scaff.find(el=>el.x==this.x-1&&el.y==this.y) ||
           this.facing=="L" && scaff.find(el=>el.x==this.x&&el.y==this.y+1) ||
           this.facing=="D" && scaff.find(el=>el.x==this.x+1&&el.y==this.y) ||
           this.facing=="R" && scaff.find(el=>el.x==this.x&&el.y==this.y-1) ){
            dir = 'L'
            switch(this.facing){
                case "U":
                    this.facing = "L"
                    break;
                case "L":
                    this.facing = "D"
                    break;
                case "D":
                    this.facing = "R"
                    break;
                case "R":
                    this.facing = "U"
                    break;
            }
        }else if(this.facing=="U" && scaff.find(el=>el.x==this.x+1&&el.y==this.y) ||
        this.facing=="L" && scaff.find(el=>el.x==this.x&&el.y==this.y-1) ||
        this.facing=="D" && scaff.find(el=>el.x==this.x-1&&el.y==this.y) ||
        this.facing=="R" && scaff.find(el=>el.x==this.x&&el.y==this.y+1) ){
         dir = 'R'
         switch(this.facing){
             case "U":
                 this.facing = "R"
                 break;
             case "L":
                 this.facing = "U"
                 break;
             case "D":
                 this.facing = "L"
                 break;
             case "R":
                 this.facing = "D"
                 break;
         }
     }
     return !dir ? undefined : dir
    },
    getSteps: function(){
        let facing = this.facing;
        let nextTile;
        let steps = 0;
        let x;
        let y;
        switch(facing){
            case "L":
                nextTile = tiles.find(el=>el.y==this.y && el.x == this.x-1)
                if(!nextTile){
                    return undefined
                }
                x = nextTile.x
                while(nextTile && nextTile.type=="#"){
                    steps++
                    x--
                    nextTile = tiles.find(el=>el.y==this.y && el.x == x)
                }
                break;
            case "U":
                nextTile = tiles.find(el=>el.y==this.y-1 && el.x == this.x)
                if(!nextTile){
                    return undefined
                }
                y = nextTile.y
                while(nextTile && nextTile.type=="#"){
                    steps++
                    y--
                    nextTile = tiles.find(el=>el.y==y && el.x == this.x)
                }
                break;
            case "R":
                nextTile = tiles.find(el=>el.y==this.y && el.x == this.x+1)
                if(!nextTile){
                    return undefined
                }
                x = nextTile.x
                while(nextTile && nextTile.type=="#"){
                    steps++
                    x++
                    nextTile = tiles.find(el=>el.y==this.y && el.x == x)
                }
                break;
            case "D":
                nextTile = tiles.find(el=>el.y==this.y+1 && el.x == this.x)
                if(!nextTile){
                    return undefined
                }
                y = nextTile.y
                while(nextTile && nextTile.type=="#"){
                    steps++
                    y++
                    nextTile = tiles.find(el=>el.y==y&& el.x == this.x)
                }
                break;
        }
        this.x = this.facing == "L" ? this.x - steps : this.facing == "R" ? this.x + steps : this.x
        this.y = this.facing == "U" ? this.y - steps : this.facing == 'D' ? this.y + steps : this.y
        return steps
    }

}

//////// INTCODE

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
function getDiagnostic(part='partOne'){
    data = [...resetArr]
    relativeBase = 0;
    output = []
    part=='partTwo' ? data[0]=2 : undefined;
    for(let i=0;i<data.length;i++){
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
                data[a] = vacuum.input.shift()
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
vacuum.init()
let res = getDiagnostic('partTwo')
console.log('PART TWO : ' + res[res.length-1])