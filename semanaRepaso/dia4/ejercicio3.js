// función que divide utilizando async/await

async function div(n1, n2) {
    if (n2 === 0) {
        throw new Error('Introduce otro número')
    };
    return n1/n2;
};

(async ()=> {
    try {
        const result = await div(10, 5);
        console.log(result);
    } catch (e) {
        console.log(e.message);
    }
})();

//función que se llama a si misma