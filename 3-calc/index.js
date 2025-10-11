const EventEmitter = require("events");
const add = require("./add");
const subtract = require("./subtract");
const multiply = require("./multiply");
const divide = require("./divide");

const nodePath = process.argv[0];
const appPath = process.argv[1];

const firstNum = +process.argv[2];
const secondNum = +process.argv[3];
const operator = process.argv[4];

const eventEmitter = new EventEmitter();

const operatorTypes = {
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
};

eventEmitter.on("add", () => console.log(add(firstNum, secondNum)));
eventEmitter.on("subtract", () => console.log(subtract(firstNum, secondNum)));
eventEmitter.on("multiply", () => console.log(multiply(firstNum, secondNum)));
eventEmitter.on("divide", () => console.log(divide(firstNum, secondNum)));

eventEmitter.emit(operatorTypes[operator]);
