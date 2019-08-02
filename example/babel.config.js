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
        windowProperty: [
          'window.location.href',
          'perfomance.timing',
          'navigator.userAgent'
        ],
        methods: ['info', 'log'],
        exclude: ['cool.js']
      }
    ]
  ]
};
