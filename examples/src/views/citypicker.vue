<template>
    <div>
        <div style="padding-top:50px; margin-bottom: 70px; color: #333">
            CityPicker
        </div>
        <picker style="width: 100px;position:absolute; top: 300px;" :source="source"><slot>全国单选</slot></picker>
        <picker style="width: 100px;position:absolute; top: 300px; left: 200px;" :source="multipleSource" :isMultiple="true"><slot>全国多选</slot></picker>
        
    </div>
</template>
<script>
    import { CityPicker } from 'vpui';
    import source from './city.js';

    export default {
        data(){
            return {
                source: Object.assign({}, source),
                multipleSource: Object.assign({}, source)
            }
        },
        components: {
            picker: CityPicker
        }
    }
</script>
<style scoped>
    .desc{
        margin-bottom: 54px;
        font-size: 14px;
    }
    
    .buttons-wrap-title{
        margin-bottom: 16px;
        font-size: 14px;
        color: #666;
    }

    .buttons-list button{
        margin-right: 30px;
    }

    .buttons-list{
        margin-bottom: 16px;
    }
</style>