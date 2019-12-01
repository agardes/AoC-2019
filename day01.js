var fs = require('fs');
var read = fs.readFileSync("input.txt");
var data = read.toString().split("\n").map(Number);
data.pop();

function calculate(el){
    return Math.floor(el/3)-2;
}

// PART ONE 
console.log(data.map(el => calculate(el)).reduce( (a,b) => a+b));

// PART TWO 
console.log(data.map(sumItUp).reduce( (a,b) => a+b))

function sumItUp(el){
    let toAdd = 0;
    counting = true;
    base = calculate(el);
    toAdd += base;

    while(counting){
        count = calculate(base);
        count < 0 ? counting = false : (toAdd+=count, base=count);
    }
    return toAdd
}