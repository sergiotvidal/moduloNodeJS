// ejemplo de asincronía

function timer(callback) {
    console.log('X');
    setTimeout(()=> {
        callback('done');
    });
};

timer(function(r) {
    console.log(r);
});

console.log('fin');