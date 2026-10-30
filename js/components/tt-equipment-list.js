import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * 使用用具のカード一覧（ゲームの装備画面風）。各カードは .panel。
 * image がない場合はドット柄の枠にラケットのアイコンを表示する。
 *
 * data: [{ slot: string, name: string, maker?, comment?, image? }]
 *   slot … 装備の部位（例: 'ラケット', 'ラバー（フォア）'）
 */
class TtEquipmentList extends BaseElement {
  render() {
    const items = this.data ?? [];
    return html`
      <ul class="tt-equipment-list__list">
        ${items.map((item) => html`
          <li class="tt-equipment-list__item panel">
            <p class="tag tag--primary">${item.slot}</p>
            <div class="tt-equipment-list__main">
              <div class="tt-equipment-list__icon bg-dots">
                ${item.image ? html`<img src="${item.image}" alt="">` : RACKET_ICON}
              </div>
              <div>
                <p class="tt-equipment-list__name">${item.name}</p>
                ${item.maker && html`<p class="tt-equipment-list__maker">${item.maker}</p>`}
              </div>
            </div>
            ${item.comment && html`<p class="tt-equipment-list__comment">${item.comment}</p>`}
          </li>
        `)}
      </ul>
    `;
  }
}

const RACKET_ICON = html`
  <svg class="tt-equipment-list__racket" viewBox="0 0 48 48" aria-hidden="true">
    <g transform="rotate(-15 21 26)">
      <rect class="tt-equipment-list__racket-handle" x="15.5" y="28" width="11" height="17" rx="3.5" />
      <ellipse class="tt-equipment-list__racket-head" cx="21" cy="17" rx="14.5" ry="15" />
    </g>
    <circle class="tt-equipment-list__racket-ball" cx="41" cy="31" r="4.5" />
  </svg>
`;

customElements.define('tt-equipment-list', TtEquipmentList);
