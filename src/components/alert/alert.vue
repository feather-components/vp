<template>
     <vp-mask :visible="visibility">
        <overlay :visible="true" class="vm-alert" position="center">
            <div class="vm-alert-content" v-html="content"></div>
            <div class="vm-alert-extras" v-if="!!extras" v-text="extras"></div>
           
            <section class="vm-alert-footer">

                <btn v-for="(button, key) of buttons" :key="key" class="vm-alert-btncon"
                    :class="button.className || ''" 
                    @click="callButton(key)" 
                    v-text="key" 
                    :small="true"
                    :border="button.props ? button.props.border : null"
                    :type="button.props ? button.props.type : null"
                ></btn>
            </section>
        </overlay>
    </vp-mask>
</template>
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
    }

    .vp-alert-title{
        margin-bottom: 12px;
    }

</style>
<script>
    import vpMask from '../mask';
    import Overlay from '../overlay';
    import Button from '../button';

    export default {
        name: 'alert',

        mixins: [Overlay],

        components: {
            vpMask,
            Overlay,
            Btn: Button
        },

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

        data(){
            return {
                title: '系统提示！'
            };
        },

        methods: {
            callButton(key){
                var self = this;
                var props = self.buttons[key];
                if(props.callback){
                    props.callback.call(self);
                }else{
                    props.call(self);
                }
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
