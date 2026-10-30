import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * 年ごとにまとめた時系列の一覧（戦績、卓球歴など）。日付順に並べ替えて表示する。
 *
 * data: [{ date: 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY', title, note?, badge?, highlight? }]
 *   badge     … 結果などを表示するバッジ（例: '優勝'）
 *   highlight … true でコインとバッジを金色にする
 * 属性:
 *   order … "asc" で古い順（既定は新しい順）
 *   limit … 表示件数の上限（並べ替え後の先頭から。省略時は全件）
 */
class TtTimeline extends BaseElement {
  static observedAttributes = ['order', 'limit'];

  render() {
    const direction = this.attr('order') === 'asc' ? 1 : -1;
    const limit = Number(this.attr('limit')) || Infinity;
    const items = [...(this.data ?? [])]
      .sort((a, b) => a.date.localeCompare(b.date) * direction)
      .slice(0, limit);
    const groups = Map.groupBy(items, (item) => item.date.slice(0, 4));
    const hasBadge = items.some((item) => item.badge);

    return html`
      <ol class="tt-timeline__groups ${!hasBadge && 'tt-timeline__groups--no-badge'}">
        ${[...groups].map(([year, entries]) => html`
          <li class="tt-timeline__group">
            <h3 class="tt-timeline__year">${year}</h3>
            <ol class="tt-timeline__entries">
              ${entries.map((item) => html`
                <li class="tt-timeline__entry ${item.highlight && 'is-highlight'}">
                  <time class="tt-timeline__date" datetime="${item.date}">${formatMonthDay(item.date)}</time>
                  <div class="tt-timeline__body">
                    <p class="tt-timeline__title">${item.title}</p>
                    ${item.note && html`<p class="tt-timeline__note">${item.note}</p>`}
                  </div>
                  ${item.badge && html`<p class="tt-timeline__badge">${item.badge}</p>`}
                </li>
              `)}
            </ol>
          </li>
        `)}
      </ol>
    `;
  }
}

// '2026-08-24' → '8.24' / '2026-08' → '8月' / '2026' → ''（年は見出しに出る）
function formatMonthDay(date) {
  const [, month, day] = date.split('-').map(Number);
  if (!month) return '';
  return day ? `${month}.${day}` : `${month}月`;
}

customElements.define('tt-timeline', TtTimeline);
