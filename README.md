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

```
{
  "plugins": [["babel-plugin-console-enhanced", options]]
}
```

## options

`options` need to be an object.

### methods

The option provides control over which console statments are added info. `Methods` is set as an array of string.

**Default**: ['debug', 'error', 'exception', 'info', 'log', 'warn']

```
{
  plugins: [
    ["babel-plugin-console-enhanced", {
      "methods": ['info', 'log']
    }]
  ]
}
```

### exclude

The option determines that the plugin doesn't take effect in the excluded file. `Exclude` is set as an array of string.

**Default**: ['node_modules']

```
{
  plugins: [
    ["babel-plugin-console-enhanced", {
      "exclude": ['node_modules']
    }]
  ]
}
```

### include

The option determines that the plugin takes effect in the excluded file. `Exclude` is set as an array of string.

**Default**: []

```
{
  plugins: [
    ["babel-plugin-console-enhanced", {
      "exclude": ['node_modules']
    }]
  ]
}
```

### needFilename

The option provides control over if add filename into the console statement.

**Default**: false

```
{
  plugins: [
    ["babel-plugin-console-enhanced", {
      "needFilename": true
    }]
  ]
}
```

### needLineNo

The option provides control over if add the code line of the of the console statement start.

**Default**: true

```
{
  plugins: [
    ["babel-plugin-console-enhanced", {
      "needLineNo": true
    }]
  ]
}
```

### needColumnNo

The option provides control over if add the code column of the of the console statement start.

**Default**: false

```
{
  plugins: [
    ["babel-plugin-console-enhanced", {
      "needColumnNo": true
    }]
  ]
}
```

### needContext

The option provides control over if add the invocation context of the console statement.

**Default**: true

```
{
  plugins: [
    ["babel-plugin-console-enhanced", {
      "needContext": true
    }]
  ]
}
```

### customContent

The option provides control over if add custom content into the console statement. The type of custom content is string.

**Default**: ''

```
{
  plugins: [
    ["babel-plugin-console-enhanced", {
      "customContent": ""
    }]
  ]
}
```

## Example

### From

```javascript
console.log(a);
```

### To

```javascript
console.log(
  'filename: cool.js , line: 3, column: 0, context: Foo -> bar(), hello world, ',
  a
);
```
