import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home'
import theme from '../views/theme'
Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path:'/theme',
      component:theme,
      name:'theme'
    }
  ]
})
