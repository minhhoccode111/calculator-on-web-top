console.log("Hello, world!");
("use strict");
const EMPTY_NUM = 0;
const EMPTY_STR = "";

let operation = "";
let number = "";
let container = "";
let array = [];
let aNum;
let bNum;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const formattedNumber = document.querySelectorAll("[data-formatted-number]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-all-clear]");
const equalButton = document.querySelector("[data-equals]");
const operationScreen = document.querySelector(".operation-screen");
const numberScreen = document.querySelector(".number-screen");
const dotButton = document.querySelector("#btn-dot");

const displayOperation = (nums = "") => (operationScreen.textContent = nums);
displayOperation();
const displayNumber = (nums = 0) => (numberScreen.textContent = nums);
displayNumber();
const clearAll = () => {
  array = [];
  container = EMPTY_STR;
  displayOperation();
  number = EMPTY_NUM;
  displayNumber();
};
const clearOne = () => {
  if (number != "") {
    number = number.slice(0, -1);
    displayNumber(number);
  }
  if (number == "") {
    number = EMPTY_NUM;
    displayNumber();
    return;
  }
};

clearButton.onclick = () => clearAll();
deleteButton.onclick = () => clearOne();

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const divide = (a, b) => a / b;
const multi = (a, b) => a * b;

numberButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    if (
      (e.target.value == 0 && (number == "" || number == "0")) ||
      (e.target.value == "." && number.toString().includes(".") == true)
    ) {
      return;
    } else if (e.target.value == "." && (number == "" || number == "0")) {
      number = "0";
      displayNumber(number);
    }
    if (number.length < 9) {
      number += e.target.value.toString();
      aNum = Number(number);
      container = aNum;
      [...array] = [aNum];
      console.log(array, aNum);
      displayNumber(number);
    }
  })
);

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    [...array] = [aNum, e.target.value];
    container = array.join("");
    displayOperation(container);
    number = EMPTY_NUM;
    console.log(array);
  });
});
