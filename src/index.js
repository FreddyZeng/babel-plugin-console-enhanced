import computeOptions from './utils/pluginOption';
import { isObject, matchesExclude } from './utils/tools';

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

        const filename = this.filename || this.file.opts.filename || 'unknown';

        if (
          Array.isArray(options.exclude) &&
          options.exclude.length &&
          matchesExclude(options.exclude, filename)
        ) {
          return path.stop();
        }

        if (!options.methods.includes(path.node.callee.property.name)) {
          return;
        }

        let description = '';

        if (options.addFilename) {
          description = `${description}filename ${filename}, `;
        }

        if (options.addCodeLine) {
          const line = path.node.loc.start.line;
          description = `${description}line ${line}, `;
        }

        if (options.addCodeColumn) {
          const column = path.node.loc.start.column;
          description = `${description}column ${column}, `;
        }

        if (options.customContent) {
          description = `${description}${options.customContent}, `;
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
