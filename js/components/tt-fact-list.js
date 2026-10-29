import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * ラベルと値の一覧（プロフィール、使用用具など）。
 *
 * data: [{ label: string, value: string }]
 */
class TtFactList extends BaseElement {
  render() {
    const items = this.data ?? [];
    return html`
      <dl class="tt-fact-list__list">
        ${items.map((item) => html`
          <div class="tt-fact-list__row">
            <dt class="tt-fact-list__label">${item.label}</dt>
            <dd class="tt-fact-list__value">${item.value}</dd>
          </div>
        `)}
      </dl>
    `;
  }
}

customElements.define('tt-fact-list', TtFactList);
