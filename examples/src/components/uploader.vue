<template>
    <div>
        <br>
        <upload text="选择文件" multiple fileType="audio/wav,image.jpg" url="./" :fileMaxSize="1000" :fileMaxNum="5" :showProgress="true" :showFileName="true" @complete="uploadComplete"></upload>
    </div>
</template>
<script>
    import { Uploader } from 'vpui';
    export default {
        methods:{
            uploadComplete(data){
                console.log(data);
            }
        },
        components: {
            upload: Uploader
        }
    }
</script>
<style scoped>
    
</style>