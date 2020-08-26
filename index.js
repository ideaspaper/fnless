const fs = require('fs');
const esp = require('esprima');
const esc = require('escodegen');
const { execSync } = require('child_process');

class fnless {
  /**
   * Constructor of fnless class.
   * @param {string} solutionPath Functionless code file path.
   * @param {Array} keyVars An array of string. Each string represents a key variable's name in the functionless code.
   * @constructor
   * @example
   * const fnless = require('fnless');
   * const mfnless = new fnless('./index.js', ['a', 'b']);
   */
  constructor(solutionPath, keyVars) {
    this._solutionPath = solutionPath;
    this._instrumentFile = './fnless-inst.js';
    this._keyVars = keyVars;
  }

  /**
   * Check the parsed script for the validity of keyVars. 
   * @param {*} vars 
   * @param {object} script return value of esprima's parseScript method.
   * @returns {object} object that represents some parts of the script if keyVars is valid, null otherwise.
   * @private
   */
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

  /**
   * Check the validity of key variables in the functionless code. Invalid key variables means that some are missing or have been redeclared.
   * @param {void} Nothing
   * @returns {boolean} true if key variables valid, false when otherwise.
   * @example
   * const fnless = require('fnless');
   * const mfnless = new fnless('./index.js', ['a', 'b']);
   * if (mfnless.isKeyVarsValid()) {
   *   console.log('Key variables exist');
   * } else {
   *   console.log('Key variables do not exist');
   * }
   */
  isKeyVarsValid() {
    const solution = fs.readFileSync(this._solutionPath, 'utf8');
    const parsed = esp.parseScript(solution);
    const params = this._varsPassed(this._keyVars, parsed);
    if (params) {
      return true;
    }
    return false;
  }

  /**
   * Wrapper of the functionless code. The value of key variables inside the functionless code can be changed according to objParams.
   * @param {Object} objParams An object that contains keys that have been mentioned during object instantiation as keyVars.
   * @returns {string} Same string you get when running the functionless code in terminal.
   * @example
   * const fnless = require('fnless');
   * const mfnless = new fnless('./index.js', ['a', 'b']);
   * const result = mfnless.testProcess({ a: 'Acong', b: 10 });
   */
  testProcess(objParams) {
    const solution = fs.readFileSync(this._solutionPath, 'utf8');
    const parsed = esp.parseScript(solution);
    const params = this._varsPassed(this._keyVars, parsed);
    for (const key in params) {
      delete params[key].declarations[0].init;
      if (objParams[key] === undefined ||
        (isNaN(objParams[key]) && typeof objParams[key] === 'number') ||
        objParams[key] === Infinity ||
        objParams[key] === -Infinity
      ) {
        params[key].declarations[0].init = {
          type: 'Identifier',
          name: objParams[key]
        };
      } else {
        params[key].declarations[0].init = {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'Identifier',
              name: 'JSON'
            },
            property: {
              type: 'Identifier',
              name: 'parse'
            }
          },
          arguments: [
            {
              type: 'Literal',
              value: JSON.stringify(objParams[key]),
              raw: `${JSON.stringify(objParams[key])}`,
            }
          ]
        };
      }
    }
    let newCode = esc.generate(parsed);
    fs.writeFileSync(this._instrumentFile, newCode);
    let result = String(execSync(`node ${this._instrumentFile}`));
    return result;
  };

  /**
   * Delete instrument file that was created by testProcess method. This method should be called after all testing has been completed.
   * @param {void} Nothing
   * @returns {void} Nothing.
   */
  deleteInstrumentFile() {
    if (fs.existsSync(this._instrumentFile)) {
      fs.unlinkSync(this._instrumentFile);
    }
  }
}

module.exports = fnless;