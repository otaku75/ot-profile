// 404ページ。コンポーネントを登録し、選択肢をゲームのように ↑↓ キーで選べるようにする
import '../components/index.js';

const choices = [...document.querySelectorAll('.choice-list a')];

// 「NO」はサイト内から来たときだけ前のページへ戻る（それ以外は href のとおりトップへ）
document.querySelector('[data-back]').addEventListener('click', (event) => {
  if (document.referrer && new URL(document.referrer).origin === location.origin) {
    event.preventDefault();
    history.back();
  }
});

// 何も選んでいないときは先頭（YES）が選ばれている扱いにする
document.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
  event.preventDefault();
  const current = Math.max(choices.indexOf(document.activeElement), 0);
  const step = event.key === 'ArrowDown' ? 1 : -1;
  choices[(current + step + choices.length) % choices.length].focus();
});
