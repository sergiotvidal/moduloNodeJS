//pirámide de números del 1 al 10 de la forma 1, 1 2, 1 2 3, ..., cada línea de la pirámide en un array

// create a variable helpArr that is going to contain each of the arrays that we are asked to create
const helpArr = [];

// since we need to iterate through the numbers 1 to 10, we start by creating a for loop
for (let i = 1; i <= 10; i++) {
    // for every number in the first iteration we create an array, each of these arrays will constitute each line of the pyramid
    helpArr[i] = new Array;
    // now we need to add numbers to each of these arrays, 1 to the first, 1 and 2 to the second and so on, so, we create another loop as we need to put something in every helpArr[i]
    for (let j = 1; j < i+1; j++) {
        // we push every j iteration of this loop to its correspondent helpArr[i]
        helpArr[i].push(j)
    };
};

// now we make sure that every array inside the final answer has something in it, to do this, we can filter the resultant array from the previous step
const finalArray = helpArr.filter((arr, i) => helpArr[i].length > 0);

console.log(finalArray);
