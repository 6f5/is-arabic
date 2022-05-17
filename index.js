// Unicode + UTF-8 Arabic Characters
const ARABIC_CHARS =
  "ﺁﺁﺂﺂﺃﺃﺄﺄﺅﺅﺆﺆﺇﺇﺈﺈﺉﺋﺌﺊﺍﺍﺎﺎﺏﺑﺒﺐﺓﺓﺔﺔﺕﺗﺘﺖﺙﺛﺜﺚﺝﺟﺠﺞﺡﺣﺤﺢﺥﺧﺨﺦﺩﺩﺪﺪﺫﺫﺬﺬﺭﺭﺮﺮﺯﺯﺰﺰﺱﺳﺴﺲﺵﺷﺸﺶﺹﺻﺼﺺﺽﺿﻀﺾﻁﻃﻄﻂﻅﻇﻈﻆﻉﻋﻌﻊﻍﻏﻐﻎﻑﻓﻔﻒﻕﻗﻘﻖﻙﻛﻜﻚﻝﻟﻠﻞﻡﻣﻤﻢﻥﻧﻨﻦﻩﻫﻬﻪﻭﻭﻮﻮﻯﻯﻰﻰﻱﻳﻴﻲﻵﻵﻶﻶﻷﻷﻸﻸﻹﻹﻺﻺﻻﻻﻼﻼ" +
  "ًٌٍَُِّْْئءؤرلاىةوزظشسيبلاتنمكطضصثقفغعهخحجدذْلآآلأأـلإإ،؟";
const ARABIC_NUMBERS = "٠١٢٣٤٥٦٧٨٩";
const ARABIC_HARAKAT = "ًٌٍَُِّْْ";
const ENGLISH_NUMBERS = "0123456789";
const BRACKETS = "{}()";
const debug = require("debug")("app");

// Arabic Symbols
const SYMBOLS = "ًٌٍَُِّـ.،؟ @#$%^&*-+|/=~(){}ْ,";

// Arabic and English numbers
const NUMBERS = ARABIC_NUMBERS + ENGLISH_NUMBERS;

function isArabic(text, options) {
  debug("Arguments:", arguments);
  const opts = {
    count: null,
    ...options,
  };

  debug("Options:", opts);

  validateOptions(opts);

  // Remove whitespace
  // \r, \t, \n, ( )
  const _text = text.replace(/\s/gm, "");
  const _chars = _text.split("");
  const charsLen = _chars.length;

  debug("Text Stripped Spaces (\\n, \\r, \\t,( ))):", _text);
  debug("Characters:", _chars);

  // Number of Arabic characters found
  let matchCount = 0;
  let ArabicCharsMatchCount = 0;

  debug("Mode Selected:", "strict");

  for (let i = 0; i < charsLen; i++) {
    const char = _chars[i];
    debug("Character:", char);

    // Harakat
    if (isHaraka(char)) {
      debug("Character is a Haraka:", char);
      matchCount++;
      ArabicCharsMatchCount++;

      if (opts.count && ArabicCharsMatchCount >= opts.count) {
        return true;
      }

      continue;
    }

    // Arabic Numbers
    if (isArabicNumber(char)) {
      debug("Character is a Arabic Number:", char);

      matchCount++;

      ArabicCharsMatchCount++;

      if (opts.count && ArabicCharsMatchCount >= opts.count) {
        return true;
      }

      continue;
    }

    // Arabic Symbols
    if (isSymbol(char)) {
      debug("Character is a Symbol:", char);

      matchCount++;
      ArabicCharsMatchCount++;

      if (opts.count && ArabicCharsMatchCount >= opts.count) {
        return true;
      }

      continue;
    }

    // Brackets
    if (isBracket(char)) {
      debug("Character is a Bracket:", char);

      matchCount++;
      continue;
    }

    // Arabic Characters (UTF-8) & Unicodes
    if (isArabicChar(char)) {
      debug("Character is a Arabic Character:", char);

      matchCount++;
      ArabicCharsMatchCount++;

      if (opts.count && ArabicCharsMatchCount >= opts.count) {
        return true;
      }

      continue;
    }
  }

  debug("Matched Count:", matchCount);
  debug("Characters Length:", charsLen);

  // Check if matchedCount is equal to number of characters
  return charsLen === matchCount;
}

function validateOptions(opts) {
  if (typeof opts.count !== "number") {
    throw new TypeError("Please enter a valid number for count option.");
  }
}

function isHaraka(char) {
  return ARABIC_HARAKAT.indexOf(char) >= 0;
}

function isNumber(char) {
  return NUMBERS.indexOf(char) >= 0;
}

function isSymbol(char) {
  return SYMBOLS.indexOf(char) >= 0;
}

function isArabicNumber(char) {
  return ARABIC_NUMBERS.indexOf(char) >= 0;
}

function isEnglishNumber(char) {
  return ENGLISH_NUMBERS.indexOf(char) >= 0;
}

function isArabicChar(char) {
  return ARABIC_CHARS.indexOf(char) >= 0;
}

function isBracket(char) {
  return BRACKETS.indexOf(char) >= 0;
}

module.exports = isArabic;
