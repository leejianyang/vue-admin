import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '.././layouts/BasicLayout'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BABEL_ENV,
  routes: [
    {
      path: '/',
      component: BasicLayout
    }
  ]
})

export default router
