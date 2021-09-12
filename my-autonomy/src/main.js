// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false;
// import axios from 'axios';
// Vue.use(axios);

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
import {bar_option,line_option} from '@/chart/echart_options'
Vue.prototype.$echartoptions={bar_option,line_option}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
