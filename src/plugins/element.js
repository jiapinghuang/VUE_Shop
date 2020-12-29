import Vue from 'vue'
import {
  Button,Form,FormItem,Input,Message,Container,Header,Aside,Main,
  Menu,MenuItemGroup,Submenu,MenuItem,Breadcrumb,BreadcrumbItem,Card,
  Row,Col,TableColumn,Table,Switch,Tooltip,Pagination,Dialog,MessageBox
}
from 'element-ui'//按需要导入

//注册全局可用组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(MenuItem)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Card)

Vue.use(Row)
Vue.use(Col)

Vue.use(TableColumn)
Vue.use(Table)

Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)

Vue.use(Dialog)

//全局挂载，在页面中使用this.$confirm可使用
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm
