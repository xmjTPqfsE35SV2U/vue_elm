<template>
    <div class="addShop">
        <tagLeft></tagLeft>
        <div class="content">
            <navTop :nav="nav"></navTop>
            <div class="add">
                <el-form ref="formData" :rules="rules" :model="formData" label-width="80px">
                    <el-form-item label="店铺名称" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address">
                        <el-input v-model="formData.address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model.number="formData.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺简介">
                        <el-input v-model="formData.despriction"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺标语">
                        <el-input v-model="formData.biaoyu"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺分类">
                        <el-cascader v-model="formData.classify" :options="options">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="店铺特点" class="dianpu">
                        <span>品牌保证<el-switch class="dianpu_switch" v-model="formData.is_premium"></el-switch></span>
                        <span>蜂鸟专送<el-switch class="dianpu_switch" v-model="formData.delivery_mode"></el-switch></span>
                        <span>新开店铺<el-switch class="dianpu_switch" v-model="formData.new"></el-switch></span>
                        <span>外卖保<el-switch class="dianpu_switch" v-model="formData.bao"></el-switch></span>
                        <span>准时达<el-switch class="dianpu_switch" v-model="formData.zhun"></el-switch></span>
                        <span>开发票<el-switch class="dianpu_switch" v-model="formData.piao"></el-switch></span>
                    </el-form-item>
                    <el-form-item label="配送费">
                       <el-input-number v-model="formData.num_p" :min="0" :max="20"></el-input-number>
                    </el-form-item>
                    <el-form-item label="起送价">
                       <el-input-number v-model="formData.num_s" :min="0" :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item label="起送价">
                        <el-col :span="8">
                            <!-- 最终发现，picker-options属性是Element UI中的，在Element Plus中这个属性已经弃用，所以不生效的。
                            而@vue/cli 4.5.13引入 Element Plus ，因此不能使用picker-options属性，需要改用，:disabled-date -->
                            <el-time-select placeholder="起始时间" :picker-options="optionsTime" v-model="formData.startDate" style="width: 100%;"></el-time-select>
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col :span="8">
                            <el-time-select placeholder="结束时间" v-model="formData.endDate" style="width: 100%;"></el-time-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="上传店铺头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl+'/v1/addimg/shop'"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess_dianpu"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="formData.image_dianpu" :src="formData.image_dianpu" class="avatar">
                            <!-- 样式无效 自定义bo样式 -->
                            <el-icon v-else class="bo avatar-uploader-icon">
                                <Plus></Plus>
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传营业执照">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl+'/v1/addimg/shop'"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess_yinye"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="formData.image_yinye" :src="formData.image_yinye" class="avatar">
                            <!-- 样式无效 自定义bo样式 -->
                            <el-icon v-else class="bo avatar-uploader-icon">
                                <Plus></Plus>
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传餐饮服务许可证">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl+'/v1/addimg/shop'"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess_canying"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="formData.image_canying" :src="formData.image_canying" class="avatar">
                            <!-- 样式无效 自定义bo样式 -->
                            <el-icon v-else class="bo avatar-uploader-icon">
                                <Plus></Plus>
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="优惠活动">
                        <el-select v-model="value_huodong" placeholder="满减优惠">
                            <el-option
                                v-for="item in options_huodong"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!--  -->
                    <el-form-item>
                        <el-table :data="activities" style="width: 100%">
                            <el-table-column label="活动标题" width="180">
                                <template #default="scope">
                                    <span style="margin-left: 10px">{{scope.row.icon_name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="活动名称" width="180">
                                <template #default="scope">
                                    <span style="margin-left: 10px">{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="活动详情" width="180">
                                <template #default="scope">
                                    <span style="margin-left: 10px">{{scope.row.description}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template #default="scope">
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="bt_submit" type="primary" @click="onSubmit(formData)">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--  -->
           
        </div>
    </div>
</template>
<script>
import tagLeft from '../components/tag_left'
import navTop from '../components/nav_top.vue'
// import { number } from 'echarts'
import { Plus } from '@element-plus/icons'
export default {
    data(){
        return{
            nav:["首页","添加数据","添加商铺"],
            // baseUrl: 域名地址
            // routerMode: 路由模式
            // baseImgPath: 图片存放地址
            baseUrl:'//elm.cangdu.org',
            baseImgPath:"https://elm.cangdu.org/img/",
            formData:{
                name:"",
                address:"",
                phone:"",
                despriction:"",
                biaoyu:"",
                classify:"",
                is_premium:"",
                delivery_mode:"",
                new:"",
                bao:"",
                zhun:"",
                piao:"",
                num_p:0,
                num_s:0,
                startDate:"",
                endDate:"",
                image_dianpu:"",
                image_yinye:"",
                image_canying:"",

            },
            rules: {
                name: [
                    { required: true, message: '请输入店铺名称', trigger: 'blur' }
                ],
                address:[
                    { required: true, message: '请输入详细地址', trigger: 'blur' }
                ],
                phone:[
                    { required: true, message: '请输入联系电话', trigger: 'blur' },
                    { type: 'number', message: '电话号码必须是数字',trigger: 'change'}
                ]

            },
            categoryDate:{},
            options:[],
            optionsTime:{
                start: '09:30',
                step: '00:15',
                end: '23:30'
            },
            options_huodong:[
                {
                    value: '满减优惠',
		          	label: '满减优惠'
                },
                {
                    value: '优惠大酬宾',
		          	label: '优惠大酬宾'
                },
                {
                    value: '新用户立减',
		          	label: '新用户立减'
                },
                {
                    value: '进店领券',
		          	label: '进店领券'
                },
            ],
            value_huodong:"",
            activities: [{
                icon_name: '减',
                name: '满减优惠',
                description: '满30减5，满60减8',
            }],

        }
    },
    methods:{
        getCategory(){
           let that = this
            this.axios.get("https://elm.cangdu.org/shopping/v2/restaurant/category").then(res=>{
                res.data.forEach(e => {
                    let temp={
                        label:e.name,
                        value:e.name,
                        children: [
                           
                        ]
                    }
                    e.sub_categories.forEach(res=>{
                        let temps={
                            label:res.name,
                            label:res.name
                        }
                        temp.children.push(temps)
                        // console.log(res)
                    })
                    that.options.push(temp)
                    // console.log(e)
                })

            })
        },
        handleAvatarSuccess_dianpu(res){
            if(res.status==1){
                this.formData.image_dianpu=this.baseImgPath+res.image_path
            }else{
                console.log("请求失败")
            }
        },
        handleAvatarSuccess_yinye(res){
            // console.log(res)
            if(res.status==1){
                this.formData.image_yinye=this.baseImgPath+res.image_path
            }else{
                console.log("请求失败")
            }
        },
        handleAvatarSuccess_canying(res){
            // console.log(res)
            if(res.status==1){
                this.formData.image_canying=this.baseImgPath+res.image_path
            }else{
                console.log("请求失败")
            }
        },
        beforeAvatarUpload(){
            console.log("1")
        },
        // 
        handleDelete(index,res){
            this.activities.splice(index,1)
        },
        onSubmit(res){
            this.axios.post(this.baseUrl+'/shopping/addShop',this.formData)
            // console.log(this.$refs.formData.validate)
            console.log(res)
        }
        
    },
    components:{
        tagLeft,
        navTop,
        Plus
    },
    created(){
        this.getCategory()
    }
}
</script>
<style scoped>
.addShop{
    height: 100%;
    width: 100%;
    display: flex;
}
.content{
    width: 100%;
    background-color: #FFFFFF;
}
.add{
    /* background-color: #324057; */
    padding: 20px;
}
.dianpu{
    color: black;
}
.dianpu span{
    margin-right: 20px;
}
.dianpu_switch{
    margin-left: 10px;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.bo:hover{
    border-color: #409eff;
}
.bo{
    /* border: #000000 dotted 1px; */
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.bt_submit{
    margin: 0 auto;
}
</style>