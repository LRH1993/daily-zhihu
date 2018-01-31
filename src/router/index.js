import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home'

Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
