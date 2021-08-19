const { transformSync } = require('@babel/core');
const plugin = require('./index');

const code = `
  // 业务代码
`;

const options = {
  plugin: ['./index.js']  //babel.config.js
};

const output = transformSync(code, options);
