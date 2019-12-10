const fs = require('fs');
const read = fs.readFileSync("input10.txt");
let data = read.toString().split('\n').map(el=>el.split(''))
data.pop()
function Asteroid(x,y){
    this.x = x;
    this.y = y;
    this.visibleAsteroids =[];
    this.angle = 0;
    this.distance = 0;
}
const height = data.length;
let width;
const map = {
    asteroids : [],
    laserX:0,
    laserY:0,
    getDiagonals: function(current,toCheck,others){
        let couldBlock = others.filter(el => el != toCheck && el.x != current.x && el.y != current.y && el.x !== toCheck.x && el.y !== toCheck.y && !(el.x < toCheck.x && el.x < current.x) && !(el.y < toCheck.y && el.y <current.y));
        for(let m=0;m<couldBlock.length;m++){
          el = couldBlock[m]
          let dx = Math.abs(current.x - el.x);
          let dy = Math.abs(current.y - el.y);
          let nx = el.x;
          let ny = el.y;
          let direct = dx == dy;
          let position;
          if(current.y < el.y){
              position = current.x > el.x ? 'topRight' : 'topLeft'
          }else{
              position = current.x > el.x ? 'bottomRight' : 'bottomLeft'
          }
          while(nx < width && nx >=0 && ny < height && ny >=0){
              if(position=='topLeft'){
                  if(direct){
                    nx++;
                    ny++ 
                  }else{
                   nx += dx;
                   ny += dy;  
                  }
                 
              }else if(position=='topRight'){
                  if(direct){
                  nx--
                  ny++
                  }else{
                  nx -= dx;
                  ny += dy;
                  }
                 
              }else if(position=='bottomLeft'){
                  if(direct){
                      nx++;
                      ny--;
                  }else{
                  nx += dx;
                  ny -= dy;
                  }
                 
              }else if(position=='bottomRight'){
                  if(direct){
                  nx--
                  ny--
                  }else{
                  nx -= dx;
                  ny -= dy;
                  }
                 
              }
              if(toCheck.x == nx && toCheck.y == ny){
                  return false
              }
          }
         
      }
     
      return true;
    },
    process: function(){
        for(let y=0;y<data.length;y++){
            width = data[y].length;
            for(let x=0;x<data[y].length;x++){
                if(data[y][x]=='#'){
                    this.asteroids.push(new Asteroid(x,y))
                }
            }
        }
    },
    isVisible: function (current,toCheck,others){
        // Horizontally
        if(current.y==toCheck.y){
            if(current.x == toCheck.x+1 || current.x == toCheck.x-1){
                return true;
            }else{
                let hor = others.filter( el => el != toCheck && el.y == current.y);
                if(hor.length > 0){
                    for(let k=0;k<hor.length;k++){
                        let el = hor[k];
                        if(el.x > current.x && el.x < toCheck.x || el.x < current.x && el.x > toCheck.x){
                            return false;
                        }
                       
                    }
                    return true;
                }else{
                    return true;
                }
            }
            //Vertically
        }else if(current.x==toCheck.x){
            if(current.y == toCheck.y+1 || current.y == toCheck.y-1){
                return true;
            }else{
                let ver = others.filter( el => el != toCheck && el.x == current.x);
                if(ver.length > 0){
                    for(let k=0;k<ver.length;k++){
                        let el = ver[k];
                        if(el.y > current.y && el.y < toCheck.y || el.y < current.y && el.y > toCheck.y){
                            return false;
                        }
                       
                    }
                    return true;
                }else{
                    return true;
                }
            }
            // Diagonally
        }else{
           if(this.getDiagonals(current,toCheck,others)==false || this.getDiagonals(toCheck,current,others)==false){
               return false
           }else{
               return true
           }
           
        }


    },
    getVisible: function(){
        for(let i=0;i<this.asteroids.length;i++){
            let current = this.asteroids[i];
            let others = this.asteroids.filter(el => el != current)
            others.forEach(toCheck =>{
                this.isVisible(current,toCheck,others) ? current.visibleAsteroids.push(toCheck) : undefined;
            })
           

        }
        this.laserY =this.asteroids.find( el=> el.visibleAsteroids.length == this.asteroids.map(el=>el.visibleAsteroids.length).reduce((a,b) => a > b ? a : b)).y
        this.laserX = this.asteroids.find( el=> el.visibleAsteroids.length == this.asteroids.map(el=>el.visibleAsteroids.length).reduce((a,b) => a > b ? a : b)).x
    },
    count:0,
    partTwo: function(){
        let laser = this.asteroids.find(el => el.x == this.laserX && el.y == this.laserY)
        let others = this.asteroids.filter(el => el != laser)
        others.forEach(el=>{
            el.distance = Math.abs(el.x - laser.x) + Math.abs(el.y - laser.y);
            el.angle = Math.atan2( el.y-this.laserY, el.x - this.laserX)* 180 / Math.PI
        })

       others.sort((a,b) => (a.angle < b.angle) ? -1 :1);
        let toStart;
        let prevAngle=0;
        for(var i=0;i<others.length;i++){
            if(others[i].angle==-90){
                toStart = i;
                i = others.length
            }
        }
        let kill = 0;
        while(others.length > 0 ){
            toStart == others.length ? toStart = 0 : undefined;
            if((others[toStart].angle != prevAngle && others.length> 1) || (others.length == 1) ){
                if(this.isVisible(laser,others[toStart],others)==true){
                    kill++
                    if(kill==200){
                        console.log('PART TWO = ' + (others[toStart].x * 100 + others[toStart].y) )
                        return
                    }
                    prevAngle = others[toStart].angle;
                    others = others.filter(el => el != others[toStart])                  
                }else{
                    toStart++
                }
            }else{
                toStart++
            }
        } 

    },
}



map.process()
map.getVisible()
console.log('PART ONE = ' + map.asteroids.map(el => el.visibleAsteroids.length).reduce((a,b)=> a > b ? a : b))
map.partTwo()