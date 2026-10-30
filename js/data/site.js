// サイト全体の共通情報。ヘッダー・フッターが参照する
// TODO: 選手名・SNSのURLを実際の値に差し替える

export const site = {
  name: {
    ja: '太田　輝',
    en: 'Hikaru Ota',
  },
  // ヘッダーのナビと、トップページのメニュー（tt-menu）の両方で使う
  // id … トップページで最新情報のプレビューを差し込むときの目印
  // description … メニューに表示する説明（最新情報のプレビューがない項目に使う）
  nav: [
    { id: 'profile', label: 'Profile', ja: 'プロフィール', href: 'profile.html', description: '能力値・そうび・卓球歴' },
    { id: 'results', label: 'Results', ja: '戦績', href: 'results.html', description: 'これまでの戦績' },
    { id: 'gallery', label: 'Gallery', ja: 'ギャラリー', href: 'gallery.html', description: '試合や練習の写真・動画' },
    { id: 'news', label: 'News', ja: 'お知らせ', href: 'news.html', description: 'お知らせ・試合予定' },
    { id: 'sponsor', label: 'Sponsor', ja: 'スポンサー', href: 'sponsor.html', description: '活動を支えてくださっている企業' },
    { id: 'contact', label: 'Contact', ja: 'お問い合わせ', href: 'contact.html', description: '取材・出演のご相談はこちら' },
  ],
  social: [
    { label: 'Instagram', url: '#' },
    { label: 'X', url: '#' },
    { label: 'YouTube', url: '#' },
  ],
};
