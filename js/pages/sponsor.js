// スポンサーページ。コンポーネントを登録してから、各コンポーネントにデータを渡す
import '../components/index.js';
import { sponsors } from '../data/sponsors.js';

document.querySelector('#sponsor-list').data = sponsors;
