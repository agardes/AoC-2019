const fs = require('fs');
const read = fs.readFileSync("input24.txt");
let data = read.toString().split('\n')
let grid = []

function Tile(type,x,y,points){
    this.type = type
    this.x = x
    this.y = y
    this.points = points
}
let p=0
for(let y=0;y<data.length;y++){
    for(let x=0;x<data[y].length;x++){
        grid.push(new Tile(data[y][x],x,y,Math.pow(2,p)))
        p++
    }
}

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
    }

}
partOne.run()