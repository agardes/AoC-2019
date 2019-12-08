const fs = require('fs');
const read = fs.readFileSync("input08.txt");
let data = read.toString().split('').map(Number)

const width = 25;
const height = 6;

let layers = [];
let w = 0;
let h = 0
let layer = [];

for(let i=0;i<data.length;i++){    
    layer.push(data[i]);
    w++  
    w == width ? (h++, w=0, h==height ? (layers.push(layer), h=0, layer=[]): undefined) : undefined
}

let index = layers.map(el => el.filter(e => e==0).length).reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0)
let total = layers[index]
let nbOne = 0;
let nbTwo = 0
for(let i=0;i<total.length;i++){
    total[i] == 1 ? nbOne ++ : total[i]==2 ? nbTwo++ : undefined;
}
console.log('part one : '  + nbTwo*nbOne)
let image = []
for(let r=0;r<width*height;r++){
    let j =0;
    let color = layers[j][r];
    while(color==2){
        color = layers[j][r]
        j++
     }
    image.push(color);
} 
let k =0  
let img = ''
for(let i=0;i<image.length;i++){
    k++
    image[i]==1 ?  img = img + '▮' :   img = img + '.'
    if(k==25){
        k = 0;
        console.log(img);
        img = ''
    }
}

