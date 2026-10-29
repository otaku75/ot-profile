// 戦績（tt-result-list 用）。並び順は自由（表示時に日付の新しい順へ並べ替える）
// date は 'YYYY-MM-DD'。日がわからない場合は 'YYYY-MM' でもよい
// highlight: true で結果を強調表示
// TODO: ダミーデータ。実際の戦績に差し替える

export const results = [
  { date: '2026-08-24', tournament: '〇〇選手権大会', event: '一般シングルス', result: '優勝', highlight: true },
  { date: '2026-05-03', tournament: '〇〇オープン', event: '一般シングルス', result: 'ベスト4' },
  { date: '2025-11-16', tournament: '〇〇リーグ', event: '団体', result: '準優勝', highlight: true },
  { date: '2025-06', tournament: '〇〇大会', event: 'ダブルス', result: 'ベスト8' },
  { date: '2024-09-22', tournament: '〇〇選手権大会', event: '一般シングルス', result: 'ベスト16' },
];
