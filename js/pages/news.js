// お知らせページ。コンポーネントを登録してから、各コンポーネントにデータを渡す
import '../components/index.js';
import { news } from '../data/news.js';

document.querySelector('#news-list').data = news;
