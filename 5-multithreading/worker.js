const { parentPort, workerData } = require("worker_threads");

function countDivisibleByThree(chunk) {
  let count = 0;
  for (let i = 0; i < chunk.length; i++) {
    if (chunk[i] % 3 === 0) count++;
  }
  return count;
}

// Обработка данных от основного процесса
if (parentPort) {
  const { chunk } = workerData;
  const count = countDivisibleByThree(chunk);
  parentPort.postMessage(count);
}
