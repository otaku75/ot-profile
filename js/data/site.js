// サイト全体の共通情報。ヘッダー・フッターが参照する
// TODO: 選手名・SNSのURLを実際の値に差し替える

export const site = {
  name: {
    ja: '太田　輝',
    en: 'Hikaru Ota',
  },
  // 下層ページは 'profile.html'、トップページ内のセクションは './#results' のように書く
  nav: [
    { label: 'Profile', href: 'profile.html' },
    { label: 'Results', href: './#results' },
    { label: 'News', href: './#news' },
    { label: 'Contact', href: './#contact' },
  ],
  social: [
    { label: 'Instagram', url: '#' },
    { label: 'X', url: '#' },
    { label: 'YouTube', url: '#' },
  ],
};
