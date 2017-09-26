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
                <btn size="small" type="danger" @click="showAlertAuoDestroy()" >alert</btn>
                
                <btn size="small" type="danger" @click="showAlertConfirm()" >confirm</btn>
                <btn size="small" type="danger" @click="showAlertConfirmDefault()" >defaultconfirm </btn>
                <btn size="small" type="danger" @click="showLoading(true)" >loading </btn>
                <btn size="small" type="danger" @click="showLoading(false)" >loading </btn>
                
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
                <vp-picker class="custom-picker" >base picker
                    <div slot="picker-content">
                        fdafasdfasdfaffffffffffff
                        fdsafd
                        fdsfs
                        fdsaf
                    </div>
                </vp-picker>
                <div class="picker-center-bottom">
                    <vp-picker class="custom-picker" :autoClose="false">base picker
                        <div slot="picker-content" style="height:250px;padding:10px;width: 150px;">
                            :autoClose="false"
                        </div>
                    </vp-picker>
                </div>
                <div class="picker-center-bottom" style="margin-right: 20px; height: 100px;border: 1px #ccc solid; padding-top: 20px; padding-left:20px; width:200px; float: left;">
                    <vp-picker class="custom-picker" >base picker
                        <div slot="picker-content">
                            hihi,hihi as leftf fdsfsd
                            fdsafsd
                            fdsafds fdsafds  fdsafds fdsafds  fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds fdsafds
                        </div>
                    </vp-picker>
                </div>
                <div class="picker-center-bottom" style="margin-right: 20px;overflow:hidden; height: 100px;border: 1px #ccc solid; padding-top: 20px; padding-left:20px; width:200px; float: left;">
                    <vp-picker class="custom-picker"  style="position:relative; bottom:-60px;">base picker
                        <div slot="picker-content">
                            hihi,hihi as left
                        </div>
                    </vp-picker>
                </div>
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
    import { Toast } from 'vpui';

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
            showAlertAuoDestroy(){
                Alert("dfafsdfsdfsfsdfsdadfafsdfsdf",{autoDestroy: true, showMask: false});
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
                //console.log(Overlay.manager.getOverlays());
                let overlays = Overlay.manager.getOverlays();
                //console.log(overlays);
                let centent = [];
                for(let key in overlays){
                    centent.push(key + ':' + overlays[key].type)
                }

                Alert(centent.join(' '));
            },

            showLoading(mask){
                Toast.loading('test',mask, 1500);
            }
        }
    }
</script>
<style>

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

    .custom-picker .vp-picker-overlay{
        width: auto;
    }
</style>