const { parentPort, workerData } = require("worker_threads");

const compute = ({ start, end, chunkSize }) => {
  // Каждый воркер генерирует свой кусок массива
  const arr = [];
  for (let i = 0; i < chunkSize; i++) {
    const item = Math.floor(Math.random() * 100);
    arr.push(item);
  }

  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 3 === 0) count++;
  }

  return count;
};

parentPort.postMessage(compute(workerData));
