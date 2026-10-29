const ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ESCAPE_MAP[char]);
}

class SafeHTML {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}

function toHTML(value) {
  if (value == null || value === false) return '';
  if (value instanceof SafeHTML) return value.value;
  if (Array.isArray(value)) return value.map(toHTML).join('');
  return escapeHTML(value);
}

/**
 * テンプレートリテラル用タグ。
 * 埋め込んだ値は自動でエスケープされる。html`` の結果と配列はそのまま展開される。
 * null / undefined / false は何も出力しないので、`${cond && html`...`}` で条件付き描画ができる。
 */
export function html(strings, ...values) {
  let result = strings[0];
  values.forEach((value, i) => {
    result += toHTML(value) + strings[i + 1];
  });
  return new SafeHTML(result);
}
