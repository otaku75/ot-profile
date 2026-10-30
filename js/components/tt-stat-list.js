import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * 能力値の一覧。値を丸いドットの数で表すゲームのステータス風の表示。
 * 画面に入ったときに revealed 属性を付け、ドットが順に埋まる演出をする。
 *
 * data: [{ label: string, value: number }]
 * 属性:
 *   max … 最大値＝ドットの数（既定 10）
 */
class TtStatList extends BaseElement {
  static observedAttributes = ['max'];

  #observer = null;

  connectedCallback() {
    super.connectedCallback();
    if (this.hasAttribute('revealed')) return;
    this.#observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      this.setAttribute('revealed', '');
      this.#observer.disconnect();
    }, { threshold: 0.3 });
    this.#observer.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#observer?.disconnect();
  }

  render() {
    const max = Number(this.attr('max', '10')) || 10;
    const stats = this.data ?? [];

    return html`
      <ul class="tt-stat-list__list">
        ${stats.map((stat) => {
          const value = Math.min(Math.max(Number(stat.value) || 0, 0), max);
          return html`
            <li class="tt-stat-list__item">
              <span class="tt-stat-list__label">${stat.label}</span>
              <span class="tt-stat-list__meter" role="meter" aria-label="${stat.label}"
                aria-valuemin="0" aria-valuemax="${max}" aria-valuenow="${value}">
                ${Array.from({ length: max }, (_, i) => html`
                  <span class="tt-stat-list__pip ${i < value && 'is-filled'}" style="--i: ${i}"></span>
                `)}
              </span>
              <span class="tt-stat-list__value" aria-hidden="true">${value}</span>
            </li>
          `;
        })}
      </ul>
    `;
  }
}

customElements.define('tt-stat-list', TtStatList);
