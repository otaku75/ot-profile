import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * お知らせ・試合予定の一覧。
 *
 * data: [{ date: 'YYYY-MM-DD', category?, title, url? }]（新しい順）
 * 属性:
 *   limit … 表示件数の上限（省略時は全件）
 */
class TtNewsList extends BaseElement {
  static observedAttributes = ['limit'];

  render() {
    const limit = Number(this.attr('limit')) || Infinity;
    const items = (this.data ?? []).slice(0, limit);

    return html`
      <ul class="tt-news-list__list">
        ${items.map((item) => html`
          <li class="tt-news-list__item">
            <time class="tt-news-list__date" datetime="${item.date}">${item.date.replaceAll('-', '.')}</time>
            <span class="tt-news-list__category">
              ${item.category && html`<span class="tag">${item.category}</span>`}
            </span>
            <p class="tt-news-list__title">
              ${item.url ? html`<a href="${item.url}">${item.title}</a>` : item.title}
            </p>
          </li>
        `)}
      </ul>
    `;
  }
}

customElements.define('tt-news-list', TtNewsList);
