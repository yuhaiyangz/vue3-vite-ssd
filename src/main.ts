// src/main.js
import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router/index'

export function createApp() {
  // 如果使用服务端渲染需要将createApp替换为createSSRApp方法
  const app = createSSRApp(App)
  // 路由（有就引入，Store也一样）
  const router = createRouter()
  app.use(router)
  // 将根实例以及路由暴露给调用者
  return { app, router } 
}
