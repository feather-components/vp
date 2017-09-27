<template>
    <water-fall :source="source">
        <item v-for="item in source" class="block-item">
            <div class="block-item-inner">
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
                    {title: 'ddss1', content: 'dddddddddddddddd <br/>efdasfdsf<br/> fdsfdsfsd <br/>fdsfsdfdsf fdsfsdafdsfdsjdsafdafd <br/> fsdafdsafsdfs efdasfdsf <br/>fdsfdsfsd fdsfsdfdsf fdsfsdafdsfdsjdsafdafd fsdafdsafsdf efdasfdsf fdsfdsfsd fdsfsdfdsf fdsfsdafdsfdsjdsafdafd fsdafdsafsdf dasdasdasdasfjdsfj  fdsfdsafsdfsj  fdsafsdafsdafds fdsfdsfdsfdsa fdsafdsafdasfsdfdasfsd fdsafdsafsdaf'},
                    {title: 'ddss2', content: 'dddddddddddddddd'},
                    {title: 'ddss3', content: 'dddddddddddddddd'},
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
    }
</style>