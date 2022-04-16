<template>
    <div class="nav_top">
        <el-breadcrumb separator="/">
        
            <el-breadcrumb-item v-for="(item,index) in nav" :key="index" @click="navTo(index)"><span class="nav_item">{{nav[index]}}</span></el-breadcrumb-item>
            <!-- <el-breadcrumb-item><span class="nav_item">promotion</span></el-breadcrumb-item>
            <el-breadcrumb-item><span class="nav_item">promotion</span></el-breadcrumb-item> -->
        </el-breadcrumb>
         <div>
            <div>123</div>
        </div>
    </div>
</template>
<script>
export default {
    props:["nav"],
    methods:{
        navTo(i){
            if(i==0){
                this.$router.push("/index")
            }
            // console.log(i)
        }
    }
}
</script>
<style>
.nav_top{
    padding: 0 20px;
    background-color: #555;
    /* width: 100%; */
    height: 60px;
    line-height: 60px;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
}
.nav_item{
    height: 60px;
    color: #FFFFFF;
    line-height: 60px;
}
</style>