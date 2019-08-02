import { computeOptions, defaultOptions } from './utils/pluginOption';
import { isObject, matchesFile, computeContext, toArray } from './utils/tools';

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

        if (this.opts.exclude) this.opts.exclude = toArray(this.opts.exclude);
        if (this.opts.include) this.opts.include = toArray(this.opts.include);
        if (this.opts.windowProperty)
          this.opts.windowProperty = toArray(this.opts.windowProperty);

        const options = computeOptions(defaultOptions, this.opts);

        const filename = this.filename || this.file.opts.filename || 'unknown';

        // not work on excluded files, and exclude is proiority other than include
        if (
          Array.isArray(options.exclude) &&
          options.exclude.length &&
          matchesFile(options.exclude, filename)
        ) {
          return;
        }

        // just work on included files
        if (
          Array.isArray(options.include) &&
          options.include.length &&
          !matchesFile(options.include, filename)
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

        if (
          Array.isArray(options.windowProperty) &&
          options.windowProperty.length
        ) {
          options.windowProperty.forEach(propName => {
            if (!propName.startsWith('window.')) {
              propName = `window.${propName}`;
            }
            path.node.arguments.unshift(t.identifier(propName));
          });
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
