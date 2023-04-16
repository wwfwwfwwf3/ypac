//src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import  CKEditor  from '@ckeditor/ckeditor5-vue';
import router from './router';


const app = createApp(App)
app.use(ElementPlus)
app.use(CKEditor)
app.use(router)
app.mount('#app')
