# fnless

## Description

**fnless** is intended to make testing functionless code easier. The term functionless code used in this documentation refers to code like below.

```javascript
// index.js
let str = 'Hello world!';
let times = 5;
for (let i = 0; i < times; i++) {
  console.log(str);
}
```

Variables whose value will be changed during the test (`str` and `times` in the example above) must be included in initialization. fnless will then wrap the code inside a `.testProcess()` method, that way it can be tested. `.testProcess()` will return string value, the same as what you get when running the source code above in terminal.

```javascript
const fnless = require('fnless');
const mfnless = new fnless('./index.js', ['str', 'times']);

// Change str's value to 'Happy Holiday!' and times' value to 7
console.log(mfnless.testProcess({ str: 'Happy Holiday!', times: 7 }));
```

## Installation

This package can be installed using npm command `npm i fnless`.

## Usage

### `Constructor`

Below is the code needed for initialization process.

```javascript
const fnless = require('fnless');
const mfnless = new fnless('./index.js', ['a', 'b']);
```

_**Parameters**_

- `solutionPath`: path of the source code file.
- `keyVars`: an array of strings, which contains variable names whose value need to be changed during the test.

_**Return**_

fnless object instance.

### `isKeyVarsExist`

This method will check whether all of `keyVars` exist in the source code file.

```javascript
const fnless = require('fnless');
const mfnless = new fnless('./index.js', ['a', 'b']);
if (mfnless.isKeyVarsExist()) {
  console.log('Key variables exist');
} else {
  console.log('Key variables do not exist');
}
```

_**Parameters**_

none

_**Return**_

- `true`: if key variables exist.
- `false`: if key variables do not exist.

### `testProcess`

This method is the wrapper of the functionless code.

```javascript
const fnless = require('fnless');
const mfnless = new fnless('./index.js', ['a', 'b']);
const result = mfnless.testProcess({ a: 'Acong', b: 10 });
```

_**Parameters**_

- `objParams`: an object literal whose keys are the same with `keyVars`'s contents.

> Since fnless uses `JSON.parse()`, there will be limitations when inserting array or object as value.
>
>- Data types that have been tested are `string`, `number` and `boolean`.
>- Falsy values that are safe to be put inside array or object are `false`, `0`, `''` and `null`.
>- Falsy value `-0` will be converted to `0`.
>- When `undefined` is used in array, it will be converted to `null`. When `undefined` is used in object, the key will be **skipped**.
>- Falsy value `NaN` will be converted to `null`.
>- Both `Infinity` and `-Infinity` cannot be used because they will be converted to `null`.

_**Return**_

Same string you get when running the source code on terminal.

### `deleteInstrumentFile`

This method should be called after all testing has been completed. This method will delete the testing file that was created for testing process.

_**Parameters**_

none

_**Return**_

none

## Example

This is an example when using fnless with **jest**.

`index.js`

```javascript
var scrollPos = 'bottom';
var agree = true;
var spyware = true;

// Your code here
```

`__test__/index.test.js`

```javascript
const fs = require('fs');
const fnless = require('fnless');

const mfnless = new fnless('./index.js', ['scrollPos', 'agree', 'spyware']);

afterAll(() => {
  mfnless.deleteInstrumentFile();
});

it('Key variables exist', () => {
  expect(mfnless.isKeyVarsExist()).toBe(true);
});

describe(`Testing invalid inputs`, () => {
  it(`scrollPos: 'bottom'`, async () => {
    expect(mfnless.testProcess({ scrollPos: 'bottom' })).toMatch('Unknown error');
  });
  it(`agree: true`, async () => {
    expect(mfnless.testProcess({ agree: true })).toMatch('Unknown error');
  });
  it(`spyware: true`, async () => {
    expect(mfnless.testProcess({ spyware: true })).toMatch('Unknown error');
  });
  it(`scrollPos: '', agree: true, spyware: true`, async () => {
    expect(mfnless.testProcess({ scrollPos: '', agree: true, spyware: true })).toMatch('Unknown error');
  });
});

describe(`Testing valid inputs`, () => {
  it(`scrollPos: 'bottom', agree: false, spyware: true`, async () => {
    expect(mfnless.testProcess({ scrollPos: 'bottom', agree: false, spyware: true })).toMatch('Cannot proceed when not agree');
  });
  it(`scrollPos: 'bottom', agree: true, spyware: false`, async () => {
    expect(mfnless.testProcess({ scrollPos: 'bottom', agree: true, spyware: false })).toMatch('Installing software');
  });
  it(`scrollPos: 'bottom', agree: true, spyware: true`, async () => {
    expect(mfnless.testProcess({ scrollPos: 'bottom', agree: true, spyware: true })).toMatch('Installing software + spyware remover');
  });
  it(`scrollPos: 'qwerty', agree: true, spyware: true`, async () => {
    expect(mfnless.testProcess({ scrollPos: 'qwerty', agree: true, spyware: true })).toMatch('You have to read all the clauses before accepting');
  });
  it(`scrollPos: 'qwerty', agree: true, spyware: false`, async () => {
    expect(mfnless.testProcess({ scrollPos: 'qwerty', agree: true, spyware: false })).toMatch('You have to read all the clauses before accepting');
  });
  it(`scrollPos: 'qwerty', agree: false, spyware: true`, async () => {
    expect(mfnless.testProcess({ scrollPos: 'qwerty', agree: false, spyware: true })).toMatch('You have to read all the clauses before accepting');
  });
  it(`scrollPos: 'qwerty', agree: false, spyware: false`, async () => {
    expect(mfnless.testProcess({ scrollPos: 'qwerty', agree: false, spyware: false })).toMatch('You have to read all the clauses before accepting');
  });
});
```