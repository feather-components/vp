<template>
<div class="select"
    :class="{ hover: hoverSelect, focus: selectMode }"
    @mouseenter.stop="hoverSelect = true"
    @mouseleave.stop="hoverSelect = false"
    v-clickoutside="outside"
    >
    <div class="select-input" @click="toggle">
        <div>{{ text || placeholder }}</div>
    </div>
    <transition name="dropDown">
    <ul class="select-list" v-if="selectMode" @mouseleave="hoverKey = undefined">
        <li v-for="option in options"
            @mouseenter="!option.disabled && (hoverKey = option.value)"
            @click="select(option)"
            :class="{ hover: hoverKey === option.value, active: activeKey === option.value, disabled: option.disabled }"
            :value="option.value"
            :key="option.value">{{ option.text }}</li>
    </ul>
    </transition>
</div>
</template>
<script>
import Clickoutside from '../../directives/clickoutside' //点击区域之外

export default {
    name: 'select',
    props: {
        name: String,
        id: String,
        placeholder: {
            type: String,
            default: '请选择...'
        },
        options: {
            type: Array | Object,
            default: []
        },
        value: null
    },
    data() {
        return {
            hoverSelect: false,
            hoverKey: undefined,
            activeKey: undefined,
            text: undefined,
            val: this.value,
            selectMode: false
        }
    },
    methods: {
        toggle() {
            this.selectMode = !this.selectMode;
        },
        select(option) {
            if(!option) {
                return ;
            }
            if(option.disabled) {
                return ;
            }
            this.hoverSelect = false;
            this.text = option.text;
            this.val = this.activeKey = this.hoverKey = option.value;
            this.selectMode = false;
            this.$emit('input', this.val)
            this.$emit('select', option)
        },
        outside() {
            this.selectMode = false;
        }
    },
    created() {
        let curOption = this.options.find(item => item.value === this.value);
        this.select(curOption)
    },
    directives: {
        clickoutside: Clickoutside
    }
}
</script>
<style lang="less" scoped>
.select {
    width: 150px;
    position: relative;
    font-size: 12px;
    &.focus .select-input {
        box-shadow: 0 1px 6px rgba(68,117,232,.5);
        border-color: #4475E8;
        &:after {
            transform: rotateZ(180deg);
        }
    }
    &.hover .select-input {
        border-color: #4475E8;
    }
    &-input {
        border: 1px solid #999;
        color: #333;
        appearance:none;
        border-radius: 2px;
        width: 100%;
        height: 28px;
        position: relative;
        cursor: pointer;
        line-height: 28px;
        font-size: 12px;
        &:after {
            content: "";
            display: block;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 6px solid #ccc;
            position: absolute;
            top: 0;
            right: 5px;
            bottom: 0;
            margin: auto;
            transition: all .3s;
        }
        > div {
            padding: 0 20px 0 6px;
        }
    }
    &-list {
        position: absolute;
        z-index: 10;
        margin-top: 2px;
        left: 1px;
        background-color: #fff;
        width: 100%;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        box-sizing: border-box;
        max-height: 350px;
        overflow-x: hidden;
        overflow-y: auto;
        > li {
            line-height: 28px;
            padding: 0 6px;
            cursor: pointer;
            &.active {
                color: #4475E8;
            }
            &.hover {
                background-color: #F0F8FD;
            }
            &.disabled {
                color: #ccc;
            }
        }
    }
}

.dropDown {
    &-enter-active,
    &-leave-active {
        transition: all .2s;
        transform-origin: center top;
    }
    &-enter,
    &-leave-to{
        opacity: 0;
        transform: scaleY(.5);
        transform-origin: center top;
    }
}
</style>