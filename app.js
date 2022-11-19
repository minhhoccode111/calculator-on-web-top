console.log("Hello, world!");
("use strict");
const EMPTY_NUM = 0;
const EMPTY_STR = "";

let operator = "";
let currentNum = "";
let previousNum = "";

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

clearButton.onclick = () => {
  operator = "";
  currentNum = "";
  previousNum = "";
  numDisplay.innerText = "0";
  operatorDisplay.innerText = "";
};
deleteButton.onclick = () => {
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
  if (previousNum.toString().length >= 7) {
    numDisplay.innerText = previousNum.toString().slice(0, 6) + "...";
    operatorDisplay.innerText = "";
    return;
  } else if (previousNum.toString().length < 7) {
    numDisplay.innerText = previousNum;
    operatorDisplay.innerText = "";
    return;
  }
};
const calculate = () => {
  currentNum = Number(currentNum);
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
      break;
  }
};

const equalButton = document.querySelector("[data-equals]");
equalButton.onclick = () => {
  if (currentNum != "" && previousNum != "" && operator != "") {
    calculate();
    currentNum = previousNum;
    numDisplay.innerText = currentNum;
    previousNum = "";
    operator = "";
  }
  if (currentNum != "" && previousNum == "" && operator == "") {
    numDisplay.innerText = currentNum;
  }
};
