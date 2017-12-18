<style>
    .vp-alert.vp-overlay{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        margin: auto;
        background: #fff;
        border-radius: 4px;
        width: 420px;
        min-height: 180px;
        padding: 24px;
        color: #333;
        box-shadow: 0 8px 8px 0;
        z-index: 100000;
    }

    .vp-alert-title{
        margin-bottom: 12px;
    }

    .vp-alert-title-text{
        font-size: 16px;
    }

    .vp-alert-content{
        color: #3B4263;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 28px;
        text-align: center;
        word-wrap: break-word;
        text-align: left;
        min-height: 57px;
    }

    .vp-alert-content-wrap{
        position: relative;
        padding-bottom: 42px;
    }

    .vp-alert-extras{
        margin-top: 8px;
        margin-bottom: 16px;
        color: #555;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
    }

    .vp-alert-footer{
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 100%;
        text-align: right;
        box-sizing: border-box;
    }

    .vp-alert-btn{
        display: inline-block;
        margin-right: 16px;
    }

    .vp-alert-btn:last-child{
        margin-right: 0px;
    }

    .vp-alert .vp-button{
        
        width: 90%;
        margin: 0px 4px 4px 4px;
    }

    .vp-alert .vp-alert-cbtn{
        width: 45%;
    }
</style>

<script>
    import vpMask from '../mask';
    import Overlay from '../overlay';
    import Button from '../button';

    export default {
        name: 'alert',

        mixins: [Overlay],

        props: {
            content: {
                type: String,
                default: ''
            },

            extras: {
                type: String,
                default: null
            },

            buttons: {
                type: Object,
                default(){
                    return {};
                }
            }, 

            showMask: {
                type: Boolean,
                default: true
            }
        },

        components: {
            vpMask,
            Overlay,
            Btn: Button
        },

        data(){
            return {
                title: '系统提示！'
            };
        },

        methods: {
            buttonClick(key){
                var self = this;
                let button = self.buttons[key];
                button.click.call(self);
            }
        },

        mounted(){
            if(this.showMask){
                this.mask = vpMask.show();
            }
            Overlay.manager.addOverlay(this, Overlay.manager.types.alert);
        },

        destroyed(){
            if(this.showMask){
                // this.mask = vpMask.hide();
                this.mask.destroy();
            }
            Overlay.manager.deleteOverlay(this);
        }
    }
</script>

<template>
    <overlay :visible="true" class="vp-alert" position="center">
        <div class="vp-alert-title">
            <div class=""></div>
            <div class="vp-alert-title-text">{{ title || "系统提示！" }}</div>
        </div>
        <div class="vp-alert-content-wrap">
            <div class="vp-alert-content" v-html="content"></div>
            <section class="vp-alert-footer">
                <btn v-for="(button, key) of buttons" class="vp-alert-btn"
                    :class="button.className || ''" 
                    @click="buttonClick(key)" 
                    v-text="key" 
                    :size="button.size || 'normal'" 
                    :type="button.type || 'main'"
                    :key="key"
                ></btn>
            </section>
        </div>
    </overlay>
</template>