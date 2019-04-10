//cambiar el array abc, transformar las letras en mayúsculas

const abc = ['a', 'b', 'c', 'd', 'e'];
const newAbc = [];
for (let i = 0; i < abc.length; i++) {
    const modifiedChar = abc[i].charCodeAt() - 32;
    newAbc.push(String.fromCharCode(modifiedChar));
};

console.log(newAbc);