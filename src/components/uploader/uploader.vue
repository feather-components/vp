<template>
<span>
    <a href="javascript:;" class="file">{{text}}
        <input type="file" id="fileUpload" :multiple="multiple" :accept="fileType" @change="uploadFile">
    </a>
    <br>
    <vp-mask ref="innerMask"></vp-mask>
    <div class="progresslist" :class="progressType" v-if="showProgress&&showProgress2&&files.length>0">
        <p class="progresstitle"><a href="javascript:" @click="closeProgress">&#10005</a>上传进度</p>
        <div class="filelist">
            <div v-for="(item,index) in files" v-if="item.status==0" :key="index">
                <span v-if="showFileName">{{item.name}}<br></span>
                <progress-bar :scale="item.scale" :error="item.error" :type="progressType" @close="close(index)"></progress-bar>
                <br>
            </div>
        </div>
    </div>
</span>
</template>

<script>
    import ProgressBar from '../progressbar';
    import Mask from '../mask';
    export default{
        name: 'uploader',
        data(){
            return{
                files:[],
                showProgress2:true
            }
        },
        props: {
            text: {
                type: String,
                default:"上传文件"
            },
            multiple:{
                type: String
            },
            fileType:{
                type: String
            },
            url:{
                type: String,
                default:""
            },
            fileMaxSize:{
                type: Number,
                default:0
            },
            showProgress:{
                type: Boolean,
                default:false
            },
            showFileName:{
                type: Boolean,
                default:false
            },
            progressType:{
                type: String,
                default:""
            }
        },
        methods:{
            uploadFile(){
                var self = this;
                console.log(document.querySelector("#fileUpload").files);
                var oFiles = document.querySelector("#fileUpload").files;
                console.log(oFiles);
                if(oFiles.length>0){
                    self.$refs.innerMask.open();
                    self.showProgress2 = true;
                }
                //length = length+oFiles.length;
                for (let i = 0, file; file = oFiles[i]; i++) {
                    if(self.fileMaxSize>0&&file.size/1024>self.fileMaxSize*1024){
                        alert(`文件"${file.name}"大小超过了允许上传的最大尺寸${self.fileMaxSize}M,未被添加至上传队列`);
                        continue;
                    }
                    self.files.push({
                        name:file.name,
                        scale:0,
                        status:0,
                        error:false
                    });
                    var formData = new FormData();
                    formData.append(file.name, file);
                    if(self.url){
                        let filesLength = self.files.length;
                        let xhr = new XMLHttpRequest();
                        // xhr.onload = function() {
                        //     self.files.splice(l-1,1);
                        // }
                        xhr.onreadystatechange = function(){
                            if (xhr.readyState==4){
                                if(xhr.status == 200||xhr.status == 304){
                                    var data = {};
                                    try{
                                        data = JSON.parse(xhr.responseText);
                                    }
                                    catch(e){

                                    };
                                    self.files[filesLength-1].status = 1;
                                    let uploading = false;
                                    for(let i in self.files){
                                        if(self.files[i].status==0){
                                            uploading = true;
                                            break;
                                        }
                                    }
                                    if(!uploading){
                                        self.files = [];
                                        self.$refs.innerMask.close();
                                        self.$emit('complete',oFiles,data);
                                    }
                                    console.log("上传成功！");
                                }
                                else{
                                    self.files[filesLength-1].error = true;
                                    console.log("上传失败！");
                                }
                            }
                        }
                        // xhr.onload = uploadComplete; //请求完成
                        // xhr.onerror =  uploadFailed; //请求失败
                        xhr.upload.onprogress = function(event){
                            console.log(event);
                            if (event.lengthComputable) {
                                self.files[filesLength-1].scale = event.loaded / event.total*100;
                    　　　　}
                        };//【上传进度调用方法实现】
                        //xhr.upload.addEventListener("progress", uploadProgress, false); 
                        xhr.open("POST", self.url, true);

                        // 发送表单数据
                        xhr.send(formData);
                    }
                }
                //formData.append(oFiles[0].name, oFiles[0]);
                
                // setInterval(function(){
                //     self.scale++;
                // },200);
            },
            close(index){
                let self = this;
                self.files[index].status = 1;
                let uploading = false;
                for(let i in self.files){
                    if(self.files[i].status==0){
                        uploading = true;
                        break;
                    }
                }
                if(!uploading){
                    self.files = [];
                    self.$refs.innerMask.close();
                }
            },
            closeProgress(){
                let self = this;
                self.showProgress2 = false;
                self.$refs.innerMask.close();
            }
        },
        components: {
            progressBar:ProgressBar,
            vpMask:Mask
        }
    }
    function uploadProgress(event) {
　　　　if (event.lengthComputable) {
　　　　　　var percentComplete = event.loaded / event.total*100;
            console.log(percentComplete);
　　　　}
　　}
</script>

<style scoped>
    .file {
        position: relative;
        display: inline-block;
        background: #5986e1;
        border: 1px solid #5986e1;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        color: #fff;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }
    .file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }
    .file:hover {
        background: #2e67d9;
        border-color: #2e67d9;
        color: #fff;
        text-decoration: none;
    }
    .progresslist{
        margin-left: -195px;
        padding: 10px;
        width: 370px;
        position: fixed;
        z-index: 10001;
        left: 50%;
        top: 200px;
        background-color: #fff;
        box-shadow: 0px 0px  10px 5px #222;
    }
    .progresslist .filelist{
        max-height: 300px;
        overflow-y: scroll;
    }
    .progresstitle{
        margin-bottom: 10px;
        line-height: 24px;
        font-size: 16px;
    }
    .progresstitle a{
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 10px;
        font-size: 14px;
        color: #fff;
        background-color: #ccc;
        float: right;
        text-align: center;
    }
</style>