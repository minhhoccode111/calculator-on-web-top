# Calculator on web The Odin Project

the Odin Project calculator

what I've learned :

- set data-attribute to element and select element by data
- window.addEventListener('keypress', function(e) {})
- and a lot more...
  what I can do better:
- when we click an operator then the keyboard just ignore '0' number (but still accept the dot '.' and others number) because I just don't want to get divide by zero or do math with zero
- It need more test and fix
- and do two features 'percent' and 'minus'
- and a lot more...
- `add()` method are complicated with so many conditions and possibilities to check

```js
  add(numStr) {
    if (numStr === '/' || numStr === '+' || numStr === '*') return; // ignore
    if (numStr === '0' && this.current === '-') return; // ignore

    if (numStr === '-') {
      if (this.current === '0') this.current = '-'; // make it negative
      if (this.current === '-') this.current = '0'; // make it positive
      if (this.current !== '0') return; // ignore if at the middle of current
      Display.mainScreen(this.current);
      return;
    }
    if (numStr === '.') {
      if (this.current.includes('.')) return; // ignore if more than 1 dot
      if (this.current === '-') {
        this.current = '-0.'; // change to this if already negative
      } else {
        this.current += numStr; // else just add to the end
      }
      Display.mainScreen(this.current);
      return;
    }
    if (this.current === '0') {
      if (numStr === '0') return; // ignore
      this.current = numStr; // change if at the beginning
      Display.mainScreen(this.current);
      return;
    }
    this.current += numStr; // add a string at the end
    Display.mainScreen(this.current);
  }
```

[View all projects' live demos](https://minhhoccode111.github.io/all-projects-live-demos/)

[Calculator on Web TOP](https://minhhoccode111.github.io/calculator-on-web-top/)
