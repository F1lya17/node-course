const { Worker } = require("worker_threads");
const os = require("os");
const path = require("path");

const ARRAY_SIZE = 300000;
const CPU_CORES = os.cpus().length;

function createArray() {
  return Array.from({ length: ARRAY_SIZE }, (_, i) => i + 1);
}

function linearCountForLoop() {
  const arr = createArray();
  console.time("Linear (for loop)");
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 3 === 0) count++;
  }
  console.timeEnd("Linear (for loop)");
  return count;
}

// 3. Многопоточный подсчёт
function parallelCount(arr) {
  return new Promise((resolve, reject) => {
    console.time("Parallel");
    const chunkSize = Math.ceil(arr.length / CPU_CORES);
    const workers = [];
    let completedWorkers = 0;
    let totalCount = 0;

    for (let i = 0; i < CPU_CORES; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, arr.length);
      const chunk = arr.slice(start, end);

      const worker = new Worker(path.join(__dirname, "worker.js"), {
        workerData: { chunk },
      });

      worker.on("message", (count) => {
        totalCount += count;
        completedWorkers++;

        if (completedWorkers === CPU_CORES) {
          console.timeEnd("Parallel");
          resolve(totalCount);
        }
      });

      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });

      workers.push(worker);
    }
  });
}

// Основной процесс
(async () => {
  const arr = createArray();
  let results = {};

  // 1. Линейный подход с filter
  results.linearFilter = linearCountFilter(arr);
  console.log(`Результат (filter): ${results.linearFilter.toLocaleString()}`);
  console.log();

  // 2. Линейный подход с for loop
  results.linearForLoop = linearCountForLoop(arr);
  console.log(
    `Результат (for loop): ${results.linearForLoop.toLocaleString()}`
  );
  console.log();

  // 3. Многопоточный подход
  try {
    results.parallel = await parallelCount(arr);
    console.log(`Результат (parallel): ${results.parallel.toLocaleString()}`);
    console.log();
  } catch (error) {
    console.error("Ошибка в многопоточном подсчёте:", error);
    return;
  }
})();
