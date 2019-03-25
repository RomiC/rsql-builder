const CHARS_TO_ESCAPE = /["'();,=!~<>\s]/;

export class EscapedValue {
  private val: string;

  constructor(val: string) {
    this.val = val;
  }

  toString(): string {
    return this.val;
  }
}

/**
 * Escape string value
 *
 * @param value Value to escape
 * @returns EscapedValue instance
 */
export default function escapeValue(value: any): EscapedValue {
  if (value instanceof EscapedValue) {
    return value;
  }

  let val: string;

  if (typeof value !== 'string') {
    val = value.toString();
  } else {
    val = value;
  }

  if (CHARS_TO_ESCAPE.test(val) || val.length === 0) {
    return new EscapedValue(`"${val.replace(/"/g, '\\"')}"`);
  } else {
    return new EscapedValue(val);
  }
}
