<template>
    <div class="shopList">
        <tagLeft></tagLeft>
        <div class="content">
            <navTop :nav="nav"></navTop>
            <div class="shop">
                <el-table :data="tableData" :header-cell-style="{background:'#eef1f6'}">
                    <el-table-column type="expand">
                        <!-- Scoped slot 2.6被废除 -->
                        <template v-slot="props">
                            <el-form label-position="left" inline class="demo-table-expand" >
                                <el-form-item label="店铺名称">
                                    <span>{{props.row.name}}</span>
                                </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="店铺介绍">
                                <span>{{ props.row.description }}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{ props.row.phone }}</span>
                            </el-form-item>
                            <el-form-item label=" 评分">
                                <span>{{ props.row.rating }}</span>
                            </el-form-item>
                            <el-form-item label="销售量">
                                <span>{{ props.row.recent_order_num }}</span>
                            </el-form-item>
                            <el-form-item label="分类">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="店铺名称"
                        prop="name">
                    </el-table-column>
                    <el-table-column
                        label="店铺地址"
                        prop="address">
                    </el-table-column>
                    <el-table-column
                        label="店铺介绍"
                        prop="description">
                    </el-table-column>
                    <!--  -->
                    <el-table-column label="操作">
                        <template v-slot="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">添加商品</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        label="操作"
                        prop="desc">
                    </el-table-column> -->
                </el-table>
                <!--  -->
                <div class="block">
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
    methods:{
        getShopList(){
            let that=this
            this.axios.get("https://elm.cangdu.org/shopping/restaurants?latitude=22.54286&longitude=114.059563&offset=0&limit=20").then(res=>{
                that.tableData=res.data
            })
        },
        getShopCount(){
            let that=this
            this.axios.get("https://elm.cangdu.org/shopping/restaurants/count").then(res=>{
                that.count=res.data.count
            })
        },
        handleCurrentChange(e){
            let offset=20*(e-1)
            let that=this
            this.axios.get("https://elm.cangdu.org/shopping/restaurants?latitude=22.54286&longitude=114.059563&offset=+"+offset+"&limit=20").then(res=>{
                that.tableData=res.data
            })
        },
        handleEdit(index,row){
            console.log(index)
            console.log(row)
        }
    },
    data(){
        return{
            nav:["首页","数据管理","商家列表"],
            tableData:[],
            count:0
        }
    },
    created(){
        this.getShopList()
        this.getShopCount()
    },
    components:{
        tagLeft,
        navTop
    }
}
</script>
<style scoped>
.shop{
    padding: 20px;
}
.shopList{
    height: 100%;
    width: 100%;
    display: flex;
}
.content{
    width: 100%;
}
.a{
    background-color: aquamarine;
}
.block{
    color: #000000;
}
</style>