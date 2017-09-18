<template>
    <div>

        <div style="padding-top:50px; margin-bottom: 70px; color: #333">
            Overlay
        </div>
        <div class="wrap">
            <div class="wrap-title">
               overlay
            </div>
            <div class="buttons clear">
                <btn size="small" @click="showGlobalMask()">mask</btn>
                <btn size="small" @click="showMask($refs.innerMask)">mask</btn>
                <btn size="small" type="danger" @click="showAlert()" >alert</btn>
                <btn size="small" type="danger" @click="showAlertAuoClose()" >alert</btn>
                
                <btn size="small" type="danger" @click="showAlertConfirm()" >confirm</btn>
                <btn size="small" type="danger" @click="showAlertConfirmDefault()" >defaultconfirm </btn>
                <btn size="small" type="danger" @click="test()" >overManager </btn>
            </div>
            <div style="width: 200px;height: 200px; border: 1px #ccc solid;position: relative;">
                <vp-mask ref="innerMask" @click="closeMask($refs.innerMask)" style="position:absolute" :visibility="false"></vp-mask>
            </div>
        </div>
        <div class="wrap">
            <div class="wrap-title">
                picker
            </div>
            <div class="buttons clear">
                <!-- <vp-picker class="custom-picker"></vp-picker> -->
                <btn size="small" @click="" ref="cityPicker">cityPicker</btn>
                <btn size="small" @click="" ref="datePicker">datePicker</btn>
            </div>
        </div>
    </div>
</template>
<script>
    import { Button } from 'vpui';
    import { Mask } from 'vpui';
    import { Alert } from 'vpui';
    import { AutoPosition } from 'vpui';
    import { Picker } from 'vpui';
    import { Overlay} from 'vpui';

    export default {
        components: {
            btn: Button,
            vpMask: Mask,
            vpAlert: Alert,
            vpPicker: Picker,
        },

        directives: {
            autoposition: AutoPosition
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
                Alert("dfafsdfsdfsfsdfsdadfafsdfsdf");
            },
            showAlertAuoClose(){
                Alert("dfafsdfsdfsfsdfsdadfafsdfsdf",{autoDestroy: true});
            },
            showAlertConfirm(){
                Alert("dfafsdfsdfsfsdfsdadfafsdfsdfdfsdfsfsdfsdadfafsdfsdfsfsdfsdadfafsdfsdfsfsdfsdadfafsdfsdfsfsdfsdadfafsdf",
                    {
                        buttons: {
                            'ok': {
                                type: 'main',
                                click() {
                                    alert('main');
                                }
                            },
                            'cancel' : {
                                type: 'plain',
                                click() {
                                    this.destroy();
                                }
                            }
                        }
                    }
                );
            },

            showAlertConfirmDefault(){
                Alert.confirm('默认confirm',function(){
                    alert('confirm');
                }, true);
            },

            test(){
                if(Overlay.manager.getOverlays()[10]){
                    Overlay.manager.getOverlays()[10].destroy();
                }
                console.log(Overlay.manager.getOverlays());
            }
        }
    }
</script>
<style scoped>

    .buttons{
        padding: 10px 0 10px 0px;
    }

    .buttons button{
        margin-right: 5px;
        float: left;
    }

    .wrap{
        margin-bottom: 60px;
    }

    .mask-demo{
        width: 400px; 
        height: 200px; 
        position:relative; 
        padding: 5px;
        margin-right: 5px;

        top: 50px;
    }

    .wrap-title{
        font-size: 14px;
        color: #666;
    }

    .custom-picker{
        float: left;
        margin-right: 5px;
    }
</style>