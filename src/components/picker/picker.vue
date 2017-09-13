
<style>
    .vp-picked.vp-overlay{
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
    }

    .vp-picked-title{
        margin-bottom: 12px;
    }

    .vp-picked-title-text{
        font-size: 16px;
    }

    .vp-picked-content{
        color: #3B4263;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 28px;
        text-align: center;
        word-wrap: break-word;
        text-align: left;
        min-height: 57px;
    }

    .vp-picked-content-wrap{
        position: relative;
        padding-bottom: 42px;
    }

    .vp-picked-extras{
        margin-top: 8px;
        margin-bottom: 16px;
        color: #555;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
    }

    .vp-picked-footer{
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 100%;
        text-align: right;
        box-sizing: border-box;
    }

    .vp-picked-btn{
        display: inline-block;
        margin-right: 16px;
    }

    .vp-picked-btn:last-child{
        margin-right: 0px;
    }

    .vp-picked .vp-button{
        
        width: 90%;
        margin: 0px 4px 4px 4px;
    }

    .vp-picked .vp-picked-cbtn{
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
            }
        },

        components: {
            vpMask,
            Overlay,
            Btn: Button
        },

        data(){
            return {
                visibility: true,
                title: '系统提示！'
            };
        },

        methods: {
            buttonClick(key){
                var self = this;
                let button = self.buttons[key];
                button.click.call(self);
            }
        }
    }
</script>

<template>
    <overlay :visible="true" class="vp-picked" position="center">
        <div class="vp-picked-title">
            <div class=""></div>
            <div class="vp-picked-title-text">{{ title || "系统提示！" }}</div>
        </div>
        <div class="vp-picked-content-wrap">
            <div class="vp-picked-content" v-html="content"></div>
        </div>
    </overlay>
</template>