<template>
    <water-fall :source="source">
            
    </water-fall>
</template>
<script>
    import {WaterFall} from 'vpui';
    export default {
        data (){
            return {
                source:[
                    {title: 'ddss', content: 'dddddddddddddddd'},
                    {title: 'ddss', content: 'dddddddddddddddd'},
                    {title: 'ddss', content: 'dddddddddddddddd'},
                    {title: 'ddss', content: 'dddddddddddddddd'},
                    {title: 'ddss', content: 'dddddddddddddddd'},
                    {title: 'ddss', content: 'dddddddddddddddd'},
                ]
            }
        },
        components:{
            waterFall: WaterFall
        }
    }
</script>
<style>

</style>