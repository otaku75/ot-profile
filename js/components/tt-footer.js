import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';
import { site } from '../data/site.js';

/**
 * サイト共通フッター。選手名・SNSリンクは js/data/site.js から読む。
 */
class TtFooter extends BaseElement {
  connectedCallback() {
    this.classList.add('theme-dark');
    super.connectedCallback();
  }

  render() {
    const year = new Date().getFullYear();
    return html`
      <div class="tt-footer__inner container">
        <p class="tt-footer__name">${site.name.en}</p>
        <ul class="tt-footer__social">
          ${site.social.map((link) => {
            const external = /^https?:\/\//.test(link.url);
            return html`<li><a href="${link.url}" ${external && html`target="_blank" rel="noopener"`}>${link.label}</a></li>`;
          })}
        </ul>
        <p class="tt-footer__copyright"><small>&copy; ${year} ${site.name.en}</small></p>
      </div>
    `;
  }
}

customElements.define('tt-footer', TtFooter);
