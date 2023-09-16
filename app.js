console.log('Hello, World!');

('use strict');

// used to display on two screen main and support
class Display {
  static support = document.getElementById('operation-screen');

  static main = document.getElementById('number-screen');

  static mainScreen(num) {
    Display.main.textContent = num;
  }

  static supportScreen(num, operator) {
    Display.support.textContent = num === 0 ? '' : num + operator;
  }
}

// used to create calculator with all functionalities
class Calculator {
  constructor() {
    this.previous = 0;
    this.current = 0;
    this.operator = '+';
    this.result = 0;
  }

  update() {
    this.previous = this.result;
    this.current = 0;

    Display.mainScreen(this.current);
    Display.supportScreen(this.previous, this.operator);
  }

  add(num) {
    this.current = Number(this.current + num); // add a string at the end and convert back
    Display.mainScreen(this.current);
  }

  del() {
    this.current = Math.floor(this.current / 10); // remove last number
    Display.mainScreen(this.current);
  }

  operate() {
    const currentObj = this;
    const table = {
      '+': currentObj.sum,
      '-': currentObj.sub,
      '/': currentObj.divide,
      '*': currentObj.multiply,
    };
    return table[this.operator]();
  }

  sum() {
    this.result = this.previous + this.current;
    this.update();
  }

  sub() {
    this.result = this.previous - this.current;
    this.update();
  }

  divide() {
    this.result = this.previous / this.current;
    this.update();
  }

  multiply() {
    this.result = this.previous * this.current;
    this.update();
  }

  equal() {
    this.current = this.previous;
    this.previous = 0;
    Display.mainScreen(this.current);
  }

  clear() {
    this.previous = 0;
    this.current = 0;
    this.operator = '+';
    Display.supportScreen('', '');
    Display.mainScreen(this.current);
  }

  percent() {
    this.equal();
  }
}

window.addEventListener('DOMContentLoaded', (e) => {
  const app = new Calculator();
  app.clear(); // reset when start

  // define all buttons
  const ac = document.getElementById('btn-ac');
  const ce = document.getElementById('btn-ce');
  const percent = document.getElementById('btn-percent');
  const negation = document.getElementById('btn-negation');
  const equal = document.getElementById('btn-equal');
  const numbers = document.querySelectorAll('[data-number]');
  const operations = document.querySelectorAll('[data-operator]');

  // all buttons' even listeners
  ac.addEventListener('click', app.clear);

  ce.addEventListener('click', app.del);
});
