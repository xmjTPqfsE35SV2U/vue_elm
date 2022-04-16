<template>
  <div class="tag_left">
    <el-col :span="12" class="tag_col">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo tag_col"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item @click="goIndex()">
          <el-icon><Menu></Menu></el-icon>首页
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <!-- vue3 class="el-icon-search"无效 可以安装@element-plus/icons-vue 使用如下方式 --> 
            <el-icon><Document></Document></el-icon>
            <span>数据管理</span>
          </template>
          <el-menu-item index="1-1" @click="goUserList()">用户列表</el-menu-item>
          <el-menu-item index="1-2" @click="goShopList()">商家列表</el-menu-item>
          <el-menu-item index="1-3" @click="goFoodList()">食品列表</el-menu-item>
          <el-menu-item index="1-4" @click="goOrderList()">订单列表</el-menu-item>
          <el-menu-item index="1-5" @click="goAdminList()">管理员列表</el-menu-item>
        </el-sub-menu>
        <!--  -->
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Plus></Plus></el-icon>
            <span>添加数据</span>
          </template>
          <el-menu-item index="2-1" @click="goAddShop()">添加商铺</el-menu-item>
          <el-menu-item index="2-2" @click="goAddGoods()">添加商品</el-menu-item>
        </el-sub-menu>
        <!--  -->
        <el-sub-menu index="3">
          <template #title>
            <el-icon><StarFilled></StarFilled></el-icon>
            <span>图表</span>
          </template>
          <el-menu-item index="3-1" @click="goUserVisitor()">用户分布</el-menu-item>
        </el-sub-menu>
        <!--  -->
        <el-sub-menu index="4">
          <template #title>
            <el-icon><Edit></Edit></el-icon>
            <span>编辑</span>
          </template>
          <el-menu-item index="4-1" @click="goVueEdit()">编辑</el-menu-item>
        </el-sub-menu>
        <!--  -->
        <el-sub-menu index="5">
          <template #title>
            <el-icon><Tools></Tools></el-icon>
            <span>设置</span>
          </template>
          <el-menu-item index="5-1" @click="goAdminSet()">管理员设置</el-menu-item>
        </el-sub-menu>
         <!--  -->
        <el-sub-menu index="6">
          <template #title>
            <el-icon><WarningFilled></WarningFilled></el-icon>
            <span>说明</span>
          </template>
          <el-menu-item index="6-1" @click="goExplain()">说明</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </div>
</template>
<style scoped>
.tag_left{
  height: 100%;
  /* width: 100%; */
}
.tag_col{
  height: 100%;
  width: 200px;
}
</style>
<script>
import {Location,Menu,Plus,Document,StarFilled,Tools,WarningFilled,Edit} from '@element-plus/icons'
export default {
  components:{
    Location,
    Menu,
    Plus,
    Document,
    StarFilled,
    Tools,
    WarningFilled,
    Edit
  },
  methods:{
    handleOpen(){
      console.log("123")
    },
    goIndex(){
      this.$router.push('/index')
    },
    goUserList(){
      this.$router.push('/userList')
    },
    goShopList(){
       this.$router.push('/shopList')
    },
    goOrderList(){
       this.$router.push('/orderList')
    },
    goAdminList(){
       this.$router.push('/adminList')
    },
    goFoodList(){
       this.$router.push('/foodList')
    },
    goAddShop(){
       this.$router.push('/addShop')
    },
    goAddGoods(){
       this.$router.push('/addGoods')
    },
    goUserVisitor(){
      this.$router.push('/visitor')
    },
    goVueEdit(){
      this.$router.push('/vueEdit')
    },
    goAdminSet(){
      this.$router.push('/adminSet')
    },
    goExplain(){
      this.$router.push('/explain')
    }
  }
}
</script>