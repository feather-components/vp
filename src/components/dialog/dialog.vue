<template>
    <transition name="vp-dialog-fade">
    <div :class="'vp-overlay vp-dialog '+ draggableModelClass + noMaskModelClass" v-show="visibility" ref="instance">
        <div class="vp-dialog-wrap">
            <div class="vp-dialog-title" ref="instanceTitleBar">
                <div class="vp-dialog-title-text">
                    <slot name="title">系统提示！</slot>
                </div>
                <div v-if="draggable" class="vp-dialog__draggable">
                    可拖动
                </div>
                <i class="vp-dialog-close-icon" @click="close"></i>
            </div>
            <div class="vp-dialog-content-wrap">
                <div class="vp-dialog-content">
                    <!-- 兼容处理 -->
                    <slot>
                        <slot name="content"></slot>
                    </slot>
                </div>
                <section class="vp-dialog-footer clearfix">
                    <!-- 兼容处理 -->
                    <slot name="footer">
                        <slot name="btns">
                            <btn type="main" class="vp-dialog-btn" @click="close">确认</btn>
                        </slot>
                    </slot>
                </section>
            </div>
        </div>
    </div>
    </transition>
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
            mask: {
                type: Boolean,
                default: true
            },
            draggable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                draggableModelClass: ''
            }
        },
        created(){
            if(this.mask){
                this.noMaskModelClass = ''
            }else{
                this.noMaskModelClass = ' vp-dialog--no-mask'
            }
        },
        methods: {
            mousedown(){
                
            },

            getDialogPosition(){
                var el = this.$refs.instance;
                return {
                    top: el.offsetTop,
                    left: el.offsetLeft
                }
            },

            mouseup(){
                document.onmousemove = null;
            },
            registDragEvent(){
                var self = this;
                var bar = self.$refs.instanceTitleBar;
                var moveHandler = null;

                bar.addEventListener('mousedown', function(){
                    var style = self.$refs.instance.style;
                    var offset = self.getDialogPosition();
                    var halfMove = parseInt(self.$refs.instance.offsetWidth/2);
                    if(self.draggableModelClass == ''){
                        style.left = `${offset.left - halfMove}px`;                    
                    }
                    self.draggableModelClass = ' vp-dialog--draggle';
                    style.top = `${offset.top}px`;
                    
                    //console.log('mousedown');
                    var mouseX = 0;
                    var mouseY = 0;
                    var moveDistanceX = 0;
                    var moveDistanceY = 0;

                    moveHandler = function(e){
                        if(mouseX !== 0 || mouseY !== 0){
                            moveDistanceX = mouseX - e.clientX;
                            moveDistanceY = mouseY - e.clientY;
                            var offset = self.getDialogPosition();
                            style.top = `${offset.top - moveDistanceY}px`;
                            style.left = `${offset.left - moveDistanceX}px`;
                        }
                        mouseX = e.clientX;
                        mouseY = e.clientY;
                    };

                    document.addEventListener('mousemove', moveHandler);
                });

                bar.addEventListener('mouseup', function(){
                    document.removeEventListener('mousemove', moveHandler);
                });
            }
        },
        watch: {
            visibility(val){
                let body = document.getElementsByTagName('body')[0];
                if(val){
                    if(this.mask){
                        if(this.maskInstance){
                            this.maskInstance.show();
                            return;
                        }
                        this.maskInstance = vpMask.show();
                    }
                    body.appendChild(this.$el);
                }else{
                    if(this.mask){
                        if(this.maskInstance){
                            this.maskInstance.hide();
                        }
                    }
                    
                }
            }
        },

        mounted(){
            //Overlay.manager.addOverlay(this, Overlay.manager.types.alert);
            if(this.draggable){
                this.registDragEvent();
            }
        },

        destroyed(){
            if(this.mask && this.maskInstance){
                this.maskInstance.destroy();
            }
            //Overlay.manager.deleteOverlay(this);
        }
    }
</script>

<style>
    
    .vp-dialog.vp-overlay{
        position: absolute;
        top: 10%;
        left: 50%;
        color: #333;
        z-index: 10001;
        min-width: 400px;
    }

    .vp-dialog-wrap{
        box-shadow: 0 8px 8px 0;
        position: relative;
        left: -50%;
        border-radius: 4px;
        background: #fff;
    }

    .vp-dialog--draggle .vp-dialog-wrap{
        left: 0;
    }

    .vp-dialog--no-mask .vp-dialog-title, .vp-dialog--draggle .vp-dialog-title{
        background-color: #eee;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        padding-top: 12px;
        padding-bottom: 12px;
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

    .vp-dialog__draggable{
        position: absolute;
        border-radius: 4px;
        font-size: 8px;
        top: 14px;
        right: 50px;
        border: 1px #bbb dashed;
        padding: 0 3px;
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
        padding: 24px 24px 0 24px;
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
        padding: 0 24px 24px 24px;
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


    .vp-dialog-fade-enter-active, .vp-dialog-fade-leave-active {
        transition: all .3s;
    }
    
    .vp-dialog-fade-enter, .vp-dialog-fade-leave-to {
        margin-top:-100px;
        opacity: 0;
    }
</style>