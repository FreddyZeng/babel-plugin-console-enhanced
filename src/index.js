import computeOptions from './utils/pluginOption';
import { isObject, getLastWord } from './utils/tools';

export default function({ types: t }) {
  const visitor = {
    CallExpression(path) {
      if (
        t.isMemberExpression(path.node.callee) &&
        path.node.callee.object.name === 'console'
      ) {
        if (this.opts && !isObject(this.opts)) {
          path.stop();
          return console.error(
            '[babel-plugin-console-enhanced]: options need to be an object.'
          );
        }

        const options = computeOptions(this.opts);

        let filename = this.filename || this.file.opts.filename || 'unknown';
        filename = getLastWord(filename, '/');
        const line = path.node.loc.start.line;
        const column = path.node.loc.start.column;

        let description = '';

        for (const key in options) {
          if (options.hasOwnProperty(key)) {
            const val = options[key];
            switch (key) {
              case 'addFilename':
                description = val
                  ? `${description}filename ${filename}, `
                  : description;
                break;
              case 'addLine':
                description = val
                  ? `${description}line ${line}, `
                  : description;
                break;
              case 'addColumn':
                description = val
                  ? `${description}column ${column}, `
                  : description;
                break;
              case 'customContent':
                description = val
                  ? `${description}${options.customContent}, `
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
}
