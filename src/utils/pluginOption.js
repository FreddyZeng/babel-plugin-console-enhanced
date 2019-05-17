const defaultOptions = {
  addFilename: false,
  addCodeLine: true,
  addCodeColumn: true,
  customContent: '',
  methods: ['debug', 'error', 'exception', 'info', 'log', 'warn']
};

export default function computeOptions(userOptions = {}) {
  return Object.assign({}, defaultOptions, userOptions);
}
