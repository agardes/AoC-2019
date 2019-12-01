    var fs = require('fs');
    var read = fs.readFileSync("input02.txt");
    var data = read.toString().split(",").map(Number);
    let resetArr = [...data]

    function run(data){
        for(var i=0;i<data.length;i++){
            let index = data[i+3]
            let index2 = data[i+1]
            let index3 = data[i+2]
            if(data[i]==1){
                data[index] = data[index2] + data[index3]
            }else if(data[i]==2){
                data[index] = data[index2] * data[index3]
            }else if(data[i]==99){
                i = data.length;
            }
            i+=3
        }
        return data[0]
    }
    // PART ONE
    data[1] = 12;
    data[2] = 2;  
    console.log("PART ONE " + run(data))

    // PART TWO
    for(var noun = 0;noun <100;noun++){
        for(var verb=0; verb<100;verb++){
                    data = [...resetArr]
                    data[1] = noun;
                    data[2] = verb;             
                    if(run(data)== 19690720){
                        return console.log('PART TWO ' + (noun*100+3))
                    }
                    
        }
    }
    

        

