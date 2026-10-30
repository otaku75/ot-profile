// ギャラリーの写真（tt-photo-gallery 用）と動画（tt-video-list 用）。並べたい順に書く
// TODO: ダミーデータ。写真は今ある2枚を使い回している。実際の写真・動画に差し替える

// 写真は assets/images/ に置く。width / height は画像の実サイズ
// focus … 一覧で正方形に切り抜くときの中心（例: '50% 20%' で上寄り）
export const photos = [
  { src: 'assets/images/hero.jpg', alt: '試合中にボールを打つ選手', caption: '〇〇大会 準々決勝', width: 2048, height: 1366, focus: '62% 30%' },
  { src: 'assets/images/profile.jpg', alt: 'ユニフォーム姿で立つ選手', caption: '練習場にて', width: 1365, height: 2048, focus: '50% 20%' },
  { src: 'assets/images/hero.jpg', alt: '試合中にボールを打つ選手', caption: '〇〇オープン', width: 2048, height: 1366, focus: '62% 30%' },
  { src: 'assets/images/profile.jpg', alt: 'ユニフォーム姿で立つ選手', caption: '〇〇クラブの練習', width: 1365, height: 2048, focus: '50% 20%' },
];

// youtubeId … https://www.youtube.com/watch?v=XXXX の XXXX の部分。空のあいだは「COMING SOON」と表示される
export const videos = [
  { youtubeId: '', title: '〇〇選手権大会 決勝ハイライト', date: '2026-08-24' },
  { youtubeId: '', title: '練習風景（多球練習）', date: '2026-06-10' },
];
