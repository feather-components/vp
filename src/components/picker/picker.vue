
<style>
    .vp-picker.vp-overlay{
        position: absolute;
        box-sizing: border-box;
        margin: auto;
        background: #fff;
        border-radius: 4px;
        width: 100px;
        min-height: 180px;
        padding: 24px;
        color: #333;
        border: 1px #ccc solid;
        display: none;
    }
</style>

<script>
    import Overlay from '../overlay';
   
    export default {
        name: 'alert',

        mixins: [Overlay],

        props: {
            el: Object
        },

        components: {
            Overlay
        },

        data(){
            return {
                visibility: true
            };
        },

        methods: {
            init(options){
                let el = options.ref.$el;
                console.log(el);
            },

            setPosition(el){
                console.log(el);
                let self = this;
                //let pElement = el.parentElement;
                /*if(!pElement.style.position){
                    pElement.style.position = 'relative';
                    //pElement.style.overflow = 'inherit';
                }
                pElement.append(self.$el);
                console.log(pElement.offset);
                let pickerLeft = self.$el.offsetLeft;
                let pickerTop = self.$el.offsetTop;
                self.$el.style.bottom = pickerTop ;
                self.$el.style.left = pickerLeft;*/

                //self.$el.bottom = 
                
                document.body.append(self.$el);

            }
        }
    }
</script>

<template>
    <overlay :visible="true" class="vp-picker" position="center">
   
    </overlay>
</template>