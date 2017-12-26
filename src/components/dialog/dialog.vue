<template>
    <div class="vp-overlay vp-dialog" position="center" v-show="visibility">
        <i class="vp-dialog-close-icon" @click="close"></i>
        <div class="vp-dialog-title">
            <div class="vp-dialog-title-text">
                <slot name="title">系统提示！</slot>
            </div>
        </div>
        <div class="vp-dialog-content-wrap">
            <div class="vp-dialog-content">
                <slot name="content"></slot>
            </div>
            <section class="vp-dialog-footer">
                <slot name="btns">
                    <btn type="main" class="vp-dialog-btn" @click="close">确认</btn>
                </slot>
            </section>
        </div>
    </div>
</template>

<script>
    import vpMask from '../mask';
    import Overlay from '../overlay';
    import Button from '../button';

    export default {
        name: 'dialog',
        mixins: [Overlay],
        components: {
            btn: Button
        },
        props: {
            showMask: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {

            }
        },
        methods: {},
        watch: {
            visibility(val){
                let body = document.getElementsByTagName('body')[0];
                if(val){
                    if(this.mask){
                        this.mask.show();
                        return;
                    }
                    this.mask = vpMask.show();
                    body.appendChild(this.$el);
                }else{
                    if(this.mask){
                        this.mask.hide();
                    }
                }
            }
        },
        mounted(){
            //Overlay.manager.addOverlay(this, Overlay.manager.types.alert);
        },

        destroyed(){
            if(this.mask){
                this.mask.destroy();
            }
            //Overlay.manager.deleteOverlay(this);
        }
    }
</script>

<style>
    .vp-dialog.vp-overlay{
        max-height: 100%;
        overflow-y: scroll;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        margin: auto;
        background: #fff;
        border-radius: 4px;
        min-width: 420px;
        min-height: 180px;
        padding: 24px;
        color: #333;
        box-shadow: 0 8px 8px 0;
        z-index: 10001;
    }
    .vp-dialog-close-icon{
        position: absolute;
        top: 10px;
        right: 10px;
        display: block;
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    .vp-dialog-close-icon::before,
    .vp-dialog-close-icon::after{
        position: absolute;
        top: 12px;
        right: 2px;
        display: block;
        content: '';
        height: 0;
        width: 20px;
        border-top: 2px solid #999;
    }

    .vp-dialog-close-icon::before{
        -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
    }

    .vp-dialog-close-icon::after{
        -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
    }

    .vp-dialog-title{
        margin-bottom: 12px;
    }

    .vp-dialog-title-text{
        font-size: 16px;
    }

    .vp-dialog-content{
        color: #3B4263;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 28px;
        text-align: center;
        word-wrap: break-word;
        text-align: left;
        min-height: 57px;
    }

    .vp-dialog-content-wrap{
        position: relative;
        padding-bottom: 42px;
    }

    .vp-dialog-extras{
        margin-top: 8px;
        margin-bottom: 16px;
        color: #555;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
    }

    .vp-dialog-footer{
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 100%;
        text-align: right;
        box-sizing: border-box;
    }

    .vp-dialog-btn{
        display: inline-block;
        margin-right: 16px;
    }

    .vp-dialog-btn:last-child{
        margin-right: 0px;
    }

    .vp-dialog .vp-button{
        
        width: 90%;
        margin: 0px 4px 4px 4px;
    }

    .vp-dialog .vp-dialog-cbtn{
        width: 45%;
    }
</style>