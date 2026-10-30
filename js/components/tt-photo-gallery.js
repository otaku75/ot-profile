import { BaseElement } from './base-element.js';
import { html } from '../utils/html.js';

/**
 * 写真の一覧（正方形のタイル）。押すと全画面のビューアで大きく表示し、前後の写真に移動できる。
 * ビューアは ← → キーでも移動でき、Esc か写真の外を押すと閉じる。
 *
 * data: [{ src, alt, caption?, width?, height?, focus? }]
 *   width / height … 画像の実サイズ（読み込み中のガタつきを防ぐ）
 *   focus          … タイルで正方形に切り抜くときの中心（object-position の値。例: '50% 20%'）
 */
class TtPhotoGallery extends BaseElement {
  #index = 0;
  #swipeStart = null;

  constructor() {
    super();
    this.addEventListener('click', (event) => {
      const thumb = event.target.closest('.tt-photo-gallery__thumb');
      const step = event.target.closest('.tt-photo-gallery__step');
      if (thumb) this.open(Number(thumb.dataset.index));
      else if (step) this.#show(this.#index + Number(step.dataset.step));
      else if (event.target.closest('.tt-photo-gallery__close')) this.close();
      // 写真やボタン以外（ビューアの余白）を押したら閉じる
      else if (event.target.matches('.tt-photo-gallery__dialog, .tt-photo-gallery__viewer, .tt-photo-gallery__figure')) this.close();
    });
    this.addEventListener('keydown', (event) => {
      if (!this.#dialog?.open) return;
      if (event.key === 'ArrowLeft') this.#show(this.#index - 1);
      if (event.key === 'ArrowRight') this.#show(this.#index + 1);
    });
    // スマホでは写真を左右にスワイプして移動する
    this.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch' && event.target.closest('.tt-photo-gallery__figure')) {
        this.#swipeStart = { x: event.clientX, y: event.clientY };
      }
    });
    this.addEventListener('pointerup', (event) => {
      const start = this.#swipeStart;
      this.#swipeStart = null;
      if (!start) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) this.#show(this.#index + (dx < 0 ? 1 : -1));
    });
    this.addEventListener('pointercancel', () => {
      this.#swipeStart = null;
    });
  }

  get #dialog() {
    return this.querySelector('.tt-photo-gallery__dialog');
  }

  open(index) {
    if (!this.data?.length) return;
    this.#show(index);
    this.#dialog.showModal();
  }

  close() {
    this.#dialog?.close();
  }

  // 端まで行ったら反対側に戻る
  #show(index) {
    const photos = this.data ?? [];
    if (!photos.length) return;
    this.#index = (index + photos.length) % photos.length;
    const photo = photos[this.#index];
    const dialog = this.#dialog;
    const image = dialog.querySelector('.tt-photo-gallery__image');
    image.src = photo.src;
    image.alt = photo.alt ?? '';
    if (photo.width && photo.height) {
      image.width = photo.width;
      image.height = photo.height;
    } else {
      image.removeAttribute('width');
      image.removeAttribute('height');
    }
    dialog.querySelector('.tt-photo-gallery__caption').textContent = photo.caption ?? '';
    const count = dialog.querySelector('.tt-photo-gallery__count'); // 写真が1枚のときはない
    if (count) count.textContent = `${this.#index + 1} / ${photos.length}`;
  }

  render() {
    const photos = this.data ?? [];
    return html`
      <ul class="tt-photo-gallery__list">
        ${photos.map((photo, i) => html`
          <li>
            <button type="button" class="tt-photo-gallery__thumb" data-index="${i}" aria-haspopup="dialog">
              <img src="${photo.src}" alt="${photo.alt ?? ''}" ${photo.width && html`width="${photo.width}"`}
                ${photo.height && html`height="${photo.height}"`} loading="lazy"
                ${photo.focus && html`style="--tt-photo-gallery-focus: ${photo.focus}"`}>
            </button>
          </li>
        `)}
      </ul>
      <dialog class="tt-photo-gallery__dialog theme-dark" aria-label="写真ビューア">
        <div class="tt-photo-gallery__viewer">
          <button type="button" class="tt-photo-gallery__close" aria-label="閉じる"></button>
          <figure class="tt-photo-gallery__figure">
            <img class="tt-photo-gallery__image" alt="">
            <figcaption class="tt-photo-gallery__caption"></figcaption>
          </figure>
          ${photos.length > 1 && html`
            <div class="tt-photo-gallery__controls">
              <button type="button" class="tt-photo-gallery__step tt-photo-gallery__step--prev" data-step="-1" aria-label="前の写真"></button>
              <p class="tt-photo-gallery__count" aria-live="polite"></p>
              <button type="button" class="tt-photo-gallery__step tt-photo-gallery__step--next" data-step="1" aria-label="次の写真"></button>
            </div>
          `}
        </div>
      </dialog>
    `;
  }
}

customElements.define('tt-photo-gallery', TtPhotoGallery);
