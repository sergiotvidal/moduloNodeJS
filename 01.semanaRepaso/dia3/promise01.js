'use strict';

function dividir(dividendo, divisor) {
  return new Promise((resolve, reject) => {
    if (divisor === 0) {
      return reject(new Error('divisor es 0'));
    }

    setTimeout(() => {
      return resolve(dividendo / divisor);
    }, 500);
  });
}

function multiplicar(m1, m2) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(m1 * m2);
    }, 500);
  });
}

function sumar(n1, n2) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(n1 + n2);
    }, 500);
  });
}

function restar(r1, r2) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(r1 - r2);
    }, 500);
  });
}

multiplicar(3, 5).then((result) => {
  console.log('result mul', result);

  return dividir(3, 41);
}).then((result) => {
  console.log('result div', result);
  
  return sumar(3, 5);
}).then((result) => {
  console.log('result sum', result);

  return restar(3, 5);
}).then((result) => {
  console.log('result restar', result);
}).catch((err) => {
  console.error('Error', err.message);
});
