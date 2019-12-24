const fs = require('fs');
const read = fs.readFileSync("input24.txt");
let data = read.toString().split('\n')
let grid = []

function Tile(type,x,y,points){
    this.type = type
    this.x = x
    this.y = y
    this.points = points
    this.level = 0;
}
let p=0
for(let y=0;y<data.length;y++){
    for(let x=0;x<data[y].length;x++){
        grid.push(new Tile(data[y][x],x,y,Math.pow(2,p)))
        p++
    }
}

let partTwoGrid = JSON.parse(JSON.stringify(grid))

const partOne = {
    resetArr: grid.map(a => ({...a})),
    saved:[],
    found:false,
    run: function(){
        while(!this.found){
            this.resetArr.forEach(function(el,i,arr){
                let ot = arr.filter(ol=>ol.type == '#');
                    let left = ot.find(ol=>ol.x==el.x-1 && ol.y==el.y)
                    let right = ot.find(ol=>ol.x==el.x+1 && ol.y==el.y)
                    let up = ot.find(ol=>ol.x==el.x && ol.y==el.y-1)
                    let down = ot.find(ol=>ol.x==el.x && ol.y==el.y+1)
                    let count = 0
                    left ? count++ : undefined
                    right ? count++ :undefined
                    up ? count++ : undefined
                    down ? count++ : undefined
                if(el.type=='#'){
                    count !== 1 ? grid.find(ol=>ol.x==el.x && ol.y==el.y).type = '.' : undefined
                }else if(el.type=='.'){
                    count== 1 || count==2 ? grid.find(ol=>ol.x==el.x && ol.y==el.y).type = '#' : undefined

                }
            })
            this.resetArr = grid.map(a => ({...a}))
            let txt = ''
            grid.forEach((il)=> {txt+=il.type+','+il.x+','+il.y})
            if(this.saved.indexOf(txt)==-1){
                this.saved.push(txt)
            }else{
               this.found = true;
               console.log('Part one : '+this.resetArr.filter(ol=>ol.type=='#').map(ol=>ol.points).reduce((a,b)=> a+b))
            }
            
        }
    },
   partTwo: function(){
        let times = 0;
        while(times<200){
            times++ 
            let start = times<101 ? times * -1 : -100
            for(let i=start;i<=Math.abs(start);i++){
                let index = i + 100;
                updateGrid(grids[index],i)
                level++
            }
            oldgrids = JSON.parse(JSON.stringify(grids));
                     
        }   
        console.log('Part two : ' + grids.map(el => el.filter(b => b.type=='#').length).reduce((a,b)=>a+b))        
    }  
}

let grids = []      // Create all the grids 
let level = -100
for(let i=0;i<200;i++){
    let m = 0
    let newgrid = []
    for(let y=0;y<5;y++){
        for(let x=0;x<5;x++){
            let tile = new Tile('.',x,y,Math.pow(2,m))
            tile.level = level;
            newgrid.push(tile)
            m++           
        }
    }   // We jump and push the starting grid if level is 0
    level==-1 ? (grids.push(newgrid),grids.push(partTwoGrid),level+=2): (level++,grids.push(newgrid))   
}

let oldgrids = JSON.parse(JSON.stringify(grids)); // Create deep copy of all the grids to work on

function updateGrid(grid,level){  
   let resetArr = grid.map(a => ({...a}))
   resetArr.find(el=>el.x==2 && el.y==2).type = '?'
   resetArr.forEach(function(el,i,arr){
    if(el.type=='?'){
        return;
    }
    let ot = arr.filter(ol=>ol.type == '#');
    let count = 0
    let left, right, up, down;
    let outerOff = false;
    let innerOff = false;
    let rightT = 0, leftT = rightT, upT = rightT, downT = rightT
    level == -100 ? outerOff = true : level == 100 ? innerOff = true : undefined
    let outer = !outerOff ? oldgrids[100+(level-1)].filter(ol=>ol.type == '#') : undefined
    let inner = !innerOff ? oldgrids[100+(level+1)].filter(ol=>ol.type == '#') : undefined;
    
    // BASE
    left = ot.find(ol=>ol.x==el.x-1 && ol.y==el.y)
    right = ot.find(ol=>ol.x==el.x+1 && ol.y==el.y)
    up = ot.find(ol=>ol.x==el.x && ol.y==el.y-1)
    down = ot.find(ol=>ol.x==el.x && ol.y==el.y+1)
    /// NORMAL 
       if(el.x==1 && el.y==1 || el.x==3 && el.y==1 || el.x==1 && el.y==3 || el.x==3 && el.y==3){
       }
    /// ALL LEFT 
    else if(el.x==0){  
        left =  !outerOff ? outer.find(ol=>ol.x==1 && ol.y==2) : undefined
        if(el.y==1 || el.y== 2 || el.y==3){
        }
        else if(el.y==0){
            up =  !outerOff ? outer.find(ol=>ol.x==2 && ol.y==1) : undefined
        }else if(el.y==4){
            down =  !outerOff ? outer.find(ol=>ol.x==2 && ol.y==3) : undefined
        }
    /// ALL RIGHT
    }else if(el.x==4){
          right =  !outerOff ? outer.find(ol=>ol.x==3 && ol.y==2) : undefined
        if(el.y==1 || el.y== 2 || el.y==3){
        }else if(el.y==0){
            up =   !outerOff ? outer.find(ol=>ol.x==2 && ol.y==1) : undefined
        }else if(el.y==4){
            down =  !outerOff ? outer.find(ol=>ol.x==2 && ol.y==3) : undefined
        }
        /// ALL TOP
    }else if(el.y==0){
        up = !outerOff ? outer.find(ol=>ol.x==2&& ol.y==1) : undefined
        /// ALL BOTTOM
    }else if(el.y==4){
        down = !outerOff ? outer.find(ol=>ol.x==2 && ol.y==3) : undefined
        /// ELSE
    }else{
        if(el.x==1){
            rightT = !innerOff ? inner.filter(ol=>ol.x==0).length : undefined
        }else if(el.x==3){
            leftT = !innerOff ?  inner.filter(ol=>ol.x==4).length : undefined
        }else if(el.y==1){
            downT = !innerOff ? inner.filter(ol=>ol.y==0).length : undefined
        }else if(el.y==3){
            upT = !innerOff ? inner.filter(ol=>ol.y==4).length :undefined
        }
    }

    /// COUNT
    left ? count++ : undefined, right ? count++ :undefined,up ? count++ : undefined,down ? count++ : undefined 
    rightT ? count+=rightT : undefined,leftT ? count+= leftT : undefined,downT ? count+=downT : undefined, upT ? count+=upT : undefined
   
    // CHANGE OR NOT
    if(el.type=='#'){
        count !== 1 ? grid.find(ol=>ol.x==el.x && ol.y==el.y).type = '.' : undefined
    }else if(el.type=='.'){
        count== 1 || count==2 ? grid.find(ol=>ol.x==el.x && ol.y==el.y).type = '#' : undefined
   }
   })
}

partOne.run()
partOne.partTwo()


