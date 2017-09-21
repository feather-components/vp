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

<script>
    import Overlay from '../overlay';
   
    export default {
        name: 'picker',

        props: {
            el: Object
        },

        components: {
            Overlay
        },

        data(){
            return {
                direction: '',
            };
        },

        methods: {
            
            pickerClick(event){
                event.cancelBubble = true;
                this.toggleOverlay();
            },

            setDirection(){
                let pEl = this.getOFParentEl() || document;
                let overlayEl = this.getOverlayEl(); 
                let refPickerEl = this.$refs.pickerRel;

                let pRect = pEl.getBoundingClientRect();
                let oRect = overlayEl.getBoundingClientRect();
                let rRect = refPickerEl.getBoundingClientRect();

          
                if(pRect.top + pRect.height < rRect.top + rRect.height + oRect.height){
                    this.direction = 'CENTER-TOP';
                } else if( rRect.bottom + rRect.height + oRect.height > pEl.bottom + pEl.height){
                    this.direction = 'CENTER-BOTTOM';
                } else {
                    this.direction = 'CENTER-BOTTOM';
                }

            },

            setPosition(v){
                let overlayEl = this.getOverlayEl(); 
                switch(v){
                case 'CENTER-TOP':
                    overlayEl.style.top = '';
                    overlayEl.style.bottom = this.$refs.pickerRel.offsetHeight + 2 + 'px';   
                    break;
                case 'CENTER-BOTTOM':
                    overlayEl.style.bottom = '';
                    overlayEl.style.top =  this.$refs.pickerRel.offsetHeight + 2 + 'px';   
                    break;
                }

                overlayEl.style.visibility = 'visible';
            },

            //getOverFlowParent
            getOFParentEl(el){
                let elp = false;
                if(!el){
                    elp = this.$refs.pickerRel;
                }else{
                    //elp = el.offsetParent;
                    elp = el.parentElement;
                }
                if(Object.prototype.toString.call(elp) == '[object HTMLBodyElement]'){
                    return elp;
                }
                let style = window.getComputedStyle(elp);
                if(style.overflow == 'hidden'){
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
              
            },

            closeOtherPicker(){
                let overlays = Overlay.manager.getOverlays();
                for(let key in overlays){
                    let overlay = overlays[key];
                    if(key != this._uid){
                        if(overlay.type == Overlay.manager.types.picker){
                            if(overlay.$attrs && typeof overlay.$attrs.autoClose != 'undefined'){
                                overlay.$attrs.autoClose && overlay.close();
                            } else {
                                overlay.close();
                            }
                        }
                    }
                }
            },

            overlayOpen(){
                this.closeOtherPicker();
                this.setDirection();
                this.setPosition(this.direction);
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

    .vp-picker .vp-picker-overlay{
        position: absolute;
        background-color: #ccc;
        visibility: hidden;
    }

    .vp-picker-rel{
        border: 1px #ccc solid;
    }
</style>