//función que retorne si menor que 5 mal, entre 5 y 8 bien y mayor que 8 perfecto

const numValidator = function(num) {
    if (num < 5) {
        return 'MAL'
    };
    if (num >= 5 && num <= 8) {
        return 'BIEN'
    };
    if (num > 8) {
        return 'PERFECTO'
    };
};

console.log(numValidator(23));
