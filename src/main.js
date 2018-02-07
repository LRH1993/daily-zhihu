// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'

Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
let indexScrollTop = 0;
let dom = document.querySelector('.app-view');
router.beforeEach((to, from, next) => {
  if (to.path == '/article') {
    dom = document.querySelector('.app-view');
    indexScrollTop = dom.scrollTop;
    store.commit('back');
  } else {
    store.commit('back', 1);
  }
  store.commit('toggle');
  next();
});
