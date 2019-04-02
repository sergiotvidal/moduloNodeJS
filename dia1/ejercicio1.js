// función que retorne si menor que 5 mal, entre 5 y 8 bien y mayor que 8 perfecto

//pirámide de números 1, 12, 123, ... cada línea en un array

//cambiar el array abc, transformar las letras en mayúsculas

const ARROZ = '🌾';
const CARNE = '🥩';
const LECHE = '🥛';
const TOMATE = '🍅';
const ingredientes = [ARROZ, CARNE, LECHE, TOMATE];

/**
 * Función que prepara un alimento a partir de un ingrediente, conviertiendo:
 *  ingrediente arroz a pan
 *  ingrediente carne a bacon
 *  ingrediente leche a queso
 *  ingrediente tomate a ensalada
 * @param {String} ingrediente [ARROZ, CARNE, LECHE, TOMATE]
 * @return {String} comida Devuelve el alimento procesado
 */
function prepare(ingrediente) {
  const pan = '🍞';
  const bacon = '🥓';
  const queso = '🧀';
  const ensalada = '🥗';

  if (ingrediente === ARROZ) {
    return pan
  };
  if (ingrediente === CARNE) {
    return bacon
  };
  if (ingrediente === LECHE) {
    return queso
  }; 
  if (ingrediente === TOMATE) {
    return ensalada
  };
};

const cookedFood = ingredientes.map(prepare);

console.log(cookedFood);