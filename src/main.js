import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import 'normalize.css';
import 'element-ui/lib/theme-default/index.css';
import { Row, Col, Form, FormItem, Input, Switch, Checkbox, CheckboxGroup, Button } from 'element-ui';

// console.log(...[Row, Col, Form, FormItem, Input, Switch, Checkbox, CheckboxGroup])
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Switch);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Button);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
