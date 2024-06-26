import monitor from '@imrobot/monitor'
import behavior from '@imrobot/monitor-behavior'
import error from '@imrobot/monitor-error'
import screen from '@imrobot/monitor-screen'

import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from './router'

monitor.use(behavior, {
  maxStackNum: 5
})
monitor.use(screen, {
  reportNum: 20
})
monitor.use(error)

createApp(App)
  .use(ElementPlus)
  .use(monitor, {
    baseURL: 'http://localhost:3000/api',
    appId: ''
  })
  .use(router)
  .mount('#app')
