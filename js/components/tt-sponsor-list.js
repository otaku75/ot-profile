import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * スポンサーの一覧。ロゴ（なければ社名）・紹介文・公式サイトへのリンクをカードで表示する。
 * カードの幅が広いときは、ロゴと文章を横に並べる。
 *
 * 属性:
 *   level … 社名の見出しレベル（1〜6。既定 2）
 *
 * data: [{ name, description?, url?, logo?, since? }]
 *   logo  … ロゴ画像のパス（assets/images/ に置く）。ない場合は社名を表示する
 *   since … 支援が始まった年など（例: '2025'）
 */
class TtSponsorList extends BaseElement {
  static observedAttributes = ['level'];

  render() {
    const sponsors = this.data ?? [];
    const level = Math.min(Math.max(Number(this.attr('level', '2')) || 2, 1), 6);
    return html`
      <ul class="tt-sponsor-list__list">
        ${sponsors.map((sponsor) => html`
          <li class="tt-sponsor-list__item">
            <article class="tt-sponsor-list__card panel">
              <div class="tt-sponsor-list__logo bg-dots">
                ${sponsor.logo
                  ? html`<img src="${sponsor.logo}" alt="${sponsor.name}" loading="lazy">`
                  : html`<span class="tt-sponsor-list__logo-text" aria-hidden="true">${sponsor.name}</span>`}
              </div>
              <div class="tt-sponsor-list__body">
                ${sponsor.since && html`<p class="tag tag--primary">Since ${sponsor.since}</p>`}
                <h${level} class="tt-sponsor-list__name">${sponsor.name}</h${level}>
                ${sponsor.description && html`<p class="tt-sponsor-list__description">${sponsor.description}</p>`}
                ${sponsor.url && html`
                  <p>
                    <a class="button button--sm button--secondary" href="${sponsor.url}" target="_blank" rel="noopener">
                      公式サイト<span class="tt-sponsor-list__external" aria-hidden="true"></span>
                      <span class="visually-hidden">（新しいタブで開きます）</span>
                    </a>
                  </p>`}
              </div>
            </article>
          </li>
        `)}
      </ul>
    `;
  }
}

customElements.define('tt-sponsor-list', TtSponsorList);
