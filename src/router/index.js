import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/collections',
    name: 'Collections',
    // route level code-splitting
    // this generates a separate chunk (collections.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "collections" */ '../views/Collections.vue')
  },
  {
    path: '/collections/:collectionId',
    name: 'Collection',
    // route level code-splitting
    // this generates a separate chunk (collections.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "collections" */ '../views/Collection.vue')
  },
  {
    path: '/collections/:collectionId/items',
    name: 'Items',
    // route level code-splitting
    // this generates a separate chunk (collections.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "items" */ '../views/Items.vue')
  },
  {
    path: '/conformance',
    name: 'Conformance',
    component: () => import(/* webpackChunkName: "conformance" */ '../views/Conformance.vue')
  },
  {
    path: '/processes',
    name: 'Processes',
    component: () => import(/* webpackChunkName: "processes" */ '../views/Processes.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
