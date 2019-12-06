const fs = require('fs');
const read = fs.readFileSync("input06.txt");
let data = read.toString().split("\n").map(el => el.split(')'))
data.pop()

let count = 0;
let total = 0;
let steps = 0;

function Planet(name,parent){
    this.name = name;
    this.parent = parent;
    this.children = [];
    this.orbits = 0;
}

const run = {
    init:function(){
        objects = data.map(el => new Planet(el[1],el[0]))
        objects.push(new Planet('COM',undefined));
        objects.forEach(el => (el.parent = objects.find(n=>n.name==el.parent)))
        objects.forEach(el => (el.children.push(objects.filter(n=>n.parent==el))))
        objects.forEach(el => {
            count = 0;
            el.orbits = this.findHierarchy(el)
            total += el.orbits
        })
        console.log('PART ONE : ' + total);
        this.partTwo(objects.find(el=>el.name=='YOU'),objects.find(el=>el.name=='SAN'))

    },
    findHierarchy:function(planet,list=[]){
        if(planet.parent==undefined){
            return count
        }else{
            count++;
            list.push(planet.parent);
            return this.findHierarchy(planet.parent,list)
        }
    },
    partTwo:function(you,san){
        let listYou = []
        let listSan = []
        this.findHierarchy(you,listYou)
        this.findHierarchy(san,listSan)
        listSan = listSan.map(el=>el.name)
        listYou = listYou.map(el=>el.name)
        crossingAt = listYou.filter(value => listSan.includes(value)).shift()
        function rec(planet){
            if(planet.parent.name==crossingAt){
                return steps;
            }else{
                steps++
                return rec(planet.parent)
            } 
        }
        rec(you)
        rec(san)  
        console.log('PART TWO : '  + steps) 
    }   
}
run.init();
