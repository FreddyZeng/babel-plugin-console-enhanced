/* Judges obj is Object or not */
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/* Judges a file is in the patterns or not */
export function matchesFile(patterns, filename) {
  return patterns.some(pattern => filename.includes(pattern));
}

const scopeHandlers = {
  FunctionDeclaration: path => `${path.node.id.name}()`,
  VariableDeclarator: path => path.node.id.name,
  ObjectProperty: path => path.node.key.name,
  ObjectMethod: path => `${path.node.key.name}()`,
  ClassMethod: path => `${path.node.key.name}()`,
  ClassExpression: path => path.node.id.name,
  ClassDeclaration: path => path.node.id.name,
  AssignmentExpression: path => path.node.left.name
};

/**
 * Computes that the passed path's excute context.
 *
 * @param {object} path A babel path
 * @param {array} scope The array of excute context in the last loop
 * @returns {array} The excute context of passed path
 */
export function computeContext(path, scope = []) {
  const parentPath = path.findParent(path =>
    Object.keys(scopeHandlers).includes(path.type)
  );
  if (parentPath) {
    return computeContext(parentPath, [
      scopeHandlers[parentPath.type](parentPath),
      ...scope
    ]);
  }
  return scope.length ? `${scope.join(' -> ')}` : '';
}

/**
 * Ensures that the passed value is in an array or an array itself.
 *
 * @param {any} value Either an array or a value that should be wrapped
 * @returns {array} The array
 */
export function toArray(value) {
  return !value || Array.isArray(value) ? value : [value];
}
