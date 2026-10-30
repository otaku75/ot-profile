import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * ゲームのメニュー画面風のリンクカード一覧。各カードは .panel で、押すと沈む。
 *
 * data: [{ href, label, ja?, preview? }]
 *   label   … 英字の項目名（例: 'Profile'）
 *   ja      … 日本語の項目名
 *   preview … カード下部に出す説明や最新情報
 */
class TtMenu extends BaseElement {
  render() {
    const items = this.data ?? [];
    return html`
      <ul class="tt-menu__list">
        ${items.map((item) => html`
          <li>
            <a class="tt-menu__card panel" href="${item.href}">
              <span class="tt-menu__head">
                <span class="tt-menu__label">${item.label}</span>
                <span class="tt-menu__arrow" aria-hidden="true"></span>
              </span>
              ${item.ja && html`<span class="tt-menu__ja">${item.ja}</span>`}
              ${item.preview && html`<span class="tt-menu__preview">${item.preview}</span>`}
            </a>
          </li>
        `)}
      </ul>
    `;
  }
}

customElements.define('tt-menu', TtMenu);
