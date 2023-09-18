console.log('Hello, World!');

('use strict');

// used to display on two screen main and support
class Display {
  static support = document.getElementById('operation-screen');

  static main = document.getElementById('number-screen');

  static error = document.getElementById('error-message');

  static mainScreen(num) {
    this.main.textContent = num;
  }

  static supportScreen(num, operator) {
    this.support.textContent = num + (operator || '');
  }

  static errorMessage() {
    const str = `Please don't try to break my calculator :<`;
    this.error.textContent = str;
    // clear error message after 2 seconds
    setTimeout(() => {
      this.error.textContent = '';
    }, 2000);
  }
}

// used to create calculator with all functionalities
class Calculator {
  constructor() {
    this.previous = 0;
    this.current = '0'; // string to add . dot
    this.operator = '';
  }

  round() {
    this.current = (Math.floor(+this.current * 1000) / 1000).toString();
    this.previous = Math.floor(this.previous * 1000) / 1000;
  }

  add(numStr) {
    if (numStr === '.') {
      if (this.current.includes('.')) return Display.errorMessage(); // ignore if more than 1 dot
      if (this.current === '-') {
        this.current = '-0.'; // change to this if already negative
      } else {
        this.current += numStr; // else just add to the end
      }
      Display.mainScreen(this.current);
      return;
    }
    if (this.current === '0') {
      if (numStr === '0') return Display.errorMessage(); // ignore
      this.current = numStr; // change if at the beginning
      Display.mainScreen(this.current);
      return;
    }
    this.current += numStr; // add a string at the end
    Display.mainScreen(this.current);
  }

  del() {
    if (this.current === '0') {
      return Display.errorMessage();
    } else if (this.current.length === 1) {
      this.current = '0';
    } else {
      this.current = this.current.slice(0, this.current.length - 1);
    }
    Display.mainScreen(this.current);
  }

  calculate() {
    if (this.operator === '') {
      this.previous = Number(this.current);
    }
    if (this.operator === '+') {
      this.previous += Number(this.current);
    }
    if (this.operator === '-') {
      this.previous -= Number(this.current);
    }
    if (this.operator === '/') {
      if (+this.current === 0) return Display.errorMessage();
      this.previous /= Number(this.current);
    }
    if (this.operator === '*') {
      this.previous *= Number(this.current);
    }
  }

  operate(operator) {
    this.calculate();
    // calculate and assign to this.previous and reset this.operator, this.current
    this.operator = operator;
    this.current = '0';
    this.round();
    Display.mainScreen(this.current);
    Display.supportScreen(this.previous, operator);
  }

  equal() {
    // calculate and assign to this.current and reset this.operator, this.previous
    this.calculate();
    this.current = this.previous.toString();
    this.previous = 0;
    this.operator = '';
    this.round();
    Display.mainScreen(this.current);
    Display.supportScreen('');
  }

  clear() {
    this.previous = 0;
    this.current = '0';
    this.operator = '';
    Display.supportScreen('');
    Display.mainScreen(this.current);
  }

  percent() {
    this.current = (+this.current / 100).toString();
    this.round();
    Display.mainScreen(this.current);
  }

  negation() {
    if (this.current === '0') return Display.errorMessage();
    if (this.current[0] === '-') {
      this.current = this.current.slice(1);
      return Display.mainScreen(this.current);
    }
    this.current = '-' + this.current;
    return Display.mainScreen(this.current);
  }
}

const app = new Calculator();
app.clear();

// define all buttons
const ac = document.getElementById('btn-ac');
const ce = document.getElementById('btn-ce');
const percent = document.getElementById('btn-percent');
const negation = document.getElementById('btn-negation');
const equal = document.getElementById('btn-equal');
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operator]');

// all buttons' even listeners
ac.addEventListener('click', (e) => app.clear());

ce.addEventListener('click', (e) => app.del());

percent.addEventListener('click', (e) => app.percent());

numbers.forEach((number) =>
  number.addEventListener('click', (e) => {
    app.add(e.target.value); // this must be string
  })
);

operations.forEach((operation) =>
  operation.addEventListener('click', (e) => {
    app.operate(e.target.value);
  })
);

equal.addEventListener('click', (e) => app.equal());

negation.addEventListener('click', (e) => app.negation());

// keyboard support
window.addEventListener('keydown', (e) => {
  e.preventDefault();
  const key = e.key;
  const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  const oper = ['+', '-', '*', '/'];
  if (nums.indexOf(key) > -1) app.add(key);
  if (oper.indexOf(key) > -1) app.operate(key);
  if (key === 'Backspace') app.del();
  if (key === '=' || key === 'Enter') app.equal();
  if (key === 'Escape') app.clear();
  if (key === 'ArrowUp' || key === 'ArrowDown') app.negation();
  if (key === 'ArrowLeft') app.percent();
});
