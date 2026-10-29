import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * セクション見出し。英字の大見出し＋日本語の小見出し。
 *
 * 属性:
 *   en    … 英字の見出し
 *   ja    … 日本語の見出し
 *   level … 見出しレベル（1〜6。既定 2）
 *   align … "center" で中央揃え
 */
class TtSectionHeading extends BaseElement {
  static observedAttributes = ['en', 'ja', 'level'];

  render() {
    const level = Math.min(Math.max(Number(this.attr('level', '2')) || 2, 1), 6);
    return html`
      <h${level} class="tt-section-heading__title">
        <span class="tt-section-heading__en">${this.attr('en')}</span>
        <span class="tt-section-heading__ja">${this.attr('ja')}</span>
      </h${level}>
    `;
  }
}

customElements.define('tt-section-heading', TtSectionHeading);
