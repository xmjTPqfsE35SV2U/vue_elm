<template>
    <div class="vueEdit">
        <tagLeft></tagLeft>
        <div class="content">
            <navTop :nav="nav"></navTop>
            <div class="edit">
                <quillE-editor v-model="value" class="ql-editor" ref="myQuillEditor" :options="editorOption">
123456
                </quillE-editor>
            </div>
            <!--  -->
           
        </div>
    </div>
</template>
<script>
import tagLeft from '../components/tag_left'
import navTop from '../components/nav_top.vue'
import "quill/dist/quill.core.css"
// import ''
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
// import quillEditor from 'vue-quill-editor'
export default {
    data(){
        return{
            nav:["首页","编辑","文本编辑"],
            editorOption:{
                theme:'snow' ,
                placeholder: 'Compose an epic...',
            },
            value:""
        }
    },
    methods:{
        
    },
    components:{
        tagLeft,
        navTop,
        quillEditor
    },
    mounted(){
        // this.$refs.myQuillEditor.
    },
    created(){
        
    }
}
</script>
<style scoped>
.vueEdit{
    height: 100%;
    width: 100%;
    display: flex;
}
.content{
    width: 100%;
    color: black;
    background-color: #FFFFFF;
}
.edit{
    /* background-color: #324057; */
    padding: 20px;
}
.ql-editor{
    width: 200px;
    height: 350px;
}
</style>