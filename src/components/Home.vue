<template>
  <el-container class="home-container" >
    <el-header>
      <div>
        <img src="../assets/heima.png" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="infor" @click="logout">注销</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px' ">
            <div class="toggle-button" @click="toggleCollage">|||</div>
            <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff"
            unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath">
              <el-submenu :index="item.id +'' " v-for="item in menulist" :key="item.id">
                  <template slot="title">
                    <i :class="iconsObj[item.id]"></i>
                    <span>{{item.authName}}</span>
                  </template>
                  <!--二级菜单  index会作为路由名称-->
                  <el-menu-item :index="'/'+sub.path " v-for="sub in item.children" :key="sub.id" @click="saveNavStatus('/'+sub.path)">
                    <template slot="title">
                      <i class="el-icon-menu"></i>
                      <span>{{sub.authName}}</span>
                    </template>
                  </el-menu-item>
              </el-submenu>
            </el-menu>
      </el-aside>
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default{
    data(){
      return{
        menulist:[],//左侧菜单数据
        iconsObj:{
          '125':'iconfont icon-user',
          '103':'iconfont icon-shangpin',
          '101':'iconfont icon-shangpin',
          '102':'iconfont icon-danju',
          '145':'iconfont icon-baobiao'
        },
        isCollapse:false,//不折叠
        activePath:''//被激活的连接地址
      }
    },
    created(){
      this.getMenuList();
      this.activePath=window.sessionStorage.getItem('activePath');
    },
    methods:{
      logout(){
        window.sessionStorage.clear();
        this.$router.push('/login')
      },
      async getMenuList() {
        //获取所有的菜单
        const {data:res}= await this.$http.get('menus')
        if(res.meta.status!==200) return this.$message.error(res.meta.msg)
        this.menulist=res.data
        console.log(res)
      },
      toggleCollage(){
        //展开按钮折叠菜单
        this.isCollapse=!this.isCollapse
      },
      saveNavStatus(activePath){
        //保持点击菜单的高亮路径
        window.sessionStorage.setItem('activePath',activePath);
        this.activePath=activePath;
      }
    }
  }
</script>

<style  lang="less" scoped="scoped">
    .el-header {
      background-color: #373D41;
      color: #fff;
      text-align: center;
      line-height: 60px;
      display: flex;
      padding-left: 0;
      justify-content: space-between;
      >div{
         display: flex;
         align-items: center;
         span{
           margin-left: 15px;
         }
      }
    }
    .el-footer {
      background-color: #373D41;
      color: #333;
      text-align: center;
      line-height: 60px;

    }
    .el-aside {
      background-color: #333744;
      color: #333;
      text-align: center;
      line-height: 200px;
      .el-menu{
        border-right: 0;
      }
    }

    // .el-main {
    //   background-color: #eaedf4;
    //   color: #333;
    //   text-align: center;
    //   line-height: 160px;
    // }

    .home-container{
      height: 100%;
    }
    .iconfont{
      margin-right: 10px;
    }
    .toggle-button{
      height: 24px;
      color: #fff;
      font-size: 10px;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0.2em;
      background-color: #4a5064;
      cursor: pointer;
    }
</style>
