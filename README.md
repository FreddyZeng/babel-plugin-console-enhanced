# babel-plugin-console-enhanced

Babel plugin helps enhance the content of console expression.

## Usage

```bash
npm install babel-plugin-console-enhanced -D
```

or

```bash
yarn add babel-plugin-console-enhanced -D
```

Via `.babelrc.js` or `babel.config.js` or babel-loader.

```javascript
{
  "plugins": [["console-enhanced", options]]
}
```

### options

`options` need to be an object.

```javascript
{
  "addFilename": false,
  "addCodeLine": true,
  "addCodeColumn": false,
  "customContent": 'hello world',
  "methods": ["warn", "log"]
}
```

- `addFilename` &mdash; optional, default value is `false`, if add filename of the file contains console expression to content or not.

- `addCodeLine` &mdash; optional, default value is `true`, if add line of console expression to content or not.

- `addCodeColumn` &mdash; optional, default value is `true`, if add column of console expression to content or not.

- `customContent` &mdash; optional, default value is `""`, if not a null string, it will be added to the content of console expression.

- `methods` &mdash; optional, default value is `['debug', 'error', 'exception', 'info', 'log', 'warn']`, if the methods is not in the methods array, nothing will be added to the console statement.

## Example

### From

```javascript
console.log(a);
```

### To

```javascript
console.log('filename cool.js , line 3, column 0, hello world, ', a);
```

## Notes

If you want to use this plugin via `.babelrc`, it should be configured in `.babelrc.js`.
And `.babelrc` should be like this:

```javascript
{
  "presets": ["./.babelrc.js"]
}
```
