const babel = require('@babel/core');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/cool.js', 'utf-8');
const result = babel.transform(code, {
  plugins: [require('../src/index')]
});

console.log(result);
