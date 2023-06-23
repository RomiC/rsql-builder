const CHARS_TO_ESCAPE = /["'();,=!~<>\s]/;

export function escapeValue(value: unknown): string {
  if (Array.isArray(value)) {
    return `${value.map(escapeValue)}`;
  }

  let valueString = value.toString();

  if (CHARS_TO_ESCAPE.test(valueString) || valueString.length === 0) {
    valueString = `"${valueString.replace(/"/g, '\\"')}"`;
  }

  return valueString;
}
