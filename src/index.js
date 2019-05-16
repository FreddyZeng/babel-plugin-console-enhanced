module.exports = babel => {
  const { types: t } = babel;
  const visitor = {
    CallExpression(path) {
      if (
        path.node.callee.type === 'MemberExpression' &&
        path.node.callee.object.name === 'console'
      ) {
        if (this.opts && !isObject(this.opts)) {
          path.stop();
          return console.error(
            '[babel-plugin-console-enhanced]: options need to be an object.'
          );
        }

        const filename = `filename ${getLastWord(
          this.file.opts.filename,
          '/'
        )} `;
        const line = `line ${path.node.loc.start.line}`;
        const column = `column ${path.node.loc.start.column}`;

        let description = '';

        for (const key in this.opts) {
          if (this.opts.hasOwnProperty(key)) {
            const val = this.opts[key];
            switch (key) {
              case 'addFilename':
                description = val ? `${description}${filename}, ` : description;
                break;
              case 'addLine':
                description = val ? `${description}${line}, ` : description;
                break;
              case 'addColumn':
                description = val ? `${description}${column}, ` : description;
                break;
              case 'customContent':
                description = val
                  ? `${description}${this.opts.customContent}, `
                  : description;
                break;
              default:
                break;
            }
          }
        }

        if (description) {
          path.node.arguments.unshift(t.stringLiteral(description));
        }
      }
    }
  };

  return {
    name: 'babel-plugin-console-enhanced',
    visitor
  };
};

function getLastWord(str, separator) {
  return str.split(separator)[str.split(separator).length - 1];
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
