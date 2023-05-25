const CHARS_TO_ESCAPE = /["'();,=!~<>\s]/;

export function escapeValue(value: unknown): string {
  let valueString: string;

  if (Array.isArray(value)) {
    return `${value.map(escapeValue)}`;
  } else {
    valueString = value.toString();
  }
  if (CHARS_TO_ESCAPE.test(valueString) || valueString.length === 0) {
    valueString = `"${valueString.replace(/"/g, '\\"')}"`;
  }

  return valueString;
}
