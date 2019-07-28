const defaultOptions = {
  needFilename: false,
  needLineNo: true,
  needColumnNo: false,
  needContext: false,
  customContent: '',
  methods: ['debug', 'error', 'exception', 'info', 'log', 'warn'],
  exclude: ['node_modules'],
  include: []
};

export default function computeOptions(userOptions = {}) {
  return Object.assign({}, defaultOptions, userOptions);
}
