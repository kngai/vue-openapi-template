import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/404.vue'

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
    component: () => import(/* webpackChunkName: "collection" */ '../views/Collection.vue')
  },
  {
    path: '/collections/:collectionId/queryables',
    name: 'Queryables',
    component: () => import(/* webpackChunkName: "items" */ '../views/Queryables.vue')
  },
  {
    path: '/collections/:collectionId/items',
    name: 'Items',
    component: () => import(/* webpackChunkName: "items" */ '../views/Items.vue')
  },
  {
    path: '/collections/:collectionId/items/:itemId',
    name: 'Item',
    component: () => import(/* webpackChunkName: "item" */ '../views/Item.vue')
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
  },
  {
    path: '/processes/:processId',
    name: 'Process',
    component: () => import(/* webpackChunkName: "processes" */ '../views/Process.vue')
  },
  {
    path: '/stac',
    name: 'Stac',
    component: () => import(/* webpackChunkName: "stac" */ '../views/Stac.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
