// pirámide invertida de forma similar al dia1/ejercicio4

const helpArr = [];

for (let i = 0; i < 10; i++) {
    helpArr[i] = new Array;
    for (let j = 10 - i; j >= 1; j--) {
        helpArr[i].push(j);
    }
};
const finalArray = helpArr.filter((arr, i) => helpArr[i].length > 0);

console.log(finalArray);