const add = require("./add");
const subtract = require("./subtract");
const multiply = require("./multiply");
const divide = require("./divide");

const nodePath = process.argv[0];
const appPath = process.argv[1];

const firstNum = +process.argv[2];
const secondNum = +process.argv[3];
const operator = process.argv[4];

console.log(operator);

switch (operator) {
  case "+":
    console.log(add(firstNum, secondNum));
    break;
  case "-":
    console.log(subtract(firstNum, secondNum));
    break;
  case "*":
    console.log(multiply(firstNum, secondNum));
    break;
  case "/":
    console.log(divide(firstNum, secondNum));
    break;
}
