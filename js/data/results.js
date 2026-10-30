// 戦績（tt-timeline 用）。並び順は自由（表示時に日付の新しい順へ並べ替える）
// date  … 'YYYY-MM-DD'。日がわからない場合は 'YYYY-MM' でもよい
// title … 大会名 / note … 種目 / badge … 結果
// highlight: true で結果を金色で強調表示
// TODO: ダミーデータ。実際の戦績に差し替える

export const results = [
  { date: '2026-08-24', title: '〇〇選手権大会', note: '一般シングルス', badge: '優勝', highlight: true },
  { date: '2026-05-03', title: '〇〇オープン', note: '一般シングルス', badge: 'ベスト4' },
  { date: '2025-11-16', title: '〇〇リーグ', note: '団体', badge: '準優勝', highlight: true },
  { date: '2025-06', title: '〇〇大会', note: 'ダブルス', badge: 'ベスト8' },
  { date: '2024-09-22', title: '〇〇選手権大会', note: '一般シングルス', badge: 'ベスト16' },
];
