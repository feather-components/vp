<template>
    <button :class="className" :disable="disable" @click.stop="$emit('click')"><slot></slot></button>
</template>

<script>
    export default{
        name: 'button',
        props: {
            //success,danger,sys,plain,highlight,main
            type: {
                type: String,
                default: '',
            },
            //small, normal, large 
            size: {
                type: String,
                default: 'normal',
            },
            disable: {
                type: Boolean,
                defalut: false
            }
        },
        computed: {
            className(){
                var self = this;
                let classes = ['vp-btn'];

                if(self.class){
                    classes.push(self.class);
                }

                if(self.type){
                    classes.push('vp-btn-' + self.type);
                }
            
                if(self.size){
                    classes.push('vp-btn-' + self.size);
                } else {
                    classes.push('vp-btn-normal');
                }
               
                return classes.join(' ');
            }
        }
    }
</script>

<style>
    .vp-btn,
    .vp-btn-o,
    .vp-btn-large,
    .vp-btn-small,
    .vp-btn-o-large,
    .vp-btn-o-small,
    .vp-btn-small-o,
    .vp-btn-large-o,
    .vp-btn-normal,
    .vp-btn-o-normal,
    .vp-btn-danger,
    .vp-btn-o-danger,
    .vp-btn-success,
    .vp-btn-o-success,
    .vp-btn-sys,
    .vp-btn-o-sys,
    .vp-btn-plain,
    .vp-btn-o-plain,
    .vp-btn-highlight,
    .vp-btn-o-highlight,
    .vp-btn-large-normal,
    .vp-btn-large-o-normal,
    .vp-btn-large-danger,
    .vp-btn-large-o-danger,
    .vp-btn-large-success,
    .vp-btn-large-o-success,
    .vp-btn-large-sys,
    .vp-btn-large-o-sys,
    .vp-btn-large-plain,
    .vp-btn-large-o-plain,
    .vp-btn-large-highlight,
    .vp-btn-large-o-highlight,
    .vp-btn-small-normal,
    .vp-btn-small-o-normal,
    .vp-btn-small-danger,
    .vp-btn-small-o-danger,
    .vp-btn-small-success,
    .vp-btn-small-o-success,
    .vp-btn-small-sys,
    .vp-btn-small-o-sys,
    .vp-btn-small-plain,
    .vp-btn-small-o-plain,
    .vp-btn-small-highlight,
    .vp-btn-small-o-highlight {
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        font-size: 12px;
        font-family: Arial, "Microsoft Yahei", "Helvetica Neue", "Hiragino Sans GB", sans-serif;
        height: 28px;
        min-width: 72px;
        cursor: pointer;
        outline: none;
        border: 1px solid #5986e1;
        border-radius: 3px;
        color: white;
        background-color: #5986e1;
        -webkit-text-stroke-width: 0;
        box-sizing: border-box;
    }

    .vp-btn:last-child,
    .vp-btn-large:last-child,
    .vp-btn-small:last-child,
    .vp-btn-o:last-child,
    .vp-btn-o-large:last-child,
    .vp-btn-o-small:last-child {
        margin-right: 0;
    }

    .vp-btn:before,
    .vp-btn-large:before,
    .vp-btn-small:before,
    .vp-btn-o:before,
    .vp-btn-o-large:before,
    .vp-btn-o-small:before {
        margin-right: 3px;
        margin-left: 2px;
        font-size: 14px;
    }

    .vp-btn:hover,
    .vp-btn-large:hover,
    .vp-btn-small:hover,
    .vp-btn-o:hover,
    .vp-btn-o-large:hover,
    .vp-btn-o-small:hover {
        background-color: #2e67d9;
        border-color: #2e67d9;
        color: white;
    }

    .vp-btn .iconfont,
    .vp-btn-large .iconfont,
    .vp-btn-small .iconfont,
    .vp-btn-o .iconfont,
    .vp-btn-o-large .iconfont,
    .vp-btn-o-small .iconfont {
        font-size: 14px;
        margin-right: 5px;
    }

    .vp-btn-large,
    .vp-btn-large-o,
    .vp-btn-large-normal,
    .vp-btn-large-o-normal,
    .vp-btn-large-danger,
    .vp-btn-large-o-danger,
    .vp-btn-large-success,
    .vp-btn-large-o-success,
    .vp-btn-large-sys,
    .vp-btn-large-o-sys,
    .vp-btn-large-plain,
    .vp-btn-large-o-plain,
    .vp-btn-large-highlight,
    .vp-btn-large-o-highlight {
        height: 32px;
        min-width: 128px;
    }

    .vp-btn-small,
    .vp-btn-small-o,
    .vp-btn-small-normal,
    .vp-btn-small-o-normal,
    .vp-btn-small-danger,
    .vp-btn-small-o-danger,
    .vp-btn-small-success,
    .vp-btn-small-o-success,
    .vp-btn-small-sys,
    .vp-btn-small-o-sys,
    .vp-btn-small-plain,
    .vp-btn-small-o-plain,
    .vp-btn-small-highlight,
    .vp-btn-small-o-highlight {
        height: 24px;
        font-size: 12px;
        min-width: 66px;
    }

    .vp-btn-small:before {
        font-size: 12px;
    }

    .vp-btn-small .iconfont {
        font-size: 12px;
    }


    /* o */

    .vp-btn-o {
        color: #5986e1;
        border: 1px solid #5986e1;
        background-color: white !important;
    }

    .vp-btn-o:hover {
        color: #2e67d9;
        border: 1px solid #2e67d9;
    }

    .vp-btn-o:last-child {
        margin-right: 0;
    }

    .vp-btn-o:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-small-o {
        color: #5986e1;
        border: 1px solid #5986e1;
        background-color: white !important;
    }

    .vp-btn-small-o:hover {
        color: #2e67d9;
        border: 1px solid #2e67d9;
    }

    .vp-btn-small-o:last-child {
        margin-right: 0;
    }

    .vp-btn-small-o:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-large-o {
        color: #5986e1;
        border: 1px solid #5986e1;
        background-color: white !important;
    }

    .vp-btn-large-o:hover {
        color: #2e67d9;
        border: 1px solid #2e67d9;
    }

    .vp-btn-large-o:last-child {
        margin-right: 0;
    }

    .vp-btn-large-o:before {
        margin-right: 5px;
        font-size: 14px;
    }


    /* color */

    .vp-btn.vp-color-normal {
        background-color: #5986e1;
        border-color: #5986e1;
    }

    .vp-btn.vp-color-normal:hover {
        color: white;
        background-color: #2e67d9;
        border-color: #2e67d9;
    }

    .vp-btn-o.vp-color-normal,
    .vp-btn-o.vp-btn-normal {
        background-color: white;
        border-color: #5986e1;
        color: #5986e1;
    }

    .vp-btn-o.vp-color-normal:hover,
    .vp-btn-o.vp-btn-normal:hover {
        background-color: white;
        color: #2e67d9 !important;
        border-color: #2e67d9;
    }

    .vp-btn-normal {
        background-color: #5986e1;
        border-color: #5986e1;
    }

    .vp-btn-normal:hover {
        color: white;
        background-color: #2e67d9;
        border-color: #2e67d9;
    }

    .vp-btn-o-normal {
        background-color: white;
        border-color: #5986e1;
        color: #5986e1;
    }

    .vp-btn-o-normal:hover {
        background-color: white;
        color: #2e67d9;
        border-color: #2e67d9;
    }

    .vp-btn-o-normal:last-child {
        margin-right: 0;
    }

    .vp-btn-o-normal:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn.vp-color-danger {
        background-color: #d05538;
        border-color: #d05538;
    }

    .vp-btn.vp-color-danger:hover {
        color: white;
        background-color: #ac4229;
        border-color: #ac4229;
    }

    .vp-btn-o.vp-color-danger,
    .vp-btn-o.vp-btn-danger {
        background-color: white;
        border-color: #d05538;
        color: #d05538;
    }

    .vp-btn-o.vp-color-danger:hover,
    .vp-btn-o.vp-btn-danger:hover {
        background-color: white;
        color: #ac4229 !important;
        border-color: #ac4229;
    }

    .vp-btn-danger {
        background-color: #d05538;
        border-color: #d05538;
    }

    .vp-btn-danger:hover {
        color: white;
        background-color: #ac4229;
        border-color: #ac4229;
    }

    .vp-btn-o-danger {
        background-color: white;
        border-color: #d05538;
        color: #d05538;
    }

    .vp-btn-o-danger:hover {
        background-color: white;
        color: #ac4229;
        border-color: #ac4229;
    }

    .vp-btn-o-danger:last-child {
        margin-right: 0;
    }

    .vp-btn-o-danger:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn.vp-color-success {
        background-color: #8bb455;
        border-color: #8bb455;
    }

    .vp-btn.vp-color-success:hover {
        color: white;
        background-color: #719442;
        border-color: #719442;
    }

    .vp-btn-o.vp-color-success,
    .vp-btn-o.vp-btn-success {
        background-color: white;
        border-color: #8bb455;
        color: #8bb455;
    }

    .vp-btn-o.vp-color-success:hover,
    .vp-btn-o.vp-btn-success:hover {
        background-color: white;
        color: #719442 !important;
        border-color: #719442;
    }

    .vp-btn-success {
        background-color: #8bb455;
        border-color: #8bb455;
    }

    .vp-btn-success:hover {
        color: white;
        background-color: #719442;
        border-color: #719442;
    }

    .vp-btn-o-success {
        background-color: white;
        border-color: #8bb455;
        color: #8bb455;
    }

    .vp-btn-o-success:hover {
        background-color: white;
        color: #719442;
        border-color: #719442;
    }

    .vp-btn-o-success:last-child {
        margin-right: 0;
    }

    .vp-btn-o-success:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn.vp-color-sys {
        background-color: #464e78;
        border-color: #464e78;
    }

    .vp-btn.vp-color-sys:hover {
        color: white;
        background-color: #333958;
        border-color: #333958;
    }

    .vp-btn-o.vp-color-sys,
    .vp-btn-o.vp-btn-sys {
        background-color: white;
        border-color: #464e78;
        color: #464e78;
    }

    .vp-btn-o.vp-color-sys:hover,
    .vp-btn-o.vp-btn-sys:hover {
        background-color: white;
        color: #333958 !important;
        border-color: #333958;
    }

    .vp-btn-sys {
        background-color: #464e78;
        border-color: #464e78;
    }

    .vp-btn-sys:hover {
        color: white;
        background-color: #333958;
        border-color: #333958;
    }

    .vp-btn-o-sys {
        background-color: white;
        border-color: #464e78;
        color: #464e78;
    }

    .vp-btn-o-sys:hover {
        background-color: white;
        color: #333958;
        border-color: #333958;
    }

    .vp-btn-o-sys:last-child {
        margin-right: 0;
    }

    .vp-btn-o-sys:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn.vp-color-plain {
        background-color: #e1e1e1;
        border-color: #e1e1e1;
    }

    .vp-btn.vp-color-plain:hover {
        color: white;
        background-color: #c8c8c8;
        border-color: #c8c8c8;
    }

    .vp-btn-o.vp-color-plain,
    .vp-btn-o.vp-btn-plain {
        background-color: white;
        border-color: #e1e1e1;
        color: #e1e1e1;
    }

    .vp-btn-o.vp-color-plain:hover,
    .vp-btn-o.vp-btn-plain:hover {
        background-color: white;
        color: #c8c8c8 !important;
        border-color: #c8c8c8;
    }

    .vp-btn-plain {
        background-color: #e1e1e1;
        border-color: #e1e1e1;
    }

    .vp-btn-plain:hover {
        color: white;
        background-color: #c8c8c8;
        border-color: #c8c8c8;
    }

    .vp-btn-o-plain {
        background-color: white;
        border-color: #e1e1e1;
        color: #e1e1e1;
    }

    .vp-btn-o-plain:hover {
        background-color: white;
        color: #c8c8c8;
        border-color: #c8c8c8;
    }

    .vp-btn-o-plain:last-child {
        margin-right: 0;
    }

    .vp-btn-o-plain:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn.vp-color-highlight {
        background-color: #ff8447;
        border-color: #ff8447;
    }

    .vp-btn.vp-color-highlight:hover {
        color: white;
        background-color: #ff6214;
        border-color: #ff6214;
    }

    .vp-btn-o.vp-color-highlight,
    .vp-btn-o.vp-btn-highlight {
        background-color: white;
        border-color: #ff8447;
        color: #ff8447;
    }

    .vp-btn-o.vp-color-highlight:hover,
    .vp-btn-o.vp-btn-highlight:hover {
        background-color: white;
        color: #ff6214 !important;
        border-color: #ff6214;
    }

    .vp-btn-highlight {
        background-color: #ff8447;
        border-color: #ff8447;
    }

    .vp-btn-highlight:hover {
        color: white;
        background-color: #ff6214;
        border-color: #ff6214;
    }

    .vp-btn-o-highlight {
        background-color: white;
        border-color: #ff8447;
        color: #ff8447;
    }

    .vp-btn-o-highlight:hover {
        background-color: white;
        color: #ff6214;
        border-color: #ff6214;
    }

    .vp-btn-o-highlight:last-child {
        margin-right: 0;
    }

    .vp-btn-o-highlight:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-large.vp-color-normal {
        background-color: #5986e1;
        border-color: #5986e1;
    }

    .vp-btn-large.vp-color-normal:hover {
        color: white;
        background-color: #2e67d9;
        border-color: #2e67d9;
    }

    .vp-btn-large-o.vp-color-normal,
    .vp-btn-large-o.vp-btn-large-normal {
        background-color: white;
        border-color: #5986e1;
        color: #5986e1;
    }

    .vp-btn-large-o.vp-color-normal:hover,
    .vp-btn-large-o.vp-btn-large-normal:hover {
        background-color: white;
        color: #2e67d9 !important;
        border-color: #2e67d9;
    }

    .vp-btn-large-normal {
        background-color: #5986e1;
        border-color: #5986e1;
    }

    .vp-btn-large-normal:hover {
        color: white;
        background-color: #2e67d9;
        border-color: #2e67d9;
    }

    .vp-btn-large-o-normal {
        background-color: white;
        border-color: #5986e1;
        color: #5986e1;
    }

    .vp-btn-large-o-normal:hover {
        background-color: white;
        color: #2e67d9;
        border-color: #2e67d9;
    }

    .vp-btn-large-o-normal:last-child {
        margin-right: 0;
    }

    .vp-btn-large-o-normal:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-large.vp-color-danger {
        background-color: #d05538;
        border-color: #d05538;
    }

    .vp-btn-large.vp-color-danger:hover {
        color: white;
        background-color: #ac4229;
        border-color: #ac4229;
    }

    .vp-btn-large-o.vp-color-danger,
    .vp-btn-large-o.vp-btn-large-danger {
        background-color: white;
        border-color: #d05538;
        color: #d05538;
    }

    .vp-btn-large-o.vp-color-danger:hover,
    .vp-btn-large-o.vp-btn-large-danger:hover {
        background-color: white;
        color: #ac4229 !important;
        border-color: #ac4229;
    }

    .vp-btn-large-danger {
        background-color: #d05538;
        border-color: #d05538;
    }

    .vp-btn-large-danger:hover {
        color: white;
        background-color: #ac4229;
        border-color: #ac4229;
    }

    .vp-btn-large-o-danger {
        background-color: white;
        border-color: #d05538;
        color: #d05538;
    }

    .vp-btn-large-o-danger:hover {
        background-color: white;
        color: #ac4229;
        border-color: #ac4229;
    }

    .vp-btn-large-o-danger:last-child {
        margin-right: 0;
    }

    .vp-btn-large-o-danger:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-large.vp-color-success {
        background-color: #8bb455;
        border-color: #8bb455;
    }

    .vp-btn-large.vp-color-success:hover {
        color: white;
        background-color: #719442;
        border-color: #719442;
    }

    .vp-btn-large-o.vp-color-success,
    .vp-btn-large-o.vp-btn-large-success {
        background-color: white;
        border-color: #8bb455;
        color: #8bb455;
    }

    .vp-btn-large-o.vp-color-success:hover,
    .vp-btn-large-o.vp-btn-large-success:hover {
        background-color: white;
        color: #719442 !important;
        border-color: #719442;
    }

    .vp-btn-large-success {
        background-color: #8bb455;
        border-color: #8bb455;
    }

    .vp-btn-large-success:hover {
        color: white;
        background-color: #719442;
        border-color: #719442;
    }

    .vp-btn-large-o-success {
        background-color: white;
        border-color: #8bb455;
        color: #8bb455;
    }

    .vp-btn-large-o-success:hover {
        background-color: white;
        color: #719442;
        border-color: #719442;
    }

    .vp-btn-large-o-success:last-child {
        margin-right: 0;
    }

    .vp-btn-large-o-success:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-large.vp-color-sys {
        background-color: #464e78;
        border-color: #464e78;
    }

    .vp-btn-large.vp-color-sys:hover {
        color: white;
        background-color: #333958;
        border-color: #333958;
    }

    .vp-btn-large-o.vp-color-sys,
    .vp-btn-large-o.vp-btn-large-sys {
        background-color: white;
        border-color: #464e78;
        color: #464e78;
    }

    .vp-btn-large-o.vp-color-sys:hover,
    .vp-btn-large-o.vp-btn-large-sys:hover {
        background-color: white;
        color: #333958 !important;
        border-color: #333958;
    }

    .vp-btn-large-sys {
        background-color: #464e78;
        border-color: #464e78;
    }

    .vp-btn-large-sys:hover {
        color: white;
        background-color: #333958;
        border-color: #333958;
    }

    .vp-btn-large-o-sys {
        background-color: white;
        border-color: #464e78;
        color: #464e78;
    }

    .vp-btn-large-o-sys:hover {
        background-color: white;
        color: #333958;
        border-color: #333958;
    }

    .vp-btn-large-o-sys:last-child {
        margin-right: 0;
    }

    .vp-btn-large-o-sys:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-large.vp-color-plain {
        background-color: #e1e1e1;
        border-color: #e1e1e1;
    }

    .vp-btn-large.vp-color-plain:hover {
        color: white;
        background-color: #c8c8c8;
        border-color: #c8c8c8;
    }

    .vp-btn-large-o.vp-color-plain,
    .vp-btn-large-o.vp-btn-large-plain {
        background-color: white;
        border-color: #e1e1e1;
        color: #e1e1e1;
    }

    .vp-btn-large-o.vp-color-plain:hover,
    .vp-btn-large-o.vp-btn-large-plain:hover {
        background-color: white;
        color: #c8c8c8 !important;
        border-color: #c8c8c8;
    }

    .vp-btn-large-plain {
        background-color: #e1e1e1;
        border-color: #e1e1e1;
    }

    .vp-btn-large-plain:hover {
        color: white;
        background-color: #c8c8c8;
        border-color: #c8c8c8;
    }

    .vp-btn-large-o-plain {
        background-color: white;
        border-color: #e1e1e1;
        color: #e1e1e1;
    }

    .vp-btn-large-o-plain:hover {
        background-color: white;
        color: #c8c8c8;
        border-color: #c8c8c8;
    }

    .vp-btn-large-o-plain:last-child {
        margin-right: 0;
    }

    .vp-btn-large-o-plain:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-large.vp-color-highlight {
        background-color: #ff8447;
        border-color: #ff8447;
    }

    .vp-btn-large.vp-color-highlight:hover {
        color: white;
        background-color: #ff6214;
        border-color: #ff6214;
    }

    .vp-btn-large-o.vp-color-highlight,
    .vp-btn-large-o.vp-btn-large-highlight {
        background-color: white;
        border-color: #ff8447;
        color: #ff8447;
    }

    .vp-btn-large-o.vp-color-highlight:hover,
    .vp-btn-large-o.vp-btn-large-highlight:hover {
        background-color: white;
        color: #ff6214 !important;
        border-color: #ff6214;
    }

    .vp-btn-large-highlight {
        background-color: #ff8447;
        border-color: #ff8447;
    }

    .vp-btn-large-highlight:hover {
        color: white;
        background-color: #ff6214;
        border-color: #ff6214;
    }

    .vp-btn-large-o-highlight {
        background-color: white;
        border-color: #ff8447;
        color: #ff8447;
    }

    .vp-btn-large-o-highlight:hover {
        background-color: white;
        color: #ff6214;
        border-color: #ff6214;
    }

    .vp-btn-large-o-highlight:last-child {
        margin-right: 0;
    }

    .vp-btn-large-o-highlight:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-small.vp-color-normal {
        background-color: #5986e1;
        border-color: #5986e1;
    }

    .vp-btn-small.vp-color-normal:hover {
        color: white;
        background-color: #2e67d9;
        border-color: #2e67d9;
    }

    .vp-btn-small-o.vp-color-normal,
    .vp-btn-small-o.vp-btn-small-normal {
        background-color: white;
        border-color: #5986e1;
        color: #5986e1;
    }

    .vp-btn-small-o.vp-color-normal:hover,
    .vp-btn-small-o.vp-btn-small-normal:hover {
        background-color: white;
        color: #2e67d9 !important;
        border-color: #2e67d9;
    }

    .vp-btn-small-normal {
        background-color: #5986e1;
        border-color: #5986e1;
    }

    .vp-btn-small-normal:hover {
        color: white;
        background-color: #2e67d9;
        border-color: #2e67d9;
    }

    .vp-btn-small-o-normal {
        background-color: white;
        border-color: #5986e1;
        color: #5986e1;
    }

    .vp-btn-small-o-normal:hover {
        background-color: white;
        color: #2e67d9;
        border-color: #2e67d9;
    }

    .vp-btn-small-o-normal:last-child {
        margin-right: 0;
    }

    .vp-btn-small-o-normal:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-small.vp-color-danger {
        background-color: #d05538;
        border-color: #d05538;
    }

    .vp-btn-small.vp-color-danger:hover {
        color: white;
        background-color: #ac4229;
        border-color: #ac4229;
    }

    .vp-btn-small-o.vp-color-danger,
    .vp-btn-small-o.vp-btn-small-danger {
        background-color: white;
        border-color: #d05538;
        color: #d05538;
    }

    .vp-btn-small-o.vp-color-danger:hover,
    .vp-btn-small-o.vp-btn-small-danger:hover {
        background-color: white;
        color: #ac4229 !important;
        border-color: #ac4229;
    }

    .vp-btn-small-danger {
        background-color: #d05538;
        border-color: #d05538;
    }

    .vp-btn-small-danger:hover {
        color: white;
        background-color: #ac4229;
        border-color: #ac4229;
    }

    .vp-btn-small-o-danger {
        background-color: white;
        border-color: #d05538;
        color: #d05538;
    }

    .vp-btn-small-o-danger:hover {
        background-color: white;
        color: #ac4229;
        border-color: #ac4229;
    }

    .vp-btn-small-o-danger:last-child {
        margin-right: 0;
    }

    .vp-btn-small-o-danger:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-small.vp-color-success {
        background-color: #8bb455;
        border-color: #8bb455;
    }

    .vp-btn-small.vp-color-success:hover {
        color: white;
        background-color: #719442;
        border-color: #719442;
    }

    .vp-btn-small-o.vp-color-success,
    .vp-btn-small-o.vp-btn-small-success {
        background-color: white;
        border-color: #8bb455;
        color: #8bb455;
    }

    .vp-btn-small-o.vp-color-success:hover,
    .vp-btn-small-o.vp-btn-small-success:hover {
        background-color: white;
        color: #719442 !important;
        border-color: #719442;
    }

    .vp-btn-small-success {
        background-color: #8bb455;
        border-color: #8bb455;
    }

    .vp-btn-small-success:hover {
        color: white;
        background-color: #719442;
        border-color: #719442;
    }

    .vp-btn-small-o-success {
        background-color: white;
        border-color: #8bb455;
        color: #8bb455;
    }

    .vp-btn-small-o-success:hover {
        background-color: white;
        color: #719442;
        border-color: #719442;
    }

    .vp-btn-small-o-success:last-child {
        margin-right: 0;
    }

    .vp-btn-small-o-success:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-small.vp-color-sys {
        background-color: #464e78;
        border-color: #464e78;
    }

    .vp-btn-small.vp-color-sys:hover {
        color: white;
        background-color: #333958;
        border-color: #333958;
    }

    .vp-btn-small-o.vp-color-sys,
    .vp-btn-small-o.vp-btn-small-sys {
        background-color: white;
        border-color: #464e78;
        color: #464e78;
    }

    .vp-btn-small-o.vp-color-sys:hover,
    .vp-btn-small-o.vp-btn-small-sys:hover {
        background-color: white;
        color: #333958 !important;
        border-color: #333958;
    }

    .vp-btn-small-sys {
        background-color: #464e78;
        border-color: #464e78;
    }

    .vp-btn-small-sys:hover {
        color: white;
        background-color: #333958;
        border-color: #333958;
    }

    .vp-btn-small-o-sys {
        background-color: white;
        border-color: #464e78;
        color: #464e78;
    }

    .vp-btn-small-o-sys:hover {
        background-color: white;
        color: #333958;
        border-color: #333958;
    }

    .vp-btn-small-o-sys:last-child {
        margin-right: 0;
    }

    .vp-btn-small-o-sys:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-small.vp-color-plain {
        background-color: #e1e1e1;
        border-color: #e1e1e1;
    }

    .vp-btn-small.vp-color-plain:hover {
        color: white;
        background-color: #c8c8c8;
        border-color: #c8c8c8;
    }

    .vp-btn-small-o.vp-color-plain,
    .vp-btn-small-o.vp-btn-small-plain {
        background-color: white;
        border-color: #e1e1e1;
        color: #e1e1e1;
    }

    .vp-btn-small-o.vp-color-plain:hover,
    .vp-btn-small-o.vp-btn-small-plain:hover {
        background-color: white;
        color: #c8c8c8 !important;
        border-color: #c8c8c8;
    }

    .vp-btn-small-plain {
        background-color: #e1e1e1;
        border-color: #e1e1e1;
    }

    .vp-btn-small-plain:hover {
        color: white;
        background-color: #c8c8c8;
        border-color: #c8c8c8;
    }

    .vp-btn-small-o-plain {
        background-color: white;
        border-color: #e1e1e1;
        color: #e1e1e1;
    }

    .vp-btn-small-o-plain:hover {
        background-color: white;
        color: #c8c8c8;
        border-color: #c8c8c8;
    }

    .vp-btn-small-o-plain:last-child {
        margin-right: 0;
    }

    .vp-btn-small-o-plain:before {
        margin-right: 5px;
        font-size: 14px;
    }

    .vp-btn-small.vp-color-highlight {
        background-color: #ff8447;
        border-color: #ff8447;
    }

    .vp-btn-small.vp-color-highlight:hover {
        color: white;
        background-color: #ff6214;
        border-color: #ff6214;
    }

    .vp-btn-small-o.vp-color-highlight,
    .vp-btn-small-o.vp-btn-small-highlight {
        background-color: white;
        border-color: #ff8447;
        color: #ff8447;
    }

    .vp-btn-small-o.vp-color-highlight:hover,
    .vp-btn-small-o.vp-btn-small-highlight:hover {
        background-color: white;
        color: #ff6214 !important;
        border-color: #ff6214;
    }

    .vp-btn-small-highlight {
        background-color: #ff8447;
        border-color: #ff8447;
    }

    .vp-btn-small-highlight:hover {
        color: white;
        background-color: #ff6214;
        border-color: #ff6214;
    }

    .vp-btn-small-o-highlight {
        background-color: white;
        border-color: #ff8447;
        color: #ff8447;
    }

    .vp-btn-small-o-highlight:hover {
        background-color: white;
        color: #ff6214;
        border-color: #ff6214;
    }

    .vp-btn-small-o-highlight:last-child {
        margin-right: 0;
    }

    .vp-btn-small-o-highlight:before {
        margin-right: 5px;
        font-size: 14px;
    }


    /* group */

    .vp-btn-group {
        display: inline-block;
        margin: 5px;
    }

    .vp-btn-group * {
        margin: 0;
        border-radius: 0;
        float: left;
    }

    .vp-btn-group>*:first-child {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    .vp-btn-group>*:last-child {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }

    .vp-btn-group *[class^='vp-btn'][class*='-o']+*[class^='vp-btn'][class*='-o'] {
        border-left: none;
    }

</style>