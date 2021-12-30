import { createRouter, createWebHistory } from 'vue-router'
import Stocks from '../views/Stocks.vue'
import StockInfo from '../views/StockInfo.vue'
import News from '../views/News.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Stocks
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/stock-info',
    name: 'Stock Info',
    component: StockInfo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "active fw-bold"
})

export default router
