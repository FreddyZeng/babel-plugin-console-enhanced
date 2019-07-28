module.exports = {
  plugins: [
    [
      require('../lib/index'),
      {
        needFilename: true,
        needLineNo: true,
        needColumnNo: false,
        needContext: true,
        customContent: 'hello world',
        methods: ['info', 'log'],
        exclude: ['cool.js']
      }
    ]
  ]
};
