module.exports = babel => {
  const { types: t } = babel;
  const visitor = {
    CallExpression(path, state) {
      const { node } = path;
      const { callee, arguments } = node;
      if (
        callee.type === 'MemberExpression' &&
        callee.object.name === 'console'
      ) {
        const mark = `FileName - ${getLastWord(
          state.file.opts.filename,
          '/'
        )}: `;
        const stringNode = t.stringLiteral(mark);
        arguments.unshift(stringNode);
      }
    }
  };

  return {
    name: 'babel-plugin-mark-console-position',
    visitor
  };
};

function getLastWord(str, separator) {
  return str.split(separator)[str.split(separator).length - 1];
}
