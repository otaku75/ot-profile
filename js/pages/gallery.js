// ギャラリーページ。コンポーネントを登録してから、各コンポーネントにデータを渡す
import '../components/index.js';
import { photos, videos } from '../data/gallery.js';

const bind = (selector, data) => {
  document.querySelector(selector).data = data;
};

bind('#photo-gallery', photos);
bind('#video-list', videos);
