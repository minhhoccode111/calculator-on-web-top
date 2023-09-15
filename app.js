console.log('Hello, World!');

window.addEventListener('DOMContentLoaded', (e) => {
  'use strict';

  const CreateNumber = () => {
    let _value = '0';
    const reset = () => (_value = '0');
    // add a string number
    const push = (v) => {
      if (_value === '0') return (_value = v);
      _value += v;
    };

    // remove a last string number
    const pop = () => {
      if (_value === '0') return;
      if (_value.length === 1) {
        _value = '0';
        return;
      }
      _value = _value.slice(0, _value.length - 1);
    };

    const get = () => _value;

    return {
      reset,
      push,
      pop,
      get,
    };
  };

  const current = (() => {
    const _num0 = CreateNumber();
    const _num1 = CreateNumber();
    let inputNum = _num0;
    let _operator = '';

    const getCurrentInputNum = () => inputNum.get();

    const switchNum = () => (inputNum === _num0 ? (inputNum = _num1) : (inputNum = _num0));

    const getOperator = () => _operator;
    const setOperator = (v) => (_operator = v);

    const clear = () => {
      inputNum = _num0;
      _num0.reset();
      _num1.reset();
      _operator = '';
    };

    return {
      clear,
      switchNum,
      getOperator,
      setOperator,
    };
  })();

  const display = (() => {
    const operationScr = document.getElementById('operation-screen');
    const numberScr = document.getElementById('number-screen');

    const clear = () => {};

    return {
      clear,
    };
  })();

  const app = (() => {
    const clear = () => {
      display.clear();
      current.clear();
    };
    return {
      clear,
    };
  })();

  // define all buttons
  const ac = document.getElementById('btn-ac');
  const ce = document.getElementById('btn-ce');
  const percent = document.getElementById('btn-percent');
  const negation = document.getElementById('btn-negation');
  const equal = document.getElementById('btn-equal');
  const numbers = document.querySelectorAll('[data-number]');
  const operations = document.querySelectorAll('[data-operator]');

  // all buttons' even listeners
});
