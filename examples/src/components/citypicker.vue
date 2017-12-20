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
                tempSource: source,
                sSource: {},
                mSource: {}
            }
        },
        components: {
            picker: CityPicker
        },
        methods: {
            // 转换为组件可用的json格式
            transSource() {
                let tempArr = [], tempObj = {};
                tempArr = Object.entries(this.tempSource);
                tempArr.forEach((item) => {
                    item[1].forEach((i) => {
                        tempObj[i.id] = {
                                name: i.zh,
                                word: item[0]
                            }
                    })
                })
                this.sSource = tempObj;
                this.mSource = JSON.parse(JSON.stringify(tempObj));
            },
            selected(obj) {
                console.log(`当前点击城市为：${obj.name}，id为：${obj.id}`)
            }
        },
        mounted() {
            this.transSource();
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