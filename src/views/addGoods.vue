<template>
    <div class="addGoods">
        <tagLeft></tagLeft>
        <div class="content">
            <navTop :nav="nav"></navTop>
            <div class="add">
                <p>选择食品种类</p>
                <div class="head_from">
                    <el-form :model="formData" label-width="120px">
                        <el-form-item class="food_zhonglei" label="食品种类">
                            <!-- <el-select v-model="value" placeholder="Select">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled"/>
                            </el-select> -->
                            <el-input v-model="formData" />
                        </el-form-item>
                    <div v-show="isShow" class="show_food">
                        <el-form-item label="食品种类">
                            <el-input v-model="formData" />
                        </el-form-item>
                        <el-form-item label="种类描述">
                            <el-input v-model="formData" />
                        </el-form-item>
                        <el-form-item label="">
                            <el-button type="primary">Primary</el-button>
                        </el-form-item>
                    </div>
                    <div @click="show_food" class="add_food">
                        <el-icon ></el-icon>
                        <span>添加食品种类</span>
                    </div>
                    </el-form>
                </div>
                <p>添加食品</p>
                <div>
                    <el-form :model="formFoodData" :rules="formFoodData.rules_food" label-width="120px">
                        <el-form-item label="食品名称" prop="name">
                            <el-input v-model="formFoodData.name" />
                        </el-form-item>
                        <el-form-item label="食品活动">
                            <el-input v-model="formFoodData.huodong" />
                        </el-form-item>
                        <el-form-item label="食品详情">
                            <el-input v-model="formFoodData.xiangqing" />
                        </el-form-item>
                        <el-form-item label="上传食品图片">
                            <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="formFoodData.foodImg" :src="formFoodData.foodImg" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="食品特点">
                            <el-select v-model="options_value" placeholder="请选择">
                                <el-option
                                v-for="item in options_tedian"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="食品规格">
                            <el-radio-group v-model="radio" size="large" @change="change_guige">
                                <el-radio :label="1">单规格</el-radio>
                                <el-radio :label="2">多规格</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="包装费">
                                    <el-input-number v-model="formFoodData.num_bao" min=0 max=20 size="large" />
                                </el-form-item>
                                <el-form-item label="价格">
                                    <el-input-number v-model="formFoodData.num_price" min=0 max=100 size="large" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-show="isTable">
                            <el-col :span="24">
                                <el-table :data="formFoodData.tableData" style="width: 100%">
                                    <el-table-column label="规格" prop="food_gui" width="180"/>
                                    <el-table-column label="包装费" prop="food_bao" />
                                    <el-table-column label="价格" prop="food_price" />
                                    <el-table-column label="操作">
                                        <template v-slot="scope">
                                            <el-button type="danger" size="small"
                                                @click="handleDelete(scope.$index, scope.row)">
                                                Delete
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                        <!--  -->
                        <el-form-item>
                            <el-button type="primary" @click="submit_food">确认添加食品</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <!--  -->
           
        </div>
    </div>
</template>
<script>
import tagLeft from '../components/tag_left'
import navTop from '../components/nav_top.vue'
import { Plus } from '@element-plus/icons-vue'

export default {

    data(){
        return{
            nav:["首页","添加数据","添加商品"],
            radio:1,
            formData:"",
            isShow:false,
            isTable:false,
            formFoodData:{
                name:"",
                huodong:"",
                xiangqing:"",
                foodImg:"",
                rules_food:{
                    name:[
                        {
                            required: true,
                            message: '请输入食品名称食品活动',
                            trigger: 'blur',
                        }
                    ]
                },
                num_bao:0,
                num_price:20,
                tableData:[
                    {
                        food_gui:"默认",
                        food_bao:"0",
                        food_price:"20"
                    }
                ],
            },
            options_tedian:[
                {
                    value: 'xinpin',
                    label: '新品',
                    disabled:false,
                },
                {
                    value: 'zhaopai',
                    label: '招牌',
                    disabled:false,
                }
            ],
            options_value:""
        }
    },
    methods:{
        show_food(){
            this.isShow=!this.isShow
        },
        handleDelete(index,res){
            this.formFoodData.tableData.splice(index,1)
            // console.log(index)
        },
        change_guige(e){
            if(e==1){
                this.isTable=false
                console.log(e)
            }else{
                this.isTable=true
            }
        },
        submit_food(){
            this.axios.post("https://elm.cangdu.org/shopping/addfood",this.formFoodData)
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
.addGoods{
    height: 100%;
    width: 100%;
    display: flex;
}
.content{
    width: 100%;
    background-color: #FFFFFF;
    color: #000;
}
.head_from{
    border-radius: 6px;
    border: rgba(232,237,250,.6) solid 1px;
}
.head_from:hover{
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
    border-radius: 6px;
    transition: all 400ms;
}
.food_zhonglei{
    padding: 10px;
    padding-right: 30px;
    margin-bottom: 0px;
    border-bottom:rgba(232,237,250,.6) solid 1px;
}
.add{
    /* background-color: #324057; */
    padding: 20px;
}
.show_food{
    background-color: #f9fafc;
}
.add_food span{
    height: 42px;
    line-height: 42px;
}
.add_food:hover{
    background-color: #f9fafc;
    color: blue;
}
/*  */
.avatar-uploader .el-upload {
  /* border: 1px dashed #d9d9d9; */
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar-uploader-icon:hover{
border-color: blue;
}
</style>