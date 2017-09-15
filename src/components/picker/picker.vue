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
                overLayShow: false,
                direction: 'CENTER-BOTTOM',
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
            },

            pickerClick(event){
                event.cancelBubble = true;
                this.toggleOverlay();
            },

            positionOverlay(){
                let pickerRel = this.$refs.pickerRel;
                let pickerOverlay = this.$refs.pickerOverlay;
                switch(this.direction){
                case 'CENTER-BOTTOM':
                    pickerOverlay.$el.style.top = `${pickerRel.offsetHeight + 2}px`;
                    break;
                }
            },

            toggleOverlay(){
                let self = this;
                let overLay = self.$refs.pickerOverlay;
                if(!overLay.visibility){
                    self.positionOverlay();
                    overLay.open();
                } else {
                    overLay.close();
                }
            },

            handleBlur(){
                alert('handleBlur');
            },

            initEvent(){
                let self = this;
                /*document.addEventListener('click', (event) => {
                    console.log(self);
                    self.$refs.pickerOverlay.close();
                });*/
            }
            
        },

        computed: {
            className(){
                let self = this;
                let c = [];
                c.push('vp-picker');
                if(self.class){
                    c.push(self.class);
                }
                return c.join(' ');
            }
        },

        mounted(){
            this.initEvent();
        },


    }
</script>

<template>
    <a :class="className" @blur="handleBlur">
        <div class="vp-picker-rel" ref="pickerRel" @click="pickerClick">
            <slot>ref</slot>
        </div>
        <overlay :visible="overLayShow" class="vp-picker-overlay" position="center" ref="pickerOverlay">
            <slot name="vp-picker-content">
                content
            </slot>
        </overlay>
    </a>
</template>


<style>
    .vp-picker{
        position: relative;
        box-sizing: border-box;
        min-width: 100px;
        min-height: 24px;
        color: #333;
        text-align: center;
        line-height: 24px;
        display: block;
    }

    .vp-picker-overlay{
        position: absolute;
        /*border: 1px #ccc solid;*/
        width: 100%;
        background-color: #ccc;
    }

    .vp-picker-rel{
        border: 1px #ccc solid;
        
    /*    position: absolute;
    */}
</style>