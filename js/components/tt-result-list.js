import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * 戦績一覧。
 *
 * data: [{ year, tournament, event?, result, highlight? }]（新しい順）
 * 属性:
 *   limit … 表示件数の上限（省略時は全件）
 */
class TtResultList extends BaseElement {
  static observedAttributes = ['limit'];

  render() {
    const limit = Number(this.attr('limit')) || Infinity;
    const items = (this.data ?? []).slice(0, limit);

    return html`
      <ul class="tt-result-list__list">
        ${items.map((item) => html`
          <li class="tt-result-list__item ${item.highlight && 'is-highlight'}">
            <span class="tt-result-list__year">${item.year}</span>
            <span class="tt-result-list__tournament">
              ${item.tournament}
              ${item.event && html`<span class="tt-result-list__event">${item.event}</span>`}
            </span>
            <span class="tt-result-list__result">${item.result}</span>
          </li>
        `)}
      </ul>
    `;
  }
}

customElements.define('tt-result-list', TtResultList);
