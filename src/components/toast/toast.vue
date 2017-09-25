<template>
    <overlay :visible="true" class="vp-toast" position="center">
        <div class="vp-toast-content">
            <i class="vp-toast-icon"></i><div class="vp-toast-msg" v-html="msg"></div>
        </div>
    </overlay>
</template>
<style>
    .vp-toast.vp-overlay{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        margin: auto;
        background: #fff;
        border-radius: 4px;
        padding: 15px;
        padding-right: 25px;
        color: #333;
        box-shadow: 0 8px 8px 0;
    }

    .vp-toast-content{
        display: flex;
        color: #3B4263;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 28px;
        text-align: center;
        word-wrap: break-word;
        text-align: left;
    }

    .vp-toast-icon{
        background: url('./images/loading.gif') no-repeat;
        width: 32px;
        height:32px;
        margin-right: 10px;
        display: inline-block;
    }
    .vp-toast-msg{
        height: 32px;
        line-height: 32px;
        display: inline-block;
        font-size: 18px;
    }
</style>

<script>
    import vpMask from '../mask';
    import Overlay from '../overlay';

    export default {
        name: 'toast',

        mixins: [Overlay],

        components: {
            vpMask,
            Overlay,
        },

        mounted(){
            let self = this;
            if(self.showMask){
                self.mask = vpMask.show();
            }
            setTimeout(() =>{
                self.destroy();
            }, self.millisecond);
        },

        destroyed(){
            if(this.showMask){
                this.mask.destroy();
            }
        }
    }
</script>
