const fs = require('fs');
const read = fs.readFileSync("input14.txt");
let data = read.toString().split('\n').map(el => el.split('=>'));
data.pop()

let reactions = [];
let leftOvers = {}

for(let i=0;i<data.length;i++){
    let reg = /\d+/g;
    let input = data[i][0].split(', ')
    let output = data[i][1].trim().substring(data[i][1].lastIndexOf(' '))
    let nbOut = parseInt(data[i][1].match(reg)[0])
    let inputs = []
    for(const el of input){
        let nb = parseInt(el.match(reg)[0])
        let name = el.substring(el.indexOf(' ')).trim()
        inputs.push([nb,name])
    }
    let reaction = new Reaction([nbOut,output],inputs)
    reactions.push(reaction)
}

function Reaction(output,input){
    this.inputs = input;
    this.quantity = output[0];
    this.name = output[1]
    leftOvers[this.name] = 0
}
let fuel = reactions.find(el=>el.name=="FUEL")

function getOre(reaction, leftOvers, qtyWanted){
    let ore = 0;
    let name = reaction.name;
    let quantity = reaction.quantity;
    let inputs = reaction.inputs
    let qtyNeeded ;
    leftOvers[name] == 0 ? qtyNeeded = qtyWanted : 
                            leftOvers[name] > qtyWanted ? 
                            (leftOvers[name] -= qtyWanted, qtyNeeded = 0) : 
                            (qtyWanted-= leftOvers[name],leftOvers[name] = 0,qtyNeeded =qtyWanted) 
    if(qtyNeeded==0){
        return 0
    }
    let qt = Math.ceil(qtyNeeded/quantity)
    let leftover = (qt * quantity) - qtyNeeded;
    leftOvers[name] += leftover
    inputs.forEach(([qty,inputName]) => {
        if (inputName=='ORE') {
            ore +=  qty * qt;
        } else {
            let el = reactions.find(e => e.name == inputName)
            ore += getOre(el, leftOvers, qty*qt);
        }
    });

    return ore;
    
}

 function partTwo(){
    let trilion = 1000000000000;
    res = 0;
    i=5000;
    while(res<trilion){
        i+=10000;
        res = getOre(fuel,leftOvers,i)
        
    }
    res = 0;
    i -= 10000
    while(res<trilion){
        i++
        res = getOre(fuel,leftOvers,i)
    }
    return i-1
} 

console.log('Part One   '   + getOre(fuel,leftOvers,1))
console.log('Part Two   ' + partTwo())