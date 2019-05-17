export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function matchesExclude(patterns = ['node_modules'], filename) {
  console.log(patterns.some(pattern => filename.includes(pattern)), 1);
  return patterns.some(pattern => filename.includes(pattern));
}
