console.log("Hello, world!");
("use strict");
const EMPTY_NUM = 0;
const EMPTY_STR = "";

let operator = "";
let currentNum = "";
let previousNum = "";

const numberButtons = document.querySelectorAll("[data-number]");

const operatorButtons = document.querySelectorAll("[data-operator]");
const formattedNumber = document.querySelectorAll("[data-formatted-number]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-all-clear]");
const equalButton = document.querySelector("[data-equals]");
const operationScreen = document.querySelector(".operation-screen");
const numberScreen = document.querySelector(".number-screen");
const dotButton = document.querySelector("#btn-dot");
