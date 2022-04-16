import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import index from '../views/index.vue'
import userList from '../views/userList'
import shopList from '../views/shopList'
import orderList from '../views/orderList'
import foodList from '../views/foodList'
import adminList from '../views/adminList'
import addShop from '../views/addShop'
import addGoods from '../views/addGoods'
import visitor from '../views/visitor'
import vueEdit from '../views/vueEdit'
import adminSet from '../views/adminSet'
import explain from '../views/explain'

const routes = [
  {
    path: '/',
    // name: 'Home',
    component: Home
  },
  {
    path: '/index',
    // name: 'Home',
    component: index
  },
  {
    path: '/userList',
    // name: 'Home',
    component: userList
  },
  {
    path: '/shopList',
    // name: 'Home',
    component: shopList
  },
  {
    path: '/orderList',
    // name: 'Home',
    component: orderList
  },
  {
    path: '/foodList',
    // name: 'Home',
    component: foodList
  },
  {
    path: '/adminList',
    // name: 'Home',
    component: adminList
  },
  {
    path: '/addShop',
    // name: 'Home',
    component: addShop
  },
  {
    path: '/addGoods',
    // name: 'Home',
    component: addGoods
  },
  {
    path: '/visitor',
    // name: 'Home',
    component: visitor
  },
  {
    path: '/vueEdit',
    // name: 'Home',
    component: vueEdit
  },
  {
    path: '/adminSet',
    // name: 'Home',
    component: adminSet
  },
  {
    path: '/explain',
    // name: 'Home',
    component: explain
  }
  
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
