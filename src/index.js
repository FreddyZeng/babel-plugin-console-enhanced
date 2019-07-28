import computeOptions from './utils/pluginOption';
import { isObject, matchesExclude, computeContext } from './utils/tools';

export default function({ types: t }) {
  const visitor = {
    CallExpression(path) {
      if (
        t.isMemberExpression(path.node.callee) &&
        path.node.callee.object.name === 'console'
      ) {
        // options need to be an object
        if (this.opts && !isObject(this.opts)) {
          return console.error(
            '[babel-plugin-console-enhanced]: options need to be an object.'
          );
        }

        const options = computeOptions(this.opts);

        const filename = this.filename || this.file.opts.filename || 'unknown';

        // not work on an excluded file
        if (
          Array.isArray(options.exclude) &&
          options.exclude.length &&
          matchesExclude(options.exclude, filename)
        ) {
          return;
        }

        // not work on a non-inlcuded method
        if (!options.methods.includes(path.node.callee.property.name)) {
          return;
        }

        let description = '';

        if (options.needFilename) {
          description = `${description}filename: ${filename}, `;
        }

        if (options.needLineNo) {
          const line = path.node.loc
            ? path.node.loc.start
              ? path.node.loc.start.line
              : undefined
            : undefined;
          description = `${description}lineNo: ${line}, `;
        }

        if (options.needColumnNo) {
          const column = path.node.loc
            ? path.node.loc.start
              ? path.node.loc.start.column
              : undefined
            : undefined;
          description = `${description}columnNo: ${column}, `;
        }

        if (options.needContext) {
          const scope = computeContext(path);
          description = scope
            ? `${description}context: ${scope}, `
            : description;
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
