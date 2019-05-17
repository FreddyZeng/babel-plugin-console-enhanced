const defaultOptions = {
  addFilename: false,
  addLine: true,
  addColumn: true,
  customContent: ''
};

export default function computeOptions(userOptions = {}) {
  return Object.assign({}, defaultOptions, userOptions);
}
