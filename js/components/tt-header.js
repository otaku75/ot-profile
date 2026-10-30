import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';
import { site } from '../data/site.js';

const DESKTOP_QUERY = '(min-width: 900px)';

/**
 * サイト共通ヘッダー。ナビ項目は js/data/site.js から読む。
 * 画面上部に固定（sticky）され、スクロールすると scrolled 属性が付いて浮いたバーになる。
 * 900px 未満ではハンバーガーメニューになる。
 *
 * 属性:
 *   overlay … ヒーロー画像の上に重ねて表示する（背景透過・白文字。固定はしない）
 */
class TtHeader extends BaseElement {
  #desktop = window.matchMedia(DESKTOP_QUERY);

  constructor() {
    super();
    this.addEventListener('click', (event) => {
      if (event.target.closest('.tt-header__toggle')) this.toggleMenu();
      else if (event.target.closest('.tt-header__nav a')) this.toggleMenu(false);
    });
  }

  #onKeydown = (event) => {
    if (event.key === 'Escape' && this.hasAttribute('menu-open')) {
      this.toggleMenu(false);
      this.querySelector('.tt-header__toggle')?.focus();
    }
  };

  #onBreakpointChange = (event) => {
    if (event.matches) this.toggleMenu(false);
  };

  #onScroll = () => {
    this.toggleAttribute('scrolled', window.scrollY > 8);
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.#onKeydown);
    this.#desktop.addEventListener('change', this.#onBreakpointChange);
    window.addEventListener('scroll', this.#onScroll, { passive: true });
    this.#onScroll();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.#onKeydown);
    this.#desktop.removeEventListener('change', this.#onBreakpointChange);
    window.removeEventListener('scroll', this.#onScroll);
    this.toggleMenu(false);
  }

  toggleMenu(force) {
    const open = this.toggleAttribute('menu-open', force);
    this.querySelector('.tt-header__toggle')?.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-scroll-locked', open);
  }

  render() {
    return html`
      <div class="tt-header__inner container">
        <a class="tt-header__logo" href="./">${site.name.en}</a>
        <button class="tt-header__toggle" type="button" aria-expanded="false" aria-controls="global-nav">
          <span class="visually-hidden">メニュー</span>
          <span class="tt-header__toggle-icon" aria-hidden="true"></span>
        </button>
        <nav class="tt-header__nav theme-dark" id="global-nav" aria-label="グローバルナビゲーション">
          <ul class="tt-header__nav-list">
            ${site.nav.map((item) => html`
              <li><a href="${item.href}" ${isCurrentPage(item.href) && html`aria-current="page"`}>${item.label}</a></li>
            `)}
          </ul>
        </nav>
      </div>
    `;
  }
}

// ページ内アンカー（'./#results' など）は現在地として扱わない
function isCurrentPage(href) {
  const url = new URL(href, location.href);
  return !url.hash && url.pathname === location.pathname;
}

customElements.define('tt-header', TtHeader);
