<template>
    <div>
        <div class="buttons">
            <btn size="small" @click="showGlobalMask()" style="float: left; margin-right: 5px;">show mask</btn>

            <div class="mask-demo">
                <btn size="small" @click="showMask($refs.innerMask)">show mask</btn>
                <vp-mask ref="innerMask" @click="closeMask($refs.innerMask)" style="position:absolute"></vp-mask>
            </div>

            <btn size="small" type="danger" @click="showAlert()" style="float: left">show alert</btn>
        </div>
    </div>
</template>
<script>
    import { Button } from 'vpui';
    import { Mask } from 'vpui';
    import { Alert } from 'vpui';
    export default {
        components: {
            btn: Button,
            vpMask: Mask,
            vpAlert: Alert,
        },
        methods: {
            showGlobalMask(){
                Mask.show({
                    click(){
                        this.destroy();
                    }
                });
            },
            showMask(mask){
                mask.open();
            },
            closeMask(mask){
                mask.close();
            },
            showAlert(){
                Alert("dfafsdfsdfsfsdfsdadfafsdfsdfdfsdfsfsdfsdadfafsdfsdfsfsdfsdadfafsdfsdfsfsdfsdadfafsdfsdfsfsdfsdadfafsdf",{
                    buttons: {
                        '确定':{
                            callback(){
                                alert('你点击了确定');
                            }
                        },
                        '取消':{
                            callback(){
                                this.close();
                            }
                        }
                    }
                }, );
            }
        }
    }
</script>
<style>
    .buttons{
        overflow: hidden;
        _zoom: 1; 
        padding: 10px 0 10px 0px;
        float: left;
    }

    .mask-demo{
        float: left;
        width: 400px; 
        height: 200px; 
        border: 1px #ccc solid; 
        position:relative; 
        padding: 5px;
        margin-right: 5px;
    }
</style>