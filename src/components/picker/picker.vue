<script>
    import Overlay from '../overlay';
   
    export default {
        name: 'alert',

        props: {
            el: Object
        },

        components: {
            Overlay
        },

        data(){
            return {
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
                let overlayEl = this.$refs.pickerOverlay.$el;
            },

            positionOverlay(){
                let pickerRel = this.$refs.pickerRel;
                let overlayEl = this.$refs.pickerOverlay.$el;
                /* let p = this.getOverFlowParent(pickerRel);*/
               

                /* if(this.isOverFlow(overlayEl,p)){
                    
                }*/

                switch(this.direction){
                case 'CENTER-BOTTOM':
                    overlayEl.style.top = `${pickerRel.offsetHeight + 2}px`;
                    break;
                }
            },


            isOverFlow(overlayEl, pEl){

            },
            //getOverFlowParent
            getOFParentEl(el){
                let elp = false;
                if(!el){
                    elp = this.$refs.pickerRel;
                }else{
                    elp = el.parentElement;
                }
                //console.log(elp);
                let style = window.getComputedStyle(elp);
                if(style.overflow == 'hidden'){
                    window.getComputedStyle(elp)
                    return elp;
                } else {
                    return this.getOFParentEl(elp);
                }
            },

            getOverlayEl(){
                return this.$refs.pickerOverlay.$el;
            },

            toggleOverlay(){
                let self = this;
                let overLay = self.$refs.pickerOverlay;
                if(!overLay.visibility){
                    
                    overLay.open();
                    self.positionOverlay();
                } else {
                    overLay.close();
                }
            },

            handleBlur(){
                alert('handleBlur');
            },

          
            close(){
                let overlay = this.$refs.pickerOverlay;
                overlay.close();
            },

            clickPickerContent(){
                alert('pickerContent');
            },

            
            


            overlayOpen(){
                let pEl = this.getOFParentEl();
                let overlayEl = this.getOverlayEl(); 
                let refPickerEl = this.$refs.pickerRel;

                //console.log(pEl.getBoundingClientRect());
                let pRect = pEl.getBoundingClientRect();
                let oRect = overlayEl.getBoundingClientRect();
                let rRect = refPickerEl.getBoundingClientRect();

                /* console.log(overlayEl.getBoundingClientRect());
                console.log('open');*/
                console.log(pRect.top + pRect.height,  rRect.top + rRect.height + oRect.height);

                if(pRect.top + pRect.height < rRect.top + rRect.height + oRect.height){
                    this.direction = 'CENTER-TOP';
                } else if( rRect.bottom + rRect.height + oRect.height > pEl.bottom + pEl.height){
                    this.direction = 'CENTER-BOTTOM';
                } 

                overlayEl.style.visibility = 'visible';
            }

        },


        watch:{
            direction(v){
                let overlayEl = this.getOverlayEl(); 
                console.log(v);
                switch(v){
                case 'CENTER-TOP':
                    overlayEl.style.top = 'inherit';
                    overlayEl.style.bottom = this.$refs.pickerRel.offsetHeight +2 + 'px';   
                    break;
                case 'CENTER-BOTTOM':
                    console.log('bottom');
                    overlayEl.style.bottom = 'inherit';
                    overlayEl.style.top = this.$refs.pickerRel.offsetHeight +2 + 'px';   
                    break;
                }
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
            Overlay.manager.addOverlay(this, Overlay.manager.types.picker);

        },

        destroyed(){
            Overlay.manager.deleteOverlay(this);
        }
    }
</script>

<template>
    <a :class="className" @blur="handleBlur">
        <div class="vp-picker-rel" ref="pickerRel" @click="pickerClick">
            <slot>ref</slot>
        </div>
        <overlay :visible="false" class="vp-picker-overlay" position="center" ref="pickerOverlay" @click.native.stop="clickPickerContent();" @open="overlayOpen()">
            <slot name="picker-content">
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
        width: 100%;
        background-color: #ccc;
        visibility: hidden;
    }

    .vp-picker-rel{
        border: 1px #ccc solid;
    }
</style>