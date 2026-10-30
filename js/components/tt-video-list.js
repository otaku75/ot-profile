import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * YouTube 動画の一覧。最初はサムネイルと再生ボタンだけを表示し、押したときに埋め込みプレーヤーを読み込む
 * （ページを開いただけでは YouTube のプレーヤーや Cookie を読み込まないので、表示も速い）。
 *
 * data: [{ youtubeId, title, date? }]
 *   youtubeId … 動画のID（https://www.youtube.com/watch?v=XXXX の XXXX）。空なら「COMING SOON」を表示する
 *   date      … 'YYYY-MM-DD' など
 */
class TtVideoList extends BaseElement {
  constructor() {
    super();
    this.addEventListener('click', (event) => {
      const button = event.target.closest('.tt-video-list__play');
      if (button) this.#play(button);
    });
  }

  // 押されたサムネイルを埋め込みプレーヤーに差し替える（ほかの動画は再描画しないよう、この1つだけ置き換える）
  #play(button) {
    const { youtubeId, title } = button.dataset;
    const iframe = document.createElement('iframe');
    iframe.className = 'tt-video-list__frame';
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&rel=0`;
    iframe.title = title;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    button.replaceWith(iframe);
    iframe.focus();
  }

  render() {
    const videos = this.data ?? [];
    return html`
      <ul class="tt-video-list__list">
        ${videos.map((video) => html`
          <li class="tt-video-list__item">
            <div class="tt-video-list__media">
              ${video.youtubeId
                ? html`
                  <button type="button" class="tt-video-list__play" data-youtube-id="${video.youtubeId}" data-title="${video.title}">
                    <img src="https://i.ytimg.com/vi/${encodeURIComponent(video.youtubeId)}/hqdefault.jpg" alt="" loading="lazy">
                    <span class="tt-video-list__icon" aria-hidden="true"></span>
                    <span class="visually-hidden">動画を再生: ${video.title}</span>
                  </button>`
                : html`
                  <div class="tt-video-list__placeholder bg-dots">
                    <span class="tt-video-list__icon" aria-hidden="true"></span>
                    <span class="tt-video-list__soon">Coming soon</span>
                  </div>`}
            </div>
            <div class="tt-video-list__body">
              ${video.date && html`<time class="tt-video-list__date" datetime="${video.date}">${video.date.replaceAll('-', '.')}</time>`}
              <p class="tt-video-list__title">${video.title}</p>
            </div>
          </li>
        `)}
      </ul>
    `;
  }
}

customElements.define('tt-video-list', TtVideoList);
