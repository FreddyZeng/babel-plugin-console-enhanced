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
  "addLine": true,
  "addColumn": false,
  "customContent": 'hello world'
}
```

- `addFilename` &mdash; optional, default value is `false`, if add filename of the file contains console expression to content or not.

- `addLine` &mdash; optional, default value is `true`, if add line of console expression to content or not.

- `addColumn` &mdash; optional, default value is `true`, if add column of console expression to content or not.

- `customContent` &mdash; optional, default value is `""`, if not a null string, it will be added to the content of console expression.

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
