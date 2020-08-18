# fnless

## Description

**fnless** is intended to make testing functionless code easier. Variables whose value will be changed during the testing must be included in initialization. fnless will wrap the code inside a method, that way it can be tested.

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
- `keyVars`: an array of strings, which contain variable names whose value need to be changed during the test.

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
const result = mfnless.testProcess({ a: "'Acong'", b: 10 })
```

_**Parameters**_

- `objParams`: an object literal whose keys are the same with `keyVars`'s contents.

When inputting string value, you should write it as `"'stringValue'"`. Array and object are not yet supported.

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

```javascript
const fs = require('fs');
const fnless = require('fnless');

it('Simple console.log()', async () => {
  let code = '';
  code += `let a = 'Hello World'\n`;
  code += `console.log(a)`;
  fs.writeFileSync('index.js', code);

  const mfnless = new fnless('index.js', ['a']);
  expect(mfnless.isKeyVarsExist()).toEqual(true);
  expect(mfnless.testProcess({ a: "'Hey Dunia!'" })).toMatch('Hey Dunia!');
});
```
