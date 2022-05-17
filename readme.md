# is-arabic

Check if a string is Arabic.

# What is this library for?

This library is created to help Arab and non Arab programmers to check if a string/text is Arabic or includes a certain number of Arabic characters. See example below.

# Characters that are considered Arabic

- Arabic Letters
- Arabic Numbers
- Harakat
- Arabic Symbols

## Install

```
npm i is-arabic
```

## Test

```
npm test
```

## Options

| Option |         Description          | Default Value |   Type |
| :----- | :--------------------------: | ------------: | -----: |
| count  | The number of chars to match |          null | Number |

## Defualt Options

```js
{
  count: null;
}
```

## Example

```js
const isArabic = require("is-arabic");
const text = "السلام عليكم";

// If you don't pass any options, it will check all characters.
// and if all characters are not Arabic, it will return false
if (isArabic(text)) {
  // Do something
} else {
  // Do something else
}

// To check if string includes certain number of characters instead of all
// use the count option
const options = {
  count: 4,
};

const text2 = "اليوم Today";

const includesArabic = isArabic(text2, options); // true
console.log("Includes Arabic:", includesArabic);
```
