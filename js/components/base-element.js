/**
 * 全コンポーネントの基底クラス。render() の結果を Light DOM に描画する。
 *
 * - 文字列の設定値は属性で受け取る。static observedAttributes に列挙すると変更時に再描画される
 * - 配列・オブジェクトは data プロパティで受け取る。代入すると再描画される
 * - 再描画のたびに中身が置き換わるため、イベントはホスト要素に委譲して登録すること
 */
export class BaseElement extends HTMLElement {
  #data = null;
  #connected = false;

  get data() {
    return this.#data;
  }

  set data(value) {
    this.#data = value;
    if (this.#connected) this.update();
  }

  connectedCallback() {
    this.#connected = true;
    this.update();
  }

  disconnectedCallback() {
    this.#connected = false;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.#connected && oldValue !== newValue) this.update();
  }

  attr(name, fallback = '') {
    return this.getAttribute(name) ?? fallback;
  }

  update() {
    this.innerHTML = String(this.render());
  }

  render() {
    return '';
  }
}
