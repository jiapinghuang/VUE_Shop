<template>
  <div>
    <el-button type="infor" @click="logout">注销</el-button>
  </div>
</template>

<script>
  export default{
    methods:{
      logout:function(){
        window.sessionStorage.clear();
        this.$router.push('/login')
      }
    }
  }
</script>

<style  lang="less" scoped="scoped">
</style>
