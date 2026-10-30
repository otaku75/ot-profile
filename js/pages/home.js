// トップページ。コンポーネントを登録してから、各コンポーネントにデータを渡す
import '../components/index.js';
import { profile, equipment } from '../data/profile.js';
import { results } from '../data/results.js';
import { news } from '../data/news.js';

const bind = (selector, data) => {
  document.querySelector(selector).data = data;
};

bind('#profile-facts', profile);
bind('#equipment-facts', equipment.map(({ slot, name }) => ({ label: slot, value: name })));
bind('#results-timeline', results);
bind('#news-list', news);
