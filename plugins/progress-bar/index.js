import ProgressBar from './progress-bar';

let progressBar = null;

// export default {
//   name: 'progress-bar',
//   directive: {
//     bind(el) {
//       progressBar = new ProgressBar(el);
//     },
//     unbind() {
//       progressBar.destroy();
//     },
//   },
// };

import Vue from 'vue'

Vue.directive('progress-bar', {
  bind: el => {
    progressBar = new ProgressBar(el);
  },
  unbind() {
    progressBar.destroy();
  },
})
