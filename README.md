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

Variables whose value will be changed during the test (`str` and `times` in the example above) must be included in initialization. fnless will then wrap the code inside a `.testProcess` method, that way it can be tested. `.testProcess` will return string value, the same as what you get when running the source code above in terminal.

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

Constructor of fnless class.

```javascript
const fnless = require('fnless');
const mfnless = new fnless('./index.js', ['a', 'b']);
```

_**Parameters**_

- `solutionPath`: Functionless code file path.
- `keyVars`: An array of string. Each string represents a key variable's name in the functionless code.

_**Return**_

fnless object instance.

### `isKeyVarsValid`

Check the validity of key variables in the functionless code. Invalid key variables means that some are missing or have been redeclared.

```javascript
const fnless = require('fnless');
const mfnless = new fnless('./index.js', ['a', 'b']);
if (mfnless.isKeyVarsValid()) {
  console.log('Key variables valid');
} else {
  console.log('Key variables invalid');
}
```

_**Parameters**_

Nothing

_**Return**_

- `true`: If key variables valid.
- `false`: If key variables invalid.

### `testProcess`

Wrapper of the functionless code. The value of key variables inside the functionless code can be changed according to `objParams`.

```javascript
const fnless = require('fnless');
const mfnless = new fnless('./index.js', ['a', 'b']);
const result = mfnless.testProcess({ a: 'Acong', b: 10 });
```

_**Parameters**_

- `objParams`: An object that contains keys that have been mentioned during object instantiation as `keyVars`.

> Since fnless uses `JSON.parse()`, there will be limitations when inserting array or object as value.
>
>- Data types that have been tested are `string`, `number` and `boolean`.
>- Falsy values that are safe to be put inside array or object are `false`, `0`, `''` and `null`.
>- Falsy value `-0` will be converted to `0`.
>- When `undefined` is used in array, it will be converted to `null`. When `undefined` is used in object, the key will be **skipped**.
>- Falsy value `NaN` will be converted to `null`.
>- Both `Infinity` and `-Infinity` cannot be used because they will be converted to `null`.

_**Return**_

Same string you get when running the functionless code in terminal.

### `deleteInstrumentFile`

Delete instrument file that was created by `.testProcess` method. This method should be called after all testing has been completed.

_**Parameters**_

Nothing

_**Return**_

Nothing

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

it('Key variables valid', () => {
  expect(mfnless.isKeyVarsValid()).toBe(true);
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