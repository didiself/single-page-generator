import Vue from 'vue';
import App from './App';
import store from '../store';

import 'normalize.css';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  store,
  render: h => h(App)
});
