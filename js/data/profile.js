// プロフィールまわりのデータ（トップページとプロフィールページで共有）
// TODO: ダミーデータ。実際の情報に差し替える（年や数値もダミー）

// 基本情報（tt-fact-list 用: { label, value }）
export const profile = [
  { label: '所属', value: '〇〇〇〇' },
  { label: '生年月日', value: '〇〇〇〇年〇月〇日' },
  { label: '出身地', value: '〇〇県' },
  { label: '戦型', value: '〇〇〇〇' },
];

// 能力値（tt-stat-list 用: { label, value }）。value は 0〜10 の自己評価
export const abilities = [
  { label: 'サーブ', value: 7 },
  { label: 'レシーブ', value: 5 },
  { label: 'フォアハンド', value: 8 },
  { label: 'バックハンド', value: 6 },
  { label: 'フットワーク', value: 5 },
  { label: 'メンタル', value: 6 },
];

// 使用用具（tt-equipment-list 用）。image に画像パスを入れると写真を表示する
// トップページの用具一覧（tt-fact-list）にも slot と name を使う
export const equipment = [
  {
    slot: 'ラケット',
    name: '〇〇〇〇',
    maker: '〇〇〇〇',
    comment: 'ここに使用感や選んだ理由などのコメントが入ります。',
  },
  {
    slot: 'ラバー（フォア）',
    name: '〇〇〇〇',
    maker: '〇〇〇〇',
    comment: 'ここに使用感や選んだ理由などのコメントが入ります。',
  },
  {
    slot: 'ラバー（バック）',
    name: '〇〇〇〇',
    maker: '〇〇〇〇',
    comment: 'ここに使用感や選んだ理由などのコメントが入ります。',
  },
];

// 卓球歴（tt-timeline 用）。date は 'YYYY-MM-DD' / 'YYYY-MM' / 'YYYY'
export const history = [
  { date: '2008-04', title: '卓球を始める', note: '〇〇クラブに入会' },
  { date: '2012', title: '〇〇中学校 卓球部に入部' },
  { date: '2014-08', title: '〇〇大会に初出場', note: '一般シングルス' },
  { date: '2018-04', title: '〇〇大学 卓球部に入部' },
  { date: '2024-06', title: '〇〇クラブに所属' },
  { date: '2026-08', title: '〇〇選手権大会で初優勝', note: '一般シングルス', highlight: true },
];
