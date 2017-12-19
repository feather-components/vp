<template>
    <div>
        <picker style="width: 100px;position:absolute; top: 100px;" :source="sSource" :autoClose="false" @selected="selected"><slot></slot></picker>
        <picker style="width: 100px;position:absolute; top: 100px; left: 500px;" :source="mSource" :isMultiple="true" @selected="selected"><slot>全国多选</slot></picker>
        
    </div>
</template>
<script>
    import { CityPicker } from 'vpui';
    import source from './city.js';
    let mSource = Object.assign({}, source);
    delete mSource[1];
    export default {
        data(){
            return {
                sSource: source, // 真实场景中，sSource从接口获取
                mSource: JSON.parse(JSON.stringify(source))
            }
        },
        components: {
            picker: CityPicker
        },
        methods: {
            selected(obj) {
                console.log(`当前点击城市为：${obj.name}，id为：${obj.id}`)
            }
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