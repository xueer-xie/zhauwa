import Vue from 'vue'
import Router from 'vue-router'
import VueTree from '@/components/VueTree/tree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'vue-tree',
      component: VueTree
    }
  ]
})
