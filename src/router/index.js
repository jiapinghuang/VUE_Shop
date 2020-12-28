import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
Vue.use(VueRouter)
const routes = [{
  path: '/login',
  component: Login
},
{
  path:'/',
  redirect:'/login'
},
{
  path:'/home',
  component:Home
}
]

const router = new VueRouter({
  routes
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/login') return next();//如果访问是登陆页面，直接放行
  //获取token
  const tokenStr=window.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');//如果没有登陆，强制返回登陆页面
  next();//有登陆，直接放行
})
export default router
