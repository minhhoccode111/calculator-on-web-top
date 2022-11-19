console.log("Hello, world!");
("use strict");
const EMPTY_NUM = 0;
const EMPTY_STR = "";

let operator = "";
let currentNum = "";
let previousNum = "";
window.addEventListener("keypress", (e) => {
  keypressHandler(e.key);
});

const numButtons = document.querySelectorAll("[data-number]");
numButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleNumberClick(e.target.innerText);
  });
});

const operatorButtons = document.querySelectorAll("[data-operator]");
operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleOperatorClick(e.target.innerText);
  });
});

const formattedNumber = document.querySelectorAll("[data-formatted-number]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-all-clear]");
const operatorDisplay = document.querySelector(".operation-screen");
const numDisplay = document.querySelector(".number-screen");
numDisplay.innerText = "0";
const dotButton = document.querySelector("#btn-dot");

clearButton.onclick = () => clearAll();
const clearAll = () => {
  operator = "";
  currentNum = "";
  previousNum = "";
  numDisplay.innerText = "0";
  operatorDisplay.innerText = "";
};
deleteButton.onclick = () => clearOne();
const clearOne = () => {
  currentNum = currentNum.toString().slice(0, -1);
  numDisplay.innerText = currentNum;
  if (currentNum === "") {
    numDisplay.innerText = "0";
  }
};
const handleNumberClick = (number) => {
  if (number === "." && currentNum === "") {
    currentNum = "0";
  }
  if (
    (number === "0" && currentNum === "") ||
    (number === "." && currentNum.includes("."))
  ) {
    return;
  }

  if (previousNum !== "" && operator !== "") {
    operatorDisplay.innerText = previousNum + " " + operator;
  }
  if (currentNum.length < 9) {
    currentNum += number;
    numDisplay.innerText = currentNum;
  }
};
const handleOperatorClick = (op) => {
  if (currentNum === "") {
    return;
  }
  if (currentNum !== "" && previousNum === "" && operator === "") {
    previousNum = currentNum;
    currentNum = "";
    operator = op;
    operatorDisplay.innerText = previousNum + " " + operator;
  }
  if (currentNum !== "" && previousNum !== "" && operator !== "") {
    //calculate while currentNum,previousNum,operator are not equal ''
    //then assign result to previousNum and reset currentNum=''
    //assign new op to old operator
    //display previousNum to operatorDisplay with new operator
    calculate();
    operator = op;
    numDisplay.innerText = previousNum;
    operatorDisplay.innerText = "";
  }
};
const displayResult = () => {
  if (previousNum.toString().length >= 4) {
    let a = previousNum.toString().slice(0, 6) + "...";
    numDisplay.innerText = a;
    operatorDisplay.innerText = "";
    return;
  } else if (previousNum.toString().length < 3) {
    numDisplay.innerText = previousNum;
    operatorDisplay.innerText = "";
    return;
  }
};
const calculate = () => {
  currentNum == "" ? (currentNum = 0) : (currentNum = Number(currentNum));
  previousNum = Number(previousNum);
  switch (operator) {
    case "+":
      previousNum += currentNum;
      currentNum = "";
      displayResult();
      break;
    case "-":
      previousNum -= currentNum;
      currentNum = "";
      displayResult();
      break;
    case "×":
      previousNum *= currentNum;
      currentNum = "";
      displayResult();
      break;
    case "÷":
      previousNum /= currentNum;
      currentNum = "";
      displayResult();
      console.log(previousNum);
      break;
  }
};

const equalButton = document.querySelector("[data-equals]");
equalButton.onclick = () => {
  if (currentNum != "" && previousNum != "" && operator != "") {
    calculate();
    currentNum = previousNum;
    numDisplay.innerText = currentNum.toString().slice(0, 9);
    previousNum = "";
    operator = "";
  }
  if (currentNum != "" && previousNum == "" && operator == "") {
    numDisplay.innerText = currentNum;
  }
};

const keypressHandler = (e) => {
  // e.preventDefault();
  if ((e >= 0 && e <= 9) || e == ".") {
    handleNumberClick(e);
  }
  if (e == "Enter" || (e == "=" && currentNum !== "" && previousNum !== "")) {
    calculate();
    currentNum = previousNum;
    numDisplay.innerText = currentNum.toString().slice(0, 9);
    previousNum = "";
    operator = "";
  }
  if (e == "+" || e == "-") {
    handleOperatorClick(e);
  }
  if (e == "*") {
    handleOperatorClick("×");
  }
  if (e == "/") {
    handleOperatorClick("÷");
  }
  if (e == "Backspace") {
    clearOne();
  }
  if (e == "Escape") {
    clearAll();
  }
};
