<template>
   <div class="login_container">
     <div class="login_box">
        <div class="avatar_box">
          <img src="../assets/logo.png"/>
        </div>
        <!--表单登陆模块-->
        <el-form class="login_form" :model="loginForm" :rules="loginRules" ref="loginFormRef">
          <el-form-item  prop="username">
            <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password">
            </el-input>
          </el-form-item>

          <el-form-item class="btns">
            <el-button type="primary" @click="login">登陆</el-button>
            <el-button type="infor" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
        <!--表单登陆模块-->
     </div>
   </div>
</template>

<script type="text/javascript">
  export default{
    data() {
          return {
            //数据绑定到loginForm数据对象的属性中
            loginForm: {
              username:'admin',
              password:'123456'
            },
            //表单验证规则
            loginRules:{
                username:[
                  { required: true, message: '请输入名称', trigger: 'blur' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                  { required: true, message: '请输入密码', trigger: 'blur' },
                  { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ]
            }
          }
    }
    ,
    methods:{
      resetLoginForm:function(){
      //重置表单
        this.$refs.loginFormRef.resetFields();
      },
      login:function(){
        //表单预验证
        this.$refs.loginFormRef.validate(async valid=>{
          if(!valid) return;//则为false
            const {data:res}= await this.$http.post("login",this.loginForm)
           if(res.meta.status!==200) return this.$message.error('登陆失败')
           this.$message.success('登陆成功')
           window.sessionStorage.setItem("token",res.data.token);//保持登陆凭证
           this.$router.push('/home');//页面跳转
        });
      }

    }
}
</script>

<style lang="less" scoped="scoped">
  .login_container{
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    // margin-left:-225px ;  方法1
    // margin-top:-150px ;
    transform: translate(-50%,-50%);
    top: 50%;
  }
  .avatar_box{
    width: 130px;
    height: 130px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px cadetblue;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .btns{
    display: flex;
    justify-content: center;
  }
  .login_form{
    position: absolute;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
    bottom: 0;
  }
</style>
