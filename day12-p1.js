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
const steps = 1000;
const calculate = {
    run: function(){
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

    }
    let resPartOne = 0
    moons.forEach(el =>{
        el.total = this.getTotal(el)
        resPartOne += el.total;
        
    })
    console.log('Part One ' + resPartOne)
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


calculate.run()
