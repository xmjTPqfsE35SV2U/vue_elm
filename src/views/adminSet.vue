<template>
    <div class="adminSet">
        <tagLeft></tagLeft>
        <div class="content">
            <navTop :nav="nav"></navTop>
            <div class="admin">
                <p class="title">管理员信息</p>
                <div class="admin_data">
                    <p class="item">姓名：123</p>
                    <p class="item">注册时间：2017-12-02 23:45</p>
                    <p class="item">管理员权限：管理员</p>
                    <p class="item">管理员 ID：5</p>
                    
                    <div class="image_box">
                        <p>更换头像：</p>
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl+'/admin/update/avatar/5'"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon class="avatar-uploader-icon" v-else><Plus></Plus></el-icon>
                        </el-upload>
                    </div>
                </div>
            </div>
            <!--  -->
           
        </div>
    </div>
</template>
<script>
import tagLeft from '../components/tag_left'
import navTop from '../components/nav_top.vue'
import { Plus } from '@element-plus/icons'
export default {
    data(){
        return{
            baseUrl:'//elm.cangdu.org',
            baseImgPath:"https://elm.cangdu.org/img/",
            imageUrl:"",
            nav:["首页","设置","管理员设置"]
        }
    },
    methods:{
        beforeAvatarUpload(){

        },
        handleAvatarSuccess(res){
            if(res.status==1){
                this.imageUrl=this.baseImgPath+res.image_path
                res.image_path
            }else{
               console.log("上传失败") 
            }
            console.log(res)
        }
    },
    components:{
        tagLeft,
        navTop,
        Plus
    },
    created(){
        
    }
}
</script>
<style scoped>
.adminSet{
    height: 100%;
    width: 100%;
    display: flex;
}
.content{
    width: 100%;
    background-color: #FFFFFF;
    color: #000000;
}
.admin{
    /* background-color: #324057; */
    padding: 20px;
}
.title{
    font-size: 24px;
}
.item{
    text-align: left;
    padding: 20px;
}
.admin_data{
    text-align: left;
    margin: 0 165px;
    margin-top: 20px;
    background-color: #f9fafc;
}
.image_box{
    padding: 20px;
}
.image_box p{
    padding-bottom: 10px;
}
/*  */
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon:hover{
    border-color: #409eff;
}
.avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>