'use strict';

function sleep(seconds) {
  console.log(`${new Date().toISOString()}: starting timer`);
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(`timer ${seconds} seconds done!`);
    }, seconds * 1000);
  });
}

// sleep(3);

async function init() {
  try {
    console.log(`${new Date().toISOString()}: ${await sleep(2)}`);
    console.log(`${new Date().toISOString()}: ${await sleep(3)}`);
  } catch (e) {
    console.error(e.message);
  }
}

init();

