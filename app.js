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

  static supportScreen(numStr, operator) {
    // don't display if num===0
    this.support.textContent = numStr + (operator || '');
  }

  static errorMessage() {
    const str = `Please don't try to break my calculator :<`;
    this.error.textContent = str;
    setTimeout(() => {
      this.error.textContent = '';
    }, 2000);
  }
}

// used to create calculator with all functionalities
class Calculator {
  constructor() {
    this.previous = '0';
    this.current = '0';
    this.result = '0';
  }

  add(numStr) {
    if (numStr === '0' && this.current === '-') return Display.errorMessage(); // ignore

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

  operate(operator) {
    if (operator === '+') return this.sum();
    if (operator === '-') return this.sub();
    if (operator === '/') return this.divide();
    return this.multiply();
  }

  update() {}

  sum() {
    this.previous += this.current;
    Display.supportScreen(this.previous, '+');
    this.current = '0';
    this.result = this.previous + this.current;
  }

  sub() {
    this.result = this.previous - this.current;
  }

  divide() {
    this.result = this.previous / this.current;
  }

  multiply() {
    this.result = this.previous * this.current;
  }

  equal() {
    this.current = this.previous;
    this.previous = 0;
    Display.mainScreen(this.current);
  }

  clear() {
    this.previous = '0';
    this.current = '0';
    this.result = '0';
    Display.supportScreen('', '');
    Display.mainScreen(this.current);
  }

  percent() {
    // this.equal();
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

window.addEventListener('DOMContentLoaded', (e) => {
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
  ac.addEventListener('click', (e) => {
    app.clear();
  });

  ce.addEventListener('click', (e) => {
    app.del();
  });

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

  equal.addEventListener('click', (e) => {
    app.equal();
  });

  negation.addEventListener('click', (e) => {
    app.negation();
  });
});
