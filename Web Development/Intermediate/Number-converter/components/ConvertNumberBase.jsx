const conversionFunctions = {
  "🪀 Decimal": {
    "🪀 Decimal": (v) => v,
    "🐋 Binary": (v) => v.toString(2),
    "🍝 Hexadecimal": (v) => v.toString(16).toString(16).toUpperCase(),
    "🐙 Octal": (v) => v.toString(8),
  },
  "🐋 Binary": {
    "🪀 Decimal": (v) => parseInt(v, 2),
    "🐋 Binary": (v) => v,
    "🍝 Hexadecimal": (v) => v.toString(16).toString(16).toUpperCase(),
    "🐙 Octal": (v) => parseInt(v, 2).toString(8),
  },
  "🍝 Hexadecimal": {
    "🪀 Decimal": (v) => parseInt(v, 16),
    "🐋 Binary": (v) => parseInt(v, 16).toString(2),
    "🍝 Hexadecimal": (v) => v,
    "🐙 Octal": (v) => parseInt(v, 16).toString(8),
  },
  "🐙 Octal": {
    "🪀 Decimal": (v) => parseInt(v, 8),
    "🐋 Binary": (v) => parseInt(v, 8).toString(2),
    "🍝 Hexadecimal": (v) => v.toString(16).toString(16).toUpperCase(),
    "🐙 Octal": (v) => v,
  },
};

export const ConvertNumberBase = (num, fromBase, toBase) => {
  const conversionFunction = conversionFunctions[fromBase][toBase];
  return conversionFunction(num);
};