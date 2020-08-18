const fs = require('fs');
const esp = require('esprima');
const esc = require('escodegen');
const { execSync } = require('child_process');

class fnless {
  constructor(solutionPath, keyVars) {
    this._solutionPath = solutionPath;
    this._instrumentFile = './fnless-inst.js';
    this._keyVars = keyVars;
  }

  _varsPassed(vars, script) {
    let count = 0;
    let ret = {};
    for (const key in script.body) {
      if (script.body[key].type === 'VariableDeclaration' && vars.includes(script.body[key].declarations[0].id.name)) {
        ret[script.body[key].declarations[0].id.name] = script.body[key];
        count++;
      }
    }
    return count === vars.length
      ? ret
      : null;
  };

  isKeyVarsExist() {
    const solution = fs.readFileSync(this._solutionPath, 'utf8');
    const parsed = esp.parseScript(solution);
    const params = this._varsPassed(this._keyVars, parsed);
    return this._keyVars.length === Object.keys(params).length
      ? true
      : false;
  }

  testProcess(objParams) {
    const solution = fs.readFileSync(this._solutionPath, 'utf8');
    const parsed = esp.parseScript(solution);
    const params = this._varsPassed(this._keyVars, parsed);
    for (const key in params) {
      delete params[key].declarations[0].init;
      if (objParams) {
        if (objParams[key] === undefined || isNaN(objParams[key]) || objParams[key] === Infinity || objParams[key] === -Infinity) {
          params[key].declarations[0].init = {
            type: 'Identifier',
            name: objParams[key]
          };
        } else if (objParams[key] < 0) {
          params[key].declarations[0].init = {
            type: 'UnaryExpression',
            operator: '-',
            argument: {
              type: 'Literal',
              value: objParams[key]*-1,
              raw: `${objParams[key]*-1}`
            },
            prefix: true
          };
        } else if (objParams[key] === '') {
          params[key].declarations[0].init = {
            type: 'Literal',
            value: objParams[key],
            raw: objParams[key]
          };
        } else {
          params[key].declarations[0].init = {
            type: 'Literal',
            value: objParams[key],
            raw: objParams[key]
          };
        }
      }
    }
    var newCode = esc.generate(parsed);
    fs.writeFileSync(this._instrumentFile, newCode);
    let result = String(execSync(`node ${this._instrumentFile}`));
    return result;
  };

  deleteInstrumentFile() {
    if (fs.existsSync(this._instrumentFile)) {
      fs.unlinkSync(this._instrumentFile);
    }
  }
}

module.exports = fnless;