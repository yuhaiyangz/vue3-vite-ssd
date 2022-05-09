import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('./../views/ssd/*.vue')
console.log(pages);
const routesSSD:Array<RouteRecordRaw> = Object.keys(pages).map((path:any) => {
  const name = path.match(/\.\/views\/ssd(.*)\.vue$/)[1].toLowerCase()
  return {
    path: name === '/home'?'/':name,
    component: pages[path] // () => import('./pages/*.vue')
  }
})
console.log(routesSSD);
const routesNotSSD:Array<RouteRecordRaw> = [//不做ssd的页面
  {
    path: '/test',
    name: 'test',
    meta:{
      title:'测试',
      keepAlive:true
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/test.vue')
  },
]
const routes:Array<RouteRecordRaw> = routesSSD.concat(routesNotSSD)
export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
