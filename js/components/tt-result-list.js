import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * 戦績のタイムライン。日付の新しい順に並べ替え、年ごとにまとめて表示する。
 *
 * data: [{ date: 'YYYY-MM-DD' | 'YYYY-MM', tournament, event?, result, highlight? }]
 * 属性:
 *   limit … 表示件数の上限（新しいものから。省略時は全件）
 */
class TtResultList extends BaseElement {
  static observedAttributes = ['limit'];

  render() {
    const limit = Number(this.attr('limit')) || Infinity;
    const items = [...(this.data ?? [])]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, limit);
    const groups = Map.groupBy(items, (item) => item.date.slice(0, 4));

    return html`
      <ol class="tt-result-list__groups">
        ${[...groups].map(([year, entries]) => html`
          <li class="tt-result-list__group">
            <h3 class="tt-result-list__year">${year}</h3>
            <ol class="tt-result-list__entries">
              ${entries.map((item) => html`
                <li class="tt-result-list__entry ${item.highlight && 'is-highlight'}">
                  <time class="tt-result-list__date" datetime="${item.date}">${formatMonthDay(item.date)}</time>
                  <div class="tt-result-list__body">
                    <p class="tt-result-list__tournament">${item.tournament}</p>
                    ${item.event && html`<p class="tt-result-list__event">${item.event}</p>`}
                  </div>
                  <p class="tt-result-list__result">${item.result}</p>
                </li>
              `)}
            </ol>
          </li>
        `)}
      </ol>
    `;
  }
}

// '2026-08-24' → '8.24' / '2026-08' → '8月'
function formatMonthDay(date) {
  const [, month, day] = date.split('-').map(Number);
  return day ? `${month}.${day}` : `${month}月`;
}

customElements.define('tt-result-list', TtResultList);
