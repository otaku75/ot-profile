// 戦績ページ。コンポーネントを登録してから、各コンポーネントにデータを渡す
import '../components/index.js';
import { results } from '../data/results.js';

document.querySelector('#results-timeline').data = results;
