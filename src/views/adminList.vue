<template>
    <div class="adminList">
        <tagLeft></tagLeft>
        <div class="content">
            <navTop :nav="nav"></navTop>
            <div class="admin">
                <el-table :data="tableData" :header-cell-style="{background:'#eef1f6'}">
                    <el-table-column
                        label="姓名"
                        prop="user_name">
                    </el-table-column>
                    <el-table-column
                        label="注册日期"
                        prop="create_time">
                    </el-table-column>
                    <el-table-column
                        label="地址"
                        prop="city">
                    </el-table-column>
                    <el-table-column
                        label="权限"
                        prop="admin">
                    </el-table-column>
                </el-table>
                <!--  -->
                <div class="block">
                    <span class="demonstration">显示总数</span>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage1"
                        :page-size="20"
                        layout="total, prev, pager, next"
                        :total="count">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import tagLeft from '../components/tag_left'
import navTop from '../components/nav_top.vue'
export default {
    data(){
        return{
            count:0,
            tableData:[],
            nav:["首页","数据管理","管理员列表"]
        }
    },
    components:{
        tagLeft,
        navTop
    },
    methods:{
         getAdminList(){
            let that=this
            this.axios.get("https://elm.cangdu.org/admin/all?offset=0&limit=20").then(res=>{
                that.tableData=res.data.data
                console.log(res.data.data)
                 
            })
        },
        getAdminCount(){
            let that=this
            this.axios.get("https://elm.cangdu.org/admin/count").then(res=>{
                // console.log(res)
                that.count=res.data.count
            })
        },
        handleCurrentChange(e){
            let offset=20*(e-1)
            let that=this
            this.axios.get("https://elm.cangdu.org/admin/all?offset="+offset+"&limit=20").then(res=>{
                that.tableData=res.data.data
            })
        },
    },
    created(){
        this.getAdminList()
        this.getAdminCount()
    }
}
</script>
<style scoped>
.admin{
    padding: 20px;
}
.adminList{
    height: 100%;
    width: 100%;
    display: flex;
}
.content{
    width: 100%;
}
</style>