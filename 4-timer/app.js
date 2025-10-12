const nodePath = process.argv[0];
const appPath = process.argv[1];

const timerTime = +process.argv[2];

setTimeout(() => console.log("Done!"), timerTime);
