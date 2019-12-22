const fs = require('fs');
const read = fs.readFileSync("input22.txt");
let data = read.toString().split('\n')
let nbCards = 10007;
let cards = []

for(let i=0;i<nbCards;i++){
    cards.push(i)
}

data.forEach(function (el){
    let p = el.substring(0,3)
    let v;
    let n;
    switch (p){
        case 'cut':
            v = el.indexOf(' ')
            n = parseInt(el.substring(v))
            let d;
            cards = n > 0 ? (d=cards.splice(0,n),cards = [...cards,...d]) :  (d=cards.splice(n),cards = [...d,...cards])
            break;
        case 'dea':
            v = el.lastIndexOf(' ')
            n = parseInt(el.substring(v))
            if(isNaN(n)){
              let newStack = []
              cards.forEach(el => newStack.unshift(el))
              cards = newStack
            }else{
               let copy = [...cards]
               copy.forEach((el,i,arr) =>cards[(i*n)%arr.length]=el) 
            }
            break;
           
    }
})

console.log(cards.indexOf(2019))
