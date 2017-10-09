<template>
    <water-fall :source="source" :column="4">
        <item v-for="(item, index) in source" class="block-item" :key="index">
            <div class="block-item-inner" click="">
                {{ item.title }}
            </div>
            <div class="block-item-block">
                eifdafdasfsd<br/>
                <div v-html = "item.content"></div>
            </div>
        </item>
    </water-fall>
</template>
<script>
    import {WaterFall, WaterFallItem} from 'vpui';
    export default {
        data (){
            return {
                source:[
                    {title: 'ddss1', content: 'dddddddddddddddd <br/>efdasfdsf<br/> fdsfdsfsd <br/>fdsfsdfdsf fdsfsdafdsfdsjdsafdafd <br/> fsdafdsafsdfs efdasfdsf <br/>fdsfdsfsd fdsfsdfdsf fdsfsdafdsfdsjdsafdafd fsdafdsafsdf efdasfdsf fdsfdsfsd fdsfsdfdsf fdsfsdafdsfdsjdsafdafd fsdafdsafsdf dasdasdasdasfjdsfj  fdsfdsafsdfsj  fdsafsdafsdafds fdsfdsfdsfdsa fdsafdsafdasfsdfdasfsd fdsafdsafsdaf<br/>efdasfdsf<br/> fdsfdsfsd <br/>fdsfsdfdsf fdsfsdafdsfdsjdsafdafd <br/> fsdafdsafsdfs efdasfdsf <br/>fdsfdsfsd fdsfsdfdsf fdsfsdafdsfdsjdsafdafd fsdafdsafsdf efdasfdsf fdsfdsfsd fdsfsdfdsf fdsfsdafdsfdsjdsafdafd fsdafdsafsdf dasdasdasdasfjdsfj  fdsfdsafsdfsj  fdsafsdafsdafds fdsfdsfdsfdsa fdsafdsafdasfsdfdasfsd fdsafdsafsdaf'},
                    {title: 'ddss2', content: 'dddddddddddddddd<br/><br/>fdsfd<br/>'},
                    {title: 'ddss3', content: 'dddddddddddddddd<br/>ddd'},
                    {title: 'ddss4', content: 'dddddddddddddddd'},
                    {title: 'ddss5', content: 'dddddddddddddddd'},
                    {title: 'ddss6', content: 'dddddddddddddddd'},
                ]
            }
        },
        components:{
            waterFall: WaterFall,
            item: WaterFallItem
        }
    }
</script>
<style>
    .block-item{
        padding: 10px;
        background-color: #ccc;
        margin: 10px;
    }
</style>