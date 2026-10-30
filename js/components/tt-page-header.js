import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * 下層ページの見出し。メニュー（トップページ）へ戻るボタンと、h1 の見出しを表示する。
 *
 * 属性:
 *   en … 英字の見出し
 *   ja … 日本語の見出し
 */
class TtPageHeader extends BaseElement {
  static observedAttributes = ['en', 'ja'];

  render() {
    return html`
      <a class="tt-page-header__back button button--sm button--secondary" href="./">
        <span class="tt-page-header__arrow" aria-hidden="true"></span>
        MENU<span class="visually-hidden">（トップページ）へ戻る</span>
      </a>
      <tt-section-heading en="${this.attr('en')}" ja="${this.attr('ja')}" level="1"></tt-section-heading>
    `;
  }
}

customElements.define('tt-page-header', TtPageHeader);
