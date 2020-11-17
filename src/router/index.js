import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '.././layouts/BasicLayout'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BABEL_ENV,
  routes: [
    {
      path: '/a',
      component: BasicLayout,
      meta: { icon: 'rest', title: 'A模块' }, /* 显示在导航菜单上的图标和名称 */
      // 大模块下的各个子页面
      children: [
        {
          path: '/a/a1',
          meta: { title: 'A模块1页面' },
          component: BasicLayout
        },
        {
          path: '/a/a2',
          meta: { title: 'A模块2页面' },
          component: BasicLayout
        }
      ]
    },
    {
      path: '/b',
      component: BasicLayout,
      meta: { icon: 'rocket', title: 'B模块' },
      children: [
        {
          path: '/b/b1',
          meta: { title: 'B模块1页面' },
          component: BasicLayout
        },
        {
          path: '/b/b2',
          meta: { title: 'B模块2页面' },
          component: BasicLayout
        }
      ]
    },
    {
      // 上面未定义的路由都跳转到这个页面
      path: '/',
      component: BasicLayout,
      meta: { icon: 'home', title: '默认模块' }
    },
    {
      path: '*',
      redirect: '/',
      hideInMenu: true /* 这个路由不显示在菜单栏 */
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
