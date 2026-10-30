// トップページ。コンポーネントを登録してから、各コンポーネントにデータを渡す
import '../components/index.js';
import { site } from '../data/site.js';
import { results } from '../data/results.js';
import { news } from '../data/news.js';
import { sponsors } from '../data/sponsors.js';

const bind = (selector, data) => {
  document.querySelector(selector).data = data;
};

// メニューの各項目に、最新の戦績・お知らせやスポンサー名をプレビューとして添える（空のものは説明文）
const [latestResult] = results.toSorted((a, b) => b.date.localeCompare(a.date));
const [latestNews] = news;
const previews = {
  results: latestResult && `最新: ${latestResult.title} ${latestResult.badge ?? ''}`,
  news: latestNews && `${latestNews.date.replaceAll('-', '.')} ${latestNews.title}`,
  sponsor: sponsors.map((sponsor) => sponsor.name).join('・'),
};

bind('#menu', site.nav.map((item) => ({ ...item, preview: previews[item.id] || item.description })));
