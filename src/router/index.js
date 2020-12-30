import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Wecome from '../components/wecome.vue'
import Users from '../components/user/User.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
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
  component:Home,
  redirect:'/wecome',//重定向到子路由
  //子路由，想嵌套在home页面里，就用孩子属性
  children:[
    {path:'/wecome',component:Wecome},
    {path:'/users',component:Users},
    {path:'/rights',component:Rights},
    {path:'/roles',component:Roles}
  ]
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
