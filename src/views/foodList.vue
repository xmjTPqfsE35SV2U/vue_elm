<template>
    <div class="foodList">
        <tagLeft></tagLeft>
        <div class="content">
            <navTop :nav="nav"></navTop>
            <div class="food">
                <el-table :data="tableData" :header-cell-style="{background:'#eef1f6'}">
                    <el-table-column type="expand">
                        <!-- Scoped slot 2.6被废除 -->
                        <template v-slot="props">
                            <el-form label-position="left" inline class="demo-table-expand" >
                                <el-form-item label="食品名称">
                                    <span>{{props.row.name}}</span>
                                </el-form-item>
                                <el-form-item label="餐馆名称">
                                    <!-- <span>{{}}</span> -->
                                </el-form-item>
                                <el-form-item label="食品 ID">
                                    <span>{{ props.row.item_id }}</span>
                                </el-form-item>
                                <el-form-item label="餐馆 ID">
                                    <span>{{ props.row.restaurant_id }}</span>
                                </el-form-item>
                                <el-form-item label="食品介绍">
                                    <span>{{ props.row.description }}</span>
                                </el-form-item>
                                <el-form-item label="餐馆地址">
                                    <!-- <span>{{ props.row.rating }}</span> -->
                                </el-form-item>
                                <el-form-item label="食品评分">
                                    <span>{{ props.row.rating }}</span>
                                </el-form-item>
                                <el-form-item label="食品分类">
                                    <!-- <span>{{ props.row.category }}</span> -->
                                </el-form-item>
                                <el-form-item label="月销量">
                                    <span>{{ props.row.month_sales }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="食品名称"
                        prop="name">
                    </el-table-column>
                    <el-table-column
                        label="食品介绍"
                        prop="description">
                    </el-table-column>
                    <el-table-column
                        label="评分"
                        prop="description">
                    </el-table-column>
                    <!--  -->
                    <el-table-column label="操作">
                        <template v-slot="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    components:{
        tagLeft,
        navTop
    },
    data(){
        return{
            tableData:[],
            count:0,
            nav:["首页","数据管理","食品列表"]
        }
    },
    methods:{
         getFoodList(){
            let that=this
            this.axios.get("https://elm.cangdu.org/shopping/v2/foods?offset=0&limit=20").then(res=>{
                that.tableData=res.data
            })
        },
        getFoodCount(){
            let that=this
            this.axios.get("https://elm.cangdu.org/shopping/v2/foods/count").then(res=>{
                that.count=res.data.count
            })
        },
        handleCurrentChange(e){
            let offset=20*(e-1)
            let that=this
            this.axios.get("https://elm.cangdu.org/shopping/v2/foods?offset="+offset+"&limit=20").then(res=>{
                that.tableData=res.data
                console.log(that.tableData)
            })
        }
    },
     created(){
        this.getFoodList()
        this.getFoodCount()
    },
}
</script>
<style scoped>
.food{
    padding: 20px;
}
.foodList{
    height: 100%;
    width: 100%;
    display: flex;
}
.content{
    width: 100%;
}
</style>