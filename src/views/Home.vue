<template>
  <div class="home">
    <div class="login_title">
      elm后台管理系统
    </div>
    <div class="login_box">
      <el-form class="login_from" :model="form" label-width="120px">
          <!-- <el-form-item label="Activity name"> -->
          <el-input class="login_input" v-model="name" />
          <!-- </el-form-item> -->
          <el-input class="login_input" v-model="password" />
          <el-button class="login_bt" type="primary" @click="login">登陆</el-button>
        </el-form>
        <div class="login_ts">
          <p>温馨提示：</p>
          <p>未登录过的新用户，自动注册</p>
          <p>注册过的用户可凭账号密码登录</p>
        </div>
    </div>
    
  </div>

  
</template>

<script>
// @ is an alias to /src
import tagLeft from '../components/tag_left';
export default {
  // name: 'Home',
  components: {
    tagLeft
  },
  data(){
    return{
      name:"aaa",
      password:'123'
    }
  },
  methods:{
    login(){
      this.$router.push('/index')
    }
  }
}
</script>
<style scoped>
.login_box{
  width: 360px;
  margin: 0 auto;
  padding: 20px;
  background-color: #FFFFFF;
}
.login_title{
  /* width: 50%; */
  padding-top: 150px;
  padding-bottom: 50px;
  font-size: 34px;
  /* margin-top: 200px; */
}
.login_from{
  /* width: 400px; */
  
  background-color: #FFFFFF;
  height: 160px;
  text-align: center;
}
.login_bt{
  width: 100%;
  /* margin-top: 20px; */
}
.login_input{
  margin-bottom: 20px;
}
.login_ts{
  color: red;
  font-size: 12px;
}
</style>
