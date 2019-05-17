export function getLastWord(str, separator) {
  return str.split(separator)[str.split(separator).length - 1];
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
