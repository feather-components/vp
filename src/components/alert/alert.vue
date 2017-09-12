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
            }
        },

        data(){
            return {
                visibility: true
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
        }
    }
</script>