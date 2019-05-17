module.exports = {
  plugins: [
    [
      require('../lib/index'),
      {
        addFilename: true,
        addCodeLine: true,
        addCodeColumn: false,
        customContent: 'hello world',
        methods: ['warn', 'info'],
        exclude: ['cool.js']
      }
    ]
  ]
};
