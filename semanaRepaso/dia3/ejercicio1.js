// repetir el ejercicio del timer utilizando promises

// variar el 
function timer(num) {
    return new Promise((resolve, reject) => {
    if(num < 0 || isFinite(num) !== true) {
        return reject(new Error('fatal'));
    };
    setTimeout(() => {
        return resolve('done');
    }, num);
    
    });
};

timer(1000).then((value) => {
    console.log(value);
}).catch(err => {
    console.error('Error', err.message);
});