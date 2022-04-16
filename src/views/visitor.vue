<template>
    <div class="visitor">
        <tagLeft></tagLeft>
        <div class="content">
            <navTop :nav="nav"></navTop>
            <div class="visitor_user">
                <div id="myEcharts"></div>

            </div>
            <!--  -->
           
        </div>
    </div>
</template>
<script>
import tagLeft from '../components/tag_left'
import navTop from '../components/nav_top.vue'
import * as echarts from 'echarts'
export default {
    data(){
        return{
            nav:["首页","图表","用户分布"],
            option:{
                title: {
                    text: '用户分布',
                    x:'center'
                },
                // 设置Echarts图例
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['北京','上海','深圳','杭州','其它'],
                    padding:[50,0,0,10]
                },
                series: [{
                    name: '销量',
                    type: 'pie',
                    data:[
                       
                    ]
                }]
            }
        }
    },
    methods:{
        async getCity(){
            let that=this
            await this.axios.get("https://elm.cangdu.org/v1/user/city/count").then(res=>{
                // console.log(res.data.user_city)
                let citys=res.data.user_city
                let temp=[
                    {
                        value:citys.beijing, name:'北京'
                    },
                    {
                        value:citys.shanghai, name:'上海'
                    },
                    {
                        value:citys.shenzhen, name:'深圳'
                    },
                    {
                        value:citys.hangzhou, name:'杭州'
                    },
                    {
                        value:citys.qita, name:'其它'
                    }
                    
                ]

                that.option.series[0].data=temp
                console.log(that.option.series[0])
            }) 
        },
        async init_e(){
            await this.getCity()
            var myEcharts = echarts.init(document.getElementById("myEcharts"))
            myEcharts.setOption(this.option,true)
            // console.log(myEcharts)
        }
        
    },
    components:{
        tagLeft,
        navTop
    },

    created(){
      
    },
    beforeMount(){
        this.init_e()
    },
    mounted(){
    }
}
</script>
<style scoped>
.visitor{
    height: 100%;
    width: 100%;
    display: flex;
}
.content{
    width: 100%;
    background-color: #FFFFFF;
}
.visitor_user{
    color: black;
    /* background-color: #324057; */
    padding: 20px;
}
#myEcharts{
    width: 700px;
    height: 500px;
}
</style>