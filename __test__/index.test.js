const fs = require('fs');
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
    expectedCode += `let a = JSON.parse('false');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: false });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('0', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('0');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: 0 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('-0', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('0');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: -0 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('\'\'', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('\"\"');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: '' });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('null', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('null');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
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
    expect(mfnless.isKeyVarsValid()).toEqual(true);
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
    expect(mfnless.isKeyVarsValid()).toEqual(true);
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
    expectedCode += `let a = JSON.parse('true');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: true });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('42', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('42');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: 42 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('\'0\'', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('\"0\"');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: '0' });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('\'false\'', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('\"false\"');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: 'false' });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('-42', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('-42');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: -42 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('3.14', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('3.14');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: 3.14 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('-3.14', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('-3.14');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
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
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: Infinity });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('-Infinity', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = -Infinity;`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: -Infinity });
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
    expectedCode += `let a = JSON.parse('false');\n`;
    expectedCode += `let b = JSON.parse('0');`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
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
    expectedCode += `let a = JSON.parse('false');\n`;
    expectedCode += `let b = JSON.parse('0');\n`;
    expectedCode += `let c = JSON.parse('\"\"');`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
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
    expectedCode += `let a = JSON.parse('false');\n`;
    expectedCode += `let b = JSON.parse('0');\n`;
    expectedCode += `let c = JSON.parse('\"\"');\n`;
    expectedCode += `let d = Infinity;`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: false, b: 0, c: '', d: Infinity });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
});

describe('Checking array', () => {
  it('Mixed data types', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('[1,"A",true]');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: [1, 'A', true] });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('Falsies (false, 0, \'\', null)', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('[false,0,"",null]');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: [false, 0, '', null] });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('Multidimensional array', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('[[1,2,3],["A","B","C"],[true,false]]');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: [[1, 2, 3], ['A', 'B', 'C'], [true, false]] });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
});

describe('Checking object', () => {
  it('Mixed data types', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('{"key1":1,"key2":"A","key3":true,"key4":false}');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: { key1: 1, key2: 'A', key3: true, key4: false } });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('Falsies (false, 0, \'\', null)', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('{"key1":false,"key2":0,"key3":"","key4":null}');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: { key1: false, key2: 0, key3: '', key4: null } });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
  it('Nested object', async () => {
    let keyVars = ['a'];
    let code = '';
    code += `let a = 'Hello world!';`;
    fs.writeFileSync(testSolutionFile, code);
    let expectedCode = '';
    expectedCode += `let a = JSON.parse('{"key1":{"key11":1,"key12":2},"key2":{"key21":"A","key22":"B"}}');`;
    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: { key1: { key11: 1, key12: 2 }, key2: { key21: 'A', key22: 'B' } } });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
});

describe('Checking messy code', () => {
  it('Redeclaration of a var', async () => {
    let keyVars = ['a'];

    let code = '';
    code += `//let a=undefined this is an undefined variable\n`;
    code += `var a=undefined\n`;
    code += `var a=NaN;`;
    fs.writeFileSync(testSolutionFile, code);

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(false);
  });
  it('One line comment', async () => {
    let keyVars = ['a', 'b'];

    let code = '';
    code += `//let a = undefined this is an undefined variable\n`;
    code += `let a = undefined\n`;
    code += `let b = NaN;`;
    fs.writeFileSync(testSolutionFile, code);

    let expectedCode = '';
    expectedCode += `let a = JSON.parse('false');\n`;
    expectedCode += `let b = JSON.parse('0');`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
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
    expectedCode += `let a = JSON.parse('false');\n`;
    expectedCode += `let b = JSON.parse('0');`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
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
    expectedCode += `let a = JSON.parse('false');\n`;
    expectedCode += `let b = JSON.parse('0');`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
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
    expectedCode += `let a = JSON.parse('false');\n`;
    expectedCode += `let b = JSON.parse('0');`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
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
    expectedCode += `let a = JSON.parse('false');\n`;
    expectedCode += `let b = JSON.parse('0');`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
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
    expectedCode += `let a = JSON.parse('false');\n`;
    expectedCode += `let b = JSON.parse('0');\n`;
    expectedCode += `for (let i = 0; i < 5; i++) {\n`;
    expectedCode += `    console.log('Hello world');\n`;
    expectedCode += `}`;

    const mfnless = new fnless(testSolutionFile, keyVars);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    mfnless.testProcess({ a: false, b: 0 });
    expect(fs.readFileSync(mfnless._instrumentFile, 'utf8')).toMatch(expectedCode);
  });
});

