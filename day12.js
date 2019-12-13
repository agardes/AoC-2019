const fs = require('fs');
const read = fs.readFileSync("input12.txt");
let input = read.toString().split('\n')
let regex = /[+-]?\d+(?:\.\d+)?/g;
let match;
let it = []
let data = []
let moons = []
while (match = regex.exec(input)) {
    it.push(parseInt(match[0]))
    it.length== 3 ? (data.push(it), it=[]) : undefined
}
data.forEach(el =>{
    moons.push(new Moon(el[0], el[1], el[2]))
})
function Moon(x,y,z){
    this.pos= [x,y,z];
    this.grav = [0,0,0]
    this.vel = [0,0,0]
}
let coordX=[]
let coordY=[]
let coordZ=[]
const calculate = {
    run: function(steps){
        for(let j=0;j<steps;j++){
            for(var i=0;i<moons.length;i++){
                let grav = this.getGravity(moons[i],i,0,0,0)
                moons[i].grav[0] = grav[0]
                moons[i].grav[1] = grav[1]
                moons[i].grav[2] = grav[2]
            }
           
            for(var i=0;i<moons.length;i++){
                this.updateVelocity(moons[i])
            }
            coordX.push(moons[0].pos[0] + "," + moons[1].pos[0] + ','+ moons[2].pos[0] + "," + moons[3].pos[0]  )
            coordY.push(moons[0].pos[1] + "," + moons[1].pos[1] + ','+ moons[2].pos[1] + "," + moons[3].pos[1]  )
            coordZ.push(moons[0].pos[2] + "," + moons[1].pos[2] + ','+ moons[2].pos[2] + "," + moons[3].pos[2]  )        
    }
    let resPartOne = 0
    moons.forEach(el =>{
        el.total = this.getTotal(el)
        resPartOne += el.total;
       
    })
    steps==1000 ? console.log('Part One ' + resPartOne) : undefined

    },
    getGravity(moon,index,x,y,z){

        for(let i=0;i<moons.length;i++){
            if(i!==index){
            moon.pos[0] > moons[i].pos[0] ? x-=1:
                moons[i].pos[0] > moon.pos[0] ? x+=1 :
                    x = x
            moon.pos[1] > moons[i].pos[1] ? y-=1 :
                    moons[i].pos[1] > moon.pos[1] ? y+=1 :
                        y = y
            moon.pos[2] > moons[i].pos[2] ? z-=1  :
                    moons[i].pos[2] > moon.pos[2] ? z+=1 :
                            z = z
            }
        }  
       
        return [x,y,z]
       
    },
    updateVelocity(moon){
        for(let i=0;i<3;i++){
            moon.vel[i] += moon.grav[i]
            moon.pos[i] +=  moon.vel[i]
        }
    },
    getTotal(moon){
        let pot = Math.abs(moon.pos[0]) + Math.abs(moon.pos[1]) + Math.abs(moon.pos[2])
        let kin = Math.abs(moon.vel[0]) + Math.abs(moon.vel[1]) + Math.abs(moon.vel[2])
        return pot * kin   
    }

   
}


calculate.run(1000)
calculate.run(300000)

let cycles = [getCycle(coordX),getCycle(coordY),getCycle(coordZ)]

console.log('Part Two ' + lcm(cycles))

function getCycle(arr){
   let sim = mode(arr)
   let start;
   let first = true;
   let prev;
   let next;
   for(var i=0;i<arr.length;i++){
    if(arr[i]==sim){
        if(first){
            first = false;
            prev = arr[i-1]
            next =  arr[i+1]
            start = i;
        }else{
            if(arr[i-1]==prev && arr[i+1]==next){
               return i - start; 
            }
        }
    }
} 
}
function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}


function gcd2(a, b) {
    // Greatest common divisor of 2 integers
    if(!b) return b===0 ? a : NaN;
    return gcd2(b, a%b);
  }
  function gcd(array) {
    // Greatest common divisor of a list of integers
    var n = 0;
    for(var i=0; i<array.length; ++i)
      n = gcd2(array[i], n);
    return n;
  }
  function lcm2(a, b) {
    // Least common multiple of 2 integers
    return a*b / gcd2(a, b);
  }
  function lcm(array) {
    // Least common multiple of a list of integers
    var n = 1;
    for(var i=0; i<array.length; ++i)
      n = lcm2(array[i], n);
    return n;
  }