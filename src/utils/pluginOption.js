export const defaultOptions = {
  expression: 'console.log',
  needFilename: true,
  needLineNo: true,
  needColumnNo: false,
  needContext: true,
  windowProperty: [],
  exclude: ['node_modules'],
  include: []
};

/* Combines default options and user options */
export function computeOptions(defaultOptions, userOptions = {}) {
  return Object.assign({}, defaultOptions, userOptions);
}
