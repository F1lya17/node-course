const { Worker } = require("worker_threads");
const os = require("os");

const CPU_CORES = os.cpus().length;
const ARRAY_SIZE = 30000000;

console.log({ CPU_CORES });

const computeParallel = () => {
  return new Promise((resolve) => {
    const chunkSize = Math.ceil(ARRAY_SIZE / CPU_CORES);
    const workers = [];
    let completed = 0;
    let totalCount = 0;

    for (let i = 0; i < CPU_CORES; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, ARRAY_SIZE);

      const worker = new Worker("./worker.js", {
        workerData: { start, end, chunkSize: end - start },
      });

      worker.on("message", (count) => {
        totalCount += count;
        completed++;

        if (completed === CPU_CORES) {
          resolve(totalCount);
        }
      });

      workers.push(worker);
    }
  });
};

const main = async () => {
  console.log("Запуск многопоточного подхода...");
  performance.mark("parallel-start");
  const result = await computeParallel();
  performance.mark("parallel-end");

  console.log(`Результат: ${result}`);

  // Замеры производительности
  performance.measure("parallel", "parallel-start", "parallel-end");

  const parallelMeasure = performance.getEntriesByName("parallel")[0];

  console.log(`Многопоточный: ${parallelMeasure.duration.toFixed(2)}мс`);
};

main();
