const nodePath = process.argv[0];
const appPath = process.argv[1];

const timerTime = process.argv[2];
const timerArray = timerTime.split(" ");

let timerMiliSeconds = 0;

for (let i = 0; i < timerArray.length; i++) {
  const item = timerArray[i];
  if (item.toLowerCase().endsWith("h")) {
    timerMiliSeconds += item.slice(0, -1) * 60 * 60 * 1000;
  } else if (item.toLowerCase().endsWith("m")) {
    timerMiliSeconds += item.slice(0, -1) * 60 * 1000;
  } else if (item.toLowerCase().endsWith("s")) {
    timerMiliSeconds += item.slice(0, -1) * 1000;
  }
}

setTimeout(() => console.log("Done!"), timerMiliSeconds);
