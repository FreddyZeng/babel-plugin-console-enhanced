const defaultOptions = {
  needFilename: false,
  needLineNo: true,
  needColumnNo: true,
  needContext: false,
  customContent: '',
  methods: ['debug', 'error', 'exception', 'info', 'log', 'warn'],
  exclude: ['node_modules']
};

export default function computeOptions(userOptions = {}) {
  return Object.assign({}, defaultOptions, userOptions);
}
