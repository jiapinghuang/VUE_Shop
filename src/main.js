import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import "./assets/global.css" //引入全局样式
import "./assets/fonts/iconfont.css"
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

//axios请求拦截器，有token令牌才能调取
axios.interceptors.request.use(config=>{
 // console.log(config)
  config.headers.Authorization=window.sessionStorage.getItem('token');//处理令牌
  return config
})


// 配置请求的跟路径
Vue.prototype.$http=axios

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
