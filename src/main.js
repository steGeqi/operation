import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App) //创建VUE对象
import ElementPlus from 'element-plus'
import router from './router'
import DataV from './core/use_datav.js'
import '../node_modules/element-plus/dist/index.css'
import * as echarts from 'echarts'
app.use(router)
    .use(ElementPlus)
    .use(DataV)
    .use(echarts)
    .mount('#app')
