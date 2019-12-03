var fs = require('fs');
var read = fs.readFileSync("input03.txt");
var read2 = fs.readFileSync("input03-2.txt");
var wire1 = read.toString().split(",");
var wire2= read2.toString().split(",");

const run = {
    x:0,
    y:0,
    path1: [],
    path2:[],
    steps1: 0,
    steps2: 0,
    intersection: [],
    started:false,
    minVal: Number.MAX_VALUE,
    minSteps: Number.MAX_VALUE,
    move: function(way){
        switch(way){
            case 'L':
                this.x--
                break;
            case 'R':
                this.x++
                break;
            case 'U':
                this.y--
                break;
            case 'D':
                this.y++
                break;
        }
        
        return this.x.toString() +  ',' + this.y.toString();
    },
    action: function(wire){
        wire.forEach( dir => {
            
            way = dir.substring(0,1)
            steps = parseInt(dir.substring(1))
            for(let i=0;i<steps;i++){
                let coord = this.move(way);
                !this.started ? this.path1.push(coord) : (this.path1.indexOf(coord) !== -1 ?  (this.getDistance(coord) < this.minVal ? this.minVal = this.getDistance(coord) : undefined) : undefined)
          
            }
            
            
        })
        this.started = true;
        this.x = 0
        this.y = 0
    },
    action2: function(wire){
        wire.forEach( dir => {
            
            way = dir.substring(0,1)
            steps = parseInt(dir.substring(1))
            for(let i=0;i<steps;i++){
                let coord = this.move(way);
                !this.started ? this.path1.push(coord) : (this.steps2++ , this.path1.indexOf(coord) !== -1 && this.intersection.indexOf(coord) == -1 ?  (val = coord + ',' + this.steps2,this.intersection.push(val)): undefined)
          
            }
            
            
        })
        this.started = true;
        this.x = 0
        this.y = 0
    },
    getDistance: function(str){
        return Math.abs(parseInt(str.substring(0,str.indexOf(',')))) + Math.abs(parseInt(str.substring(str.indexOf(',')+1)))
    },
    partOne: function(){
        return this.minVal
    },
    partTwo: function(){
        while(this.intersection.length > 0){
            val = this.intersection.shift();
            vir = val.lastIndexOf(",")
            toSearch = val.substring(0,vir)
            steps2 = parseInt(val.substring(vir+1))
            wire1.forEach( dir => {
            
                way = dir.substring(0,1)
                steps = parseInt(dir.substring(1))
                for(let i=0;i<steps;i++){
                    let coord = this.move(way);
                    this.steps1++
                    
                    coord == toSearch ? (total = steps2 + this.steps1, total < this.minSteps ? (this.minSteps = total) : undefined) : undefined;
              
                }
                
            })
            this.steps1 =0;
            this.x = 0
            this.y = 0
            
        }
        return this.minSteps
    }

}

// PART ONE
/* run.action(wire1)
run.action(wire2)
console.log(run.partOne()); */

// PART TWO 
run.action2(wire1)
run.action2(wire2)
console.log(run.partTwo());


