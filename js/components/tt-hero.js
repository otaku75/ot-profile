import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * ページ上部のメインビジュアル。
 * 900px 以上は画像の上に文字を重ね、900px 未満は画像の下に文字を置く。
 *
 * 属性:
 *   image      … 画像パス
 *   alt        … 画像の代替テキスト
 *   eyebrow    … 見出し上の小さな英字ラベル
 *   heading    … 見出し（h1）
 *   subheading … 見出し下の補足
 *   focus      … 画像の表示位置（object-position の値。例: "62% 30%"）
 */
class TtHero extends BaseElement {
  static observedAttributes = ['image', 'alt', 'eyebrow', 'heading', 'subheading', 'focus'];

  render() {
    this.style.setProperty('--tt-hero-focus', this.attr('focus', 'center'));
    const eyebrow = this.attr('eyebrow');
    const subheading = this.attr('subheading');

    return html`
      <div class="tt-hero__media">
        <img class="tt-hero__image" src="${this.attr('image')}" alt="${this.attr('alt')}" fetchpriority="high">
      </div>
      <div class="tt-hero__body theme-dark">
        <div class="tt-hero__content container">
          ${eyebrow && html`<p class="tt-hero__eyebrow">${eyebrow}</p>`}
          <h1 class="tt-hero__heading">${this.attr('heading')}</h1>
          ${subheading && html`<p class="tt-hero__subheading">${subheading}</p>`}
        </div>
      </div>
    `;
  }
}

customElements.define('tt-hero', TtHero);
