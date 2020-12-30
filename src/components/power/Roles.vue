<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

   <!-- 卡片视图 -->
   <el-card>
     <el-row>
       <el-col><el-button type="primary">添加角色</el-button></el-col>
     </el-row>
    <!-- 权限渲染 -->
    <el-table :data="rolesList" border stripe>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row :class="['bdbottom',i1===0?'bdtop':'','vcenter'] " v-for="(item1,i1) in scope.row.children" :key="item1.id">
            <el-col :span="5">
             <el-tag closable @close="removeRightById(scope.row,item1.id)">
                {{item1.authName}}
             </el-tag>
             <i class="el-icon-arrow-right"></i>
            </el-col><!-- 一级权限 -->
            <el-col :span="19" >
              <!-- 渲染二级权限 -->
               <el-row  :class="[i2===0?'bdtop':'','vcenter'] " v-for="(item2,i2) in item1.children" :key="item2.id">
                 <el-col :span="6">
                   <el-tag closable @close="removeRightById(scope.row,item2.id)" type="success">
                   {{item2.authName}}
                   </el-tag>
                   <i class="el-icon-arrow-right"></i>
                 </el-col>
                 <el-col :span="18">
                    <el-tag  v-for="(item3,i3) in item2.children" :key="item3.id" type="warning" closable @close="removeRightById(scope.row,item3.id)">
                      {{item3.authName}}
                    </el-tag>
                 </el-col>
               </el-row>
            </el-col><!-- 二三级权限 -->
          </el-row>
        </template>
      </el-table-column><!-- 展开列 -->
      <el-table-column type="index"></el-table-column><!-- 索引列 -->
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
              <el-button size="mini" type="primary">编辑</el-button>
              <el-button  size="mini"  type="danger">删除</el-button>
              <el-button  size="mini"  type="warning" @click="showEditRolesDialog(scope.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
   </el-card>

  <!-- 对话框 -->
   <el-dialog
     title="分配权限"
     :visible.sync="editRolesdialogVisible" @close="setRolesDialogClosed"
     width="50%"
     >
     <!-- 树形控件 -->
     <el-tree :data="rightList" :props="treeProps"
     show-checkbox node-key="id" default-expand-all
      :default-checked-keys="defKeys" ref="treeRef">

     </el-tree>
     <span slot="footer" class="dialog-footer">
       <el-button @click="editRolesdialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="allowRoles">确 定</el-button>
     </span>
   </el-dialog>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        rolesList:[],
        rightList:[],
        editRolesdialogVisible:false, //是否显示分配对话框
        treeProps: {
          children: 'children',
          label: 'authName'
        },
        defKeys:[],//默认选中的结点ID
        roleId:[]//即将分配权限的id
      }
    },
    created(){
      //创建时
      this.getRolesList();
    },
    methods:{
     async getRolesList(){
        const{data:res}= await this.$http.get('roles')
        if(res.meta.status!==200) return this.$message.error('获取用户列表失败')
        this.rolesList=res.data
        this.$message.success('获取用户列表成功')
      },
     async removeRightById(roles,rjid){
        //根据id删除用户
         //弹框,加了await，返回字符串
         const confirmResult=  await this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
                     confirmButtonText: '确定',
                     cancelButtonText: '取消',
                     type: 'warning'
           }).catch(err=>err)

          if(confirmResult!=='confirm'){
             return this.$message.info('已取消删除')
          }
           const {data:res}=await this.$http.delete(`roles/${roles.id}/rights/${rjid}`)
           if (res.meta.status !== 200) {
            return this.$message.error('取消权限失败')
           }
           this.$message.success('取消权限成功')
           roles.children=res.data //重新渲染当前数据
      },
     async showEditRolesDialog(role){
       this.roleId=role.id
        //显示分配对话框
        //获取所有权限数据
        const{data:res}=await this.$http.get('rights/tree')
        if(res.meta.status!==200) return this.$message.error('获取权限数据失败')
        this.rightList=res.data //获取到的权限数据
        this.getLeafKey(role,this.defKeys);//递归拿三级节点，渲染树形结构
        this.editRolesdialogVisible=true
      },
      getLeafKey(node,arr){
        //通过递归保存当前角色下的三级权限id，并保存在数组里。
        if(!node.children){//如果node不包含children属性，则是三级结点
          return arr.push(node.id)
        }
        node.children.forEach(item=>{
           this.getLeafKey(item,arr)
        })
      },
      setRolesDialogClosed(){
        //监听分配权限对话框的关闭事件
        this.defKeys=[] //置空
      },
      async allowRoles(){
        //分配权限
          const key=[
            //展开选中和半选中的id
            ...this.$refs.treeRef.getCheckedKeys(),
            ...this.$refs.treeRef.getHalfCheckedKeys()
          ]
          const idStr=key.join(',')
          const {data:res}=await this.$http.post(`roles/${this.roleId}/rights`,{rids:idStr})
          if(res.meta.status!==200) return this.$message.error('分配权限失败')
          this.getRolesList()//刷新列表
          this.editRolesdialogVisible=false
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-tag{
    margin: 7px;
  }
  .bdbottom{
    border-bottom: 1px solid #969896;
  }
  .bdtop{
    border-top: 1px solid #E9E9E9;
  }
  .vcenter{
    display: flex;
    align-items: center;
  }
</style>
