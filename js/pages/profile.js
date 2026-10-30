// プロフィールページ。コンポーネントを登録してから、各コンポーネントにデータを渡す
import '../components/index.js';
import { profile, abilities, equipment, history } from '../data/profile.js';

const bind = (selector, data) => {
  document.querySelector(selector).data = data;
};

bind('#profile-facts', profile);
bind('#ability-stats', abilities);
bind('#equipment-list', equipment);
bind('#history-timeline', history);
