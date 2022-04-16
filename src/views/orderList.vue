<template>
    <div class="orderList">
        <tagLeft></tagLeft>
        <div class="content">
            <navTop :nav="nav"></navTop>
            <div class="order">
                <el-table :expand-row-keys="expands" :row-key="row => row.index" :data="tableData" :header-cell-style="{background:'#eef1f6'}" @expand-change="isShow">
                    <el-table-column type="expand">
                        <!-- Scoped slot 2.6被废除 -->
                        <template v-slot="props">
                            <el-form label-position="left" inline class="demo-table-expand" >
                                <el-form-item label="用户名">
                                    <span>{{props.row.name}}</span>
                                </el-form-item>
                                <el-form-item label=" 店铺名称">
                                    <span>{{props.row.restaurant_name}}</span>
                                </el-form-item>
                                <el-form-item label="收货地址">
                                    <span>{{ props.row.address }}</span>
                                </el-form-item>
                                <el-form-item label=" 店铺 ID">
                                    <span>{{ props.row.restaurant_id }}</span>
                                </el-form-item>
                                <el-form-item label="店铺地址">
                                    <span>{{ props.row.restaurant_address }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                     <el-table-column
                        label="订单 ID"
                        prop="id">
                    </el-table-column>
                    <el-table-column
                        label="总价格"
                        prop="total_amount">
                    </el-table-column>
                    <el-table-column
                        label="订单状态"
                        prop="status_bar.title">
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
    components:{
        tagLeft,
        navTop
    },
    methods:{
        getfn1(){
            return this.axios.get("https://elm.cangdu.org/v1/user/180")
        },
        getfn2(){
            return this.axios.get("https://elm.cangdu.org/shopping/restaurant/1")
        },
        getfn3(){
            return this.axios.get("https://elm.cangdu.org/v1/addresse/4643")
        },
        getOrderList(){
            let that=this
            this.axios.get("https://elm.cangdu.org/bos/orders?offset=0&limit=20").then(res=>{
                console.log(res)
                that.tableData=res.data
                 for(var i=0;i<20;i++){
                    this.tableData[i].index=i
                }
            })
        },
        getOrderCount(){
            let that=this
            this.axios.get("https://elm.cangdu.org/bos/orders/count").then(res=>{
                that.count=res.data.count
            })
        },
        handleCurrentChange(e){
            let offset=20*(e-1)
            let that=this
            this.axios.get("https://elm.cangdu.org/bos/orders?offset="+offset+"&limit=20").then(res=>{
                that.tableData=res.data
                for(var i=0;i<20;i++){
                    that.tableData[i].index=i
                }
                that.expands=[]
                // console.log
            })
        },
       
        isShow(row,expanded){
            // let flgs=[]
            this.flgs[row.index]=!this.flgs[row.index]
            console.log(row.index)
            if(this.flgs[row.index]){
                console.log(this.flgs[row.index])
                let that=this
                this.axios.all([this.getfn1(),this.getfn2(),this.getfn3()]).then(this.axios.spread((res1,res2,res3)=>{
                    let username=res1.data.username
                    let restaurant_address=res2.data.address
                    let address=res3.data.address
                    let a=[]
                    a.splice(0,0,{...row,restaurant_address: restaurant_address, address: address, user_name: username})
                    that.$nextTick(() => {
                        // dom元素更新后执行，因此这里能正确打印更改之后的值
                    })
                    that.tableData.splice(row.index,1,a[0])
                }))
                that.expands.push(row.index)
            }else{
                // 
                const index = this.expands.indexOf(row.index);
                this.expands.splice(index, 1)
            }
            
            
        }
    },      
    data(){
        return{
            tableData:[],
            count:0,
            expands:[],
            flgs:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
            nav:["首页","数据管理","订单列表"],
        }
    },
    created(){
        this.getOrderList()
        this.getOrderCount()
    }
}
</script>
<style scoped>
.order{
    padding: 20px;
}
.orderList{
    height: 100%;
    width: 100%;
    display: flex;
}
.content{
    width: 100%;
}
</style>