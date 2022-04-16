<template>
  <div class="index">
    <tagLeft></tagLeft>
    <div class="content">
      <tagTop :nav='nav'></tagTop>
      <!--  -->
      <div class="data_num_box">
        <div class="data_sjtj">
          数据统计
        </div>
        <div class="data_sj">
          <div class="data_dr">
            <el-tag class="mx-1 tag_title" effect="dark" color="#ff9800">
              当日数据：
            </el-tag>
            <el-tag class="mx-1 tag_item" effect="dark" color="#e5e9f2">
              新增用户:{{userInfo_day}}
            </el-tag>
           <el-tag class="mx-1 tag_item" effect="dark" color="#e5e9f2">
              新增订单:{{order_day}}
            </el-tag>
            <el-tag class="mx-1 tag_item" effect="dark" color="#e5e9f2">
              新增管理员:{{admin_day}}
            </el-tag>
          </div>
          <div class="data_num">
            <el-tag class="mx-1 tag_title" effect="dark">
              总数据:
            </el-tag>
            <el-tag class="mx-1 tag_item" effect="dark" color="#e5e9f2">
              注册用户:{{userInfo_count}}
            </el-tag>
           <el-tag class="mx-1 tag_item" effect="dark" color="#e5e9f2">
              订单:{{order_count}}
            </el-tag>
            <el-tag class="mx-1 tag_item" effect="dark" color="#e5e9f2">
              管理员:{{admin_count}}
            </el-tag>
          </div>
        </div>
        <div class="data_echarts_box">
          <div id="data_e" class="data_echarts">
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import tagLeft from '../components/tag_left'
import tagTop from '../components/nav_top'

