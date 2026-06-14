const CHARS_TO_ESCAPE = /[\\"'();,=!~<>\s]/;

export function escapeValue(value: unknown): string {
  if (Array.isArray(value)) {
    return `${value.map(escapeValue)}`;
  }

  if (value === null || value === undefined) {
    throw new TypeError('Cannot escape null or undefined value');
  }

  let valueString = value.toString();

  if (CHARS_TO_ESCAPE.test(valueString) || valueString.length === 0) {
    // Escape backslashes first so sequences like \\" are interpreted as a literal backslash + quote
    // rather than an escaped quote; order matters.
    valueString = `"${valueString.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }

  return valueString;
}
