//pirámide de números 1, 12, 123, ... cada línea en un array

const helpArr = [];

for (let i = 1; i <= 10; i++) {
    helpArr[i] = new Array;
    for (let j = 1; j < i+1; j++) {
        helpArr[i].push(j)
    };
};

const finalArray = helpArr.filter((arr, i) => helpArr[i].length > 0);

console.log(finalArray);
