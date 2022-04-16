<template>
    <div class="explain">
        <tagLeft></tagLeft>
        <div class="content">
            <navTop :nav="nav"></navTop>
            <div class="explain_project">
                <p class="item">node-elm后台管理系统</p>
                <p class="item">第一次登录的用户自动注册成为普通管理员</p>
                <p class="item">普通管理员可以添加，修改信息</p>
                <p class="item">超级管理员可以删除信息</p>
            </div>
            <!--  -->
           
        </div>
    </div>
</template>
<script>
import tagLeft from '../components/tag_left'
import navTop from '../components/nav_top.vue'
export default {
    data(){
        return{
            nav:["首页","说明","说明"]
        }
    },
    methods:{
        
    },
    components:{
        tagLeft,
        navTop
    },
    created(){
        
    }
}
</script>
<style scoped>
.explain{
    height: 100%;
    width: 100%;
    display: flex;
}
.content{
    width: 100%;
    background-color: #FFFFFF;
}
.explain_project{
    /* background-color: #324057; */
    padding: 20px;
}
.item{
    margin-top: 20px;
    text-align: center;
    color: #333333;
    font-size: 20px;
}
</style>