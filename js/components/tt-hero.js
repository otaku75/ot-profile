import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * ページ上部のメインビジュアル。
 *
 * 既定（全面）: 画像を画面幅いっぱいに表示する。
 *   900px 以上は画像の上に文字を重ね、900px 未満は画像の下に文字を置く。
 * framed: ドット柄の上に枠付きの画像を置き、名前はネームプレート（.panel）で左下に重ねる。
 *
 * 属性:
 *   framed     … 枠付きの表示にする
 *   image      … 画像パス
 *   alt        … 画像の代替テキスト
 *   eyebrow    … 見出し上のバッジ
 *   heading    … 見出し（h1）
 *   subheading … 見出し下の補足
 *   focus      … 画像の表示位置（object-position の値。例: "62% 30%"）
 */
class TtHero extends BaseElement {
  static observedAttributes = ['framed', 'image', 'alt', 'eyebrow', 'heading', 'subheading', 'focus'];

  render() {
    this.style.setProperty('--tt-hero-focus', this.attr('focus', 'center'));
    return this.hasAttribute('framed') ? this.#renderFramed() : this.#renderFull();
  }

  #renderFull() {
    return html`
      <div class="tt-hero__media">${this.#image()}</div>
      <div class="tt-hero__body theme-dark">
        <div class="tt-hero__content container">${this.#content()}</div>
      </div>
    `;
  }

  #renderFramed() {
    return html`
      <div class="tt-hero__inner container">
        <div class="tt-hero__frame">${this.#image()}</div>
        <div class="tt-hero__plate panel">
          <div class="tt-hero__content">${this.#content()}</div>
        </div>
      </div>
    `;
  }

  #image() {
    return html`<img class="tt-hero__image" src="${this.attr('image')}" alt="${this.attr('alt')}" fetchpriority="high">`;
  }

  #content() {
    const eyebrow = this.attr('eyebrow');
    const subheading = this.attr('subheading');
    return html`
      ${eyebrow && html`<p class="tt-hero__eyebrow">${eyebrow}</p>`}
      <h1 class="tt-hero__heading">${this.attr('heading')}</h1>
      ${subheading && html`<p class="tt-hero__subheading">${subheading}</p>`}
    `;
  }
}

customElements.define('tt-hero', TtHero);
