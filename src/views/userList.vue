<template>
    <div class="userList">
        <tagLeft></tagLeft>
        <div class="content">
            <navTop :nav="nav"></navTop>
            <div class="userInfo">
                <el-table :data="tableData" style="width: 100%" max-height="800px" :header-cell-style="{background:'#eef1f6'}">
                <el-table-column align="center"
                    type="index"
                    label="#"
                    width="150">
                </el-table-column>
                <el-table-column align="center"
                    prop="registe_time"
                    label="注册日期"
                    width="200">
                </el-table-column>
                <el-table-column align="center"
                    prop="username"
                    label="用户姓名"
                    width="200">
                </el-table-column>
                <el-table-column align="center"
                   
                    prop="city"
                    label="注册地址">
                </el-table-column>
                </el-table>

                <!--  -->
                <div class="block">
                    <el-config-provider>
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage1"
                        :page-size="20"
                        layout="total, prev, pager, next"
                        :total="count">
                        </el-pagination>
                    </el-config-provider>
                   
                </div>
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
            tableData:[],
            // pagenum:20,
            // offset:20,
            // limit:20,
            count:0,
            nav:["首页","添加数据","添加商品"]
        }
    },
    methods:{
        handleCurrentChange(e){
            let limit=0
            let offset=0
            limit=e*20
            offset =(e-1)*20
            console.log(e)
            console.log(limit)
            console.log(offset)
            this.axios.get('https://elm.cangdu.org/v1/users/list?offset='+offset+'&limit='+20).then(res=>{
                this.tableData=res.data
                console.log(res)
            })
       }
    },
    components:{
        tagLeft,
        navTop
    },
    created(){
        this.axios.get('https://elm.cangdu.org/v1/users/list?offset=0&limit=20').then(res=>{
            this.tableData=res.data
        }),
        this.axios.get('https://elm.cangdu.org/v1/users/count').then(res=>{
            this.count=res.data.count
        })
    }
}
</script>
<style scoped>
.userList{
    height: 100%;
    width: 100%;
    display: flex;
}
.content{
    width: 100%;
}
.userInfo{
    background-color: #324057;
    padding: 20px;
}
</style>