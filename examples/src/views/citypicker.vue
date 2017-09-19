<template>
    <div>
        <div style="padding-top:50px; margin-bottom: 70px; color: #333">
            CityPicker
        </div>
        <picker style="width: 100px;position:absolute; top: 300px;" :source="source"></picker>
    </div>
</template>
<script>
    import { CityPicker } from 'vpui';
    import source from './city.js';

    export default {
        data(){
            return {
                source: source
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