describe('Running', () => {
  it('Simple console.log()', async () => {
    let code = '';
    code += `let a = 'Hello World'\n`;
    code += `console.log(a)`;
    fs.writeFileSync(testSolutionFile, code);

    const mfnless = new fnless(testSolutionFile, ['a']);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    expect(mfnless.testProcess({ a: 'Hey World!' })).toMatch('Hey World!');
  });
  it('console.log() few times', async () => {
    let code = '';
    code += `let theWord;\n`;
    code += `let times;\n`;
    code += `for (let i = 0; i < times; i++) {\n`;
    code += `    console.log(theWord);\n`;
    code += `}`;
    fs.writeFileSync(testSolutionFile, code);

    const mfnless = new fnless(testSolutionFile, ['theWord', 'times']);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    expect(mfnless.testProcess({ theWord: 'Hey World!', times: 5 })).toMatch('Hey World!\nHey World!\nHey World!\nHey World!\nHey World!');
  });
  it('console.log() few times (with calculation)', async () => {
    let code = '';
    code += `let theWord;\n`;
    code += `let times1;\n`;
    code += `let times2;\n`;
    code += `let times3 = (times1 * times2) - (times1 + times2);\n`;
    code += `for (let i = 0; i < times3; i++) {\n`;
    code += `    console.log(theWord);\n`;
    code += `}`;
    fs.writeFileSync(testSolutionFile, code);

    const mfnless = new fnless(testSolutionFile, ['theWord', 'times1', 'times2']);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    expect(mfnless.testProcess({ theWord: 'Hey World!', times1: 5, times2: 3 })).toMatch('Hey World!\nHey World!\nHey World!\nHey World!\nHey World!\nHey World!\nHey World!');
  });
  it('Conditionals with numbers', async () => {
    let code = '';
    code += `let var1;\n`;
    code += `let var2;\n`;
    code += `if (var1 > var2) {\n`;
    code += `    console.log(true);\n`;
    code += `} else if (var1 < var2) {\n`;
    code += `    console.log(false);\n`;
    code += `} else {\n`;
    code += `    console.log(-1);\n`;
    code += `}`;
    fs.writeFileSync(testSolutionFile, code);

    const mfnless = new fnless(testSolutionFile, ['var1', 'var2']);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    expect(mfnless.testProcess({ var1: 5, var2: 3 })).toMatch('true');
    expect(mfnless.testProcess({ var1: 3, var2: 5 })).toMatch('false');
    expect(mfnless.testProcess({ var1: 3, var2: 3 })).toMatch('-1');
  });
  it('Conditionals with strings', async () => {
    let code = '';
    code += `let var1;\n`;
    code += `let var2;\n`;
    code += `if (var1 === var2) {\n`;
    code += `    console.log('same');\n`;
    code += `} else {\n`;
    code += `    console.log('not same');\n`;
    code += `}`;
    fs.writeFileSync(testSolutionFile, code);

    const mfnless = new fnless(testSolutionFile, ['var1', 'var2']);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    expect(mfnless.testProcess({ var1: 'Hello', var2: 'Hello' })).toMatch('same');
    expect(mfnless.testProcess({ var1: 'Hello', var2: 'Halo' })).toMatch('not same');
  });
  it('Looping and array', async () => {
    let code = '';
    code += `let var1;\n`;
    code += `for (let i = 0; i < var1.length; i++) {\n`
    code += `    console.log(var1[i]);\n`;
    code += `}`;
    fs.writeFileSync(testSolutionFile, code);

    const mfnless = new fnless(testSolutionFile, ['var1']);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    expect(mfnless.testProcess({ var1: [10, 11, 'A', 'B', true, false] })).toMatch('10\n11\nA\nB\ntrue\nfalse');
  });
  it('Looping and object', async () => {
    let code = '';
    code += `let var1;\n`;
    code += `for (const key in var1) {\n`
    code += `    console.log(var1[key]);\n`;
    code += `}`;
    fs.writeFileSync(testSolutionFile, code);

    const mfnless = new fnless(testSolutionFile, ['var1']);
    expect(mfnless.isKeyVarsValid()).toEqual(true);
    expect(mfnless.testProcess({ var1: { key1: 10, key2: 11, key3: 'A', key4: 'B', key5: true, key6: false } })).toMatch('10\n11\nA\nB\ntrue\nfalse');
  });
});

describe('Instrument file', () => {
  it('Delete', async () => {
    let keyVars = ['a'];

    let code = '';
    code += `let a = 'Hello World'\n`;
    code += `console.log(a)`;
    fs.writeFileSync(testSolutionFile, code);

    const mfnless = new fnless(testSolutionFile, keyVars);
    mfnless.testProcess({ a: 'Hey World!' });
    mfnless.deleteInstrumentFile();
    expect(fs.existsSync(mfnless._instrumentFile)).toBe(false);
  });
});