//
import * as echarts from "echarts"
// var a=0,
var times=[]
var userInfoList=new Array()
var orderList=new Array()
var adminList=new Array()
var option={}
export default {
  
  // name: 'Home',
  components: {
    tagLeft,
    tagTop
  },
  methods:{
    userInfo(res){
      return this.axios.get('https://elm.cangdu.org/statis/user/'+res+'/count')
    },
    orderInfo(res){
      return this.axios.get('https://elm.cangdu.org/statis/order/'+res+'/count')
    },
    adminInfo(res){
      return this.axios.get('https://elm.cangdu.org/statis/admin/'+res+'/count')
    },
    userCount(){
      return this.axios.get('https://elm.cangdu.org/v1/users/count')
    },
    orderCount(){
      return this.axios.get('https://elm.cangdu.org/v1/users/count')
    },
    adminCount(){
      return this.axios.get('https://elm.cangdu.org/v1/users/count')
    },
    //
    getUserInfo(){
      let that=this
      this.axios.all([this.userInfo(times[0]),this.userInfo(times[1]),this.userInfo(times[2]),this.userInfo(times[3]),this.userInfo(times[4]),this.userInfo(times[5]),this.userInfo(times[6])]
      ).then(
        that.axios.spread((res1,res2,res3,res4,res5,res6,res7)=>{
          userInfoList=[res1.data.count,res2.data.count,res3.data.count,res4.data.count,res5.data.count,res6.data.count,res7.data.count]
          // option.series[0].data=userInfoList
          that.userInfo_day=res7.data.count
        })
      )
    },
    //
    getOrderInfo(){
      let that=this
      this.axios.all([this.orderInfo(times[0]),this.orderInfo(times[1]),this.orderInfo(times[2]),this.orderInfo(times[3]),this.orderInfo(times[4]),this.orderInfo(times[5]),this.orderInfo(times[6])]
      ).then(
        that.axios.spread((res1,res2,res3,res4,res5,res6,res7)=>{
          orderList=[res1.data.count,res2.data.count,res3.data.count,res4.data.count,res5.data.count,res6.data.count,res7.data.count]
          // option.series[0].data=userInfoList
          that.order_day=res7.data.count
        })
      )
    },
    //
    async getAdminInfo(){
      let that=this
      await this.axios.all([this.adminInfo(times[0]),this.adminInfo(times[1]),this.adminInfo(times[2]),this.adminInfo(times[3]),this.adminInfo(times[4]),this.adminInfo(times[5]),this.adminInfo(times[6])]
      ).then(
        that.axios.spread((res1,res2,res3,res4,res5,res6,res7)=>{
          adminList=[res1.data.count,res2.data.count,res3.data.count,res4.data.count,res5.data.count,res6.data.count,res7.data.count]
          // option.series[0].data=userInfoList
          that.admin_day=res7.data.count
        })
      )
    },
    //
    getCount(){
      let that=this
      this.axios.all([this.userCount(),this.orderCount(),this.adminCount()]).then(that.axios.spread((res1,res2,res3)=>{
        that.userInfo_count=res1.data.count
        that.order_count=res2.data.count
        that.admin_count=res3.data.count
      }))
    },
    //
    async myChartInit(){
      option={
      title:{
        text: '走势图'
      },
      legend: {
        // data:['新注册用户', '新增订单', '新增管理员']
      },
      tooltip:{
        trigger:"axis",
        axisPointer:{
          type:'line',
          lineStyle:{
            type:'solid'
          }
        }
      },
      // legend:{
      //   type: ""
      // },
      xAxis: {   
        //type: category显示类目
        type: 'category',
        //是否让线条与坐标轴之间有缝隙
        boundaryGap: false,
        //x轴显示的相关数据
        data: times
        
      },
      yAxis:[
        {
          name:'用户',
          type: 'value',
          min: 0,
          max: 100,
          axisLine:{
            show:true
          }
        },
        {
          name:'订单',
          type: 'value',
          min: 0,
          max: 100,
          axisLine:{
            show:true
          }
        }
      ],
      toolbox:{  
        show:true, //是否显示工具栏组件
        feature:{
          magicType: {type: ['bar', 'line']},
          restore : { //配置项还原。
            show: true                     
            // title:"还原2",
          },
          dataZoom:{
            // xAxisIndex:0,
            yAxisIndex:false,  
          }
        }
      },
      series:[
        {
          name:'新注册用户',
          type:'line',
          data: [1,2,3],
          itemStyle:{
            normal:{
              label:{
                show:true
              }
            }
          }
        },
        {
          name:'新增订单',
          type:'line',
          data: [1,2,3]
        },
        {
          name:'新增管理员',
          type:'line',
          data: [1,2,3]
        }
      ]
    }
    await this.getUserInfo()
    await this.getOrderInfo()
    await this.getAdminInfo()
    option.series[0].data=userInfoList
    option.series[1].data=orderList
    option.series[2].data=adminList
    var myChart = echarts.init(document.getElementById('data_e'))
    myChart.setOption(option,true);
    }
  },
  data(){
    return{
      nav:["首页"],
      userInfo_day:0,
      order_day:0,
      admin_day:0,
      userInfo_count:0,
      order_count:0,
      admin_count:0,
    }
  },
  // 实例
  created(){
    for(let i=0;i<7;i++){
      let time = new Date((new Date()-86400000*(7-i)))
      times.push(time.getFullYear()+"-"+(time.getMonth()+1).toString().padStart(2,0)+"-"+time.getDate().toString().padStart(2,0));
    }
  },
  // 挂载
  mounted(){
    this.myChartInit()
    this.getCount()
  }
  
}
</script>
<style scoped>
.index{
  width: 100%;
  height: 100%;
  display: flex;
}
.content{
  width: 100%;
}
.data_num_box{
  background-color: #FFFFFF;
  color: #000000;
}
.data_sjtj{
  height: 40px;
  line-height: 40px;
  font-size: 30px;
}
.data_sj{
  padding: 10px 0;
}
.data_dr{
  display: flex;
}
.data_num{
  margin-top: 10px;
  display: flex;
}
.tag_title{
  border-style: none;
}
.tag_item{
 color:#000000;
 border-style:none;
 margin-left: 10px;
}
/*  */
.data_echarts{
  width: 600px;
  height: 400px;

}
.mx-1{
  width: 120px;
}
</style>
