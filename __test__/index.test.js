const fs = require('fs');
const esp = require('esprima');
const esc = require('escodegen');
const { execSync } = require('child_process');
const fnless = require('./../index');

const testSolutionFile = 'solution.js';

afterAll(() => {
  if (fs.existsSync(testSolutionFile)) {
    fs.unlinkSync(testSolutionFile);
  }
});

describe('Checking code with one variable (falsy)', () => {
  it('false', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = false;`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: false });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('0', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = 0;`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: 0 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('\'\'', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = '';`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: '' });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('null', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = null;`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: null });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('undefined', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = undefined;`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: undefined });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('NaN', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = NaN;`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: NaN });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
});

describe('Checking code with one variable (truthy)', () => {
  it('true', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = true;`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: true });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('42', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = 42;`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: 42 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('\'0\'', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = '0';`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: '0' });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('\'false\'', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = 'false';`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: '\'false\'' });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('-42', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = -42;`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: -42 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('3.14', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = 3.14;`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: 3.14 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('-3.14', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = -3.14;`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: -3.14 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('Infinity', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = Infinity;`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: Infinity });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('-Infinity', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = Infinity;`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: Infinity });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
});


describe('Checking more than one variables', () => {
  it('Two variables', async () => {
    let keyVars = ['a', 'b'];

    let code = '';
    code += `let a = undefined\n`;
    code += `let b = NaN;`;
    fs.writeFileSync(testSolutionFile, code);

    let expectedCode = '';
    expectedCode += `let a = false;\n`;
    expectedCode += `let b = 0;`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: false, b: 0 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('Three variables', async () => {
    let keyVars = ['a', 'b', 'c'];

    let code = '';
    code += `let a = undefined\n`;
    code += `let b = NaN;\n`;
    code += `let c = null;`;
    fs.writeFileSync(testSolutionFile, code);

    let expectedCode = '';
    expectedCode += `let a = false;\n`;
    expectedCode += `let b = 0;\n`;
    expectedCode += `let c = '';`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: false, b: 0, c: '' });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('Four variables', async () => {
    let keyVars = ['a', 'b', 'c', 'd'];

    let code = '';
    code += `let a = undefined\n`;
    code += `let b = NaN;\n`;
    code += `let c = null;\n`;
    code += `let d = -1;\n`;
    fs.writeFileSync(testSolutionFile, code);

    let expectedCode = '';
    expectedCode += `let a = false;\n`;
    expectedCode += `let b = 0;\n`;
    expectedCode += `let c = '';\n`;
    expectedCode += `let d = Infinity;`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: false, b: 0, c: '', d: Infinity });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
});

describe('Checking messy code', () => {
  it('One line comment', async () => {
    let keyVars = ['a', 'b'];

    let code = '';
    code += `//let a = undefined this is an undefined variable\n`;
    code += `let a = undefined\n`;
    code += `let b = NaN;`;
    fs.writeFileSync(testSolutionFile, code);

    let expectedCode = '';
    expectedCode += `let a = false;\n`;
    expectedCode += `let b = 0;`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: false, b: 0 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('One line comment after code', async () => {
    let keyVars = ['a', 'b'];

    let code = '';
    code += `let a = undefined\n`;
    code += `let b = NaN;\n`;
    code += `//let a = undefined this is an undefined variable`;
    fs.writeFileSync(testSolutionFile, code);

    let expectedCode = '';
    expectedCode += `let a = false;\n`;
    expectedCode += `let b = 0;`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: false, b: 0 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('Multi line comments', async () => {
    let keyVars = ['a', 'b'];

    let code = '';
    code += `/*let a = undefined this is an undefined variable\n`;
    code += `*/\n`;
    code += `let a = undefined\n`;
    code += `let b = NaN;`;
    fs.writeFileSync(testSolutionFile, code);

    let expectedCode = '';
    expectedCode += `let a = false;\n`;
    expectedCode += `let b = 0;`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: false, b: 0 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('Multi line comments after code', async () => {
    let keyVars = ['a', 'b'];

    let code = '';
    code += `let a = undefined\n`;
    code += `let b = NaN;`;
    code += `/*let a = undefined this is an undefined variable\n`;
    code += `*/\n`;
    fs.writeFileSync(testSolutionFile, code);

    let expectedCode = '';
    expectedCode += `let a = false;\n`;
    expectedCode += `let b = 0;`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: false, b: 0 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('Messy spaces', async () => {
    let keyVars = ['a', 'b'];

    let code = '';
    code += `//let a=undefined this is an undefined variable\n`;
    code += `let a=undefined\n`;
    code += `let b=NaN;`;
    fs.writeFileSync(testSolutionFile, code);

    let expectedCode = '';
    expectedCode += `let a = false;\n`;
    expectedCode += `let b = 0;`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: false, b: 0 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('Simple script with loop and comments', async () => {
    let keyVars = ['a', 'b'];

    let code = '';
    code += `let a=undefined\n`;
    code += `let b=NaN;\n`;
    code += `for (let i = 0; i < 5; i++) {\n`;
    code += `    console.log('Hello world');\n`;
    code += `}\n`;
    code += `//let a = undefined is an undefined variable declaration\n`;
    code += `//let b = NaN is a NaN variable declaration\n`;
    code += `//for (let i = 0; i < 5; i++) is ten times looping for printing Hello World!\n`;
    code += `/**\n`;
    code += ` * This is my code\n`;
    code += ` * This is my code\n`;
    code += ` * This is my code\n`;
    code += ` */\n`;
    fs.writeFileSync(testSolutionFile, code);

    let expectedCode = '';
    expectedCode += `let a = false;\n`;
    expectedCode += `let b = 0;\n`;
    expectedCode += `for (let i = 0; i < 5; i++) {\n`;
    expectedCode += `    console.log('Hello world');\n`;
    expectedCode += `}`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    mfnless.testProcess({ a: false, b: 0 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
});

describe('Running', () => {
  it('Simple console.log()', async () => {
    let keyVars = ['a'];

    let code = '';
    code += `let a = 'Hello World'\n`;
    code += `console.log(a)`;
    fs.writeFileSync(testSolutionFile, code);

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsExist()).toEqual(true);
    expect(mfnless.testProcess({ a: '\'Hey Dunia!\'' })).toMatch('Hey Dunia!');
  });
});

describe('Delete instrument file', () => {
  it('Simple console.log()', async () => {
    let keyVars = ['a'];

    let code = '';
    code += `let a = 'Hello World'\n`;
    code += `console.log(a)`;
    fs.writeFileSync(testSolutionFile, code);

    const mfnless = new fnless(testSolutionFile, keyVars);
    mfnless.testProcess({ a: '\'Hey Dunia!\'' });
    mfnless.deleteInstrumentFile();
    expect(fs.existsSync(mfnless._instrumentFile)).toBe(false);
  });
});
