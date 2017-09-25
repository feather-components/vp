<template>
<div class="select"
    :class="{ hover: hoverSelect, focus: selectMode, disabled: disabled }"
    :style="{ width: +this.width + 'px' }"
    @mouseenter.stop="!disabled && (hoverSelect = true)"
    @mouseleave.stop="hoverSelect = false"
    v-clickoutside="outside"
    >
    <input type="hidden" :name="name" :id="id" :value="val">
    <div class="select-input" @click="toggle">
        <div>
            <template v-if="type === 'single'">{{ text || placeholder }}</template>
            <template v-if="type === 'multiple'">
                <template v-if="mulOpts.length">
                    <span class="mul-text" v-for="item in mulOpts">{{ item.text }} <em @click.stop="removeOption(item)">&times;</em></span>
                </template>
                <template v-else>{{ placeholder }}</template>
            </template>
        </div>
    </div>
    <transition name="dropDown">
    <ul class="select-list" v-show="selectMode" @mouseleave="hoverKey = undefined">
        <li v-for="option in options"
            @mouseenter="!option.disabled && (hoverKey = option.value)"
            @click="select(option)"
            :class="{ hover: hoverKey === option.value, active: activeKey === option.value, disabled: option.disabled }"
            :key="option.value">
                <template v-if="type === 'multiple'">
                    <label><checkbox class="checkbox" v-model="val" :value="option.value" :disabled="option.disabled"></checkbox>{{ option.text }}</label>
                </template>
                <template v-else>{{ option.text }}</template>
            </li>
    </ul>
    </transition>
</div>
</template>
<script>
import Clickoutside from '../../directives/clickoutside'; //点击区域之外
import Checkbox from '../checkbox';

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
            default: () => []
        },
        type: {
            type: String,
            default: 'single' // single, multiple, search, multiple-search
        },
        value: null,
        disabled: false,
        width: Number | String
    },
    data() {
        return {
            hoverSelect: false,
            hoverKey: undefined,
            activeKey: undefined,
            text: undefined,
            val: this.value,
            selectMode: false,
            mulOpts: []
        }
    },
    methods: {
        toggle() {
            if(this.disabled) return;
            this.selectMode = !this.selectMode;
        },
        select(option) {
            this.hoverSelect = false;
            switch(this.type) {
                case 'single':
                    if(!option) return;
                    if(option.disabled) return;
                    this.text = option.text;
                    this.val = this.activeKey = this.hoverKey = option.value;
                    this.$emit('input', this.val);
                    this.selectMode = false;
                    this.$emit('select', option);
                    break;
                case 'multiple':
                    setTimeout(() => {
                        this.mulOpts = this.options.filter(item => this.val.indexOf(item.value) > -1);
                        this.$emit('input', this.val);
                        this.$emit('select', this.mulOpts);
                    },)
                    break;
                default: break;
            }
        },
        removeOption(option) {
            if(this.disabled) return;
            this.mulOpts.splice(this.mulOpts.indexOf(option), 1);
            this.val.splice(this.val.indexOf(option.value), 1);
            this.$emit('input', this.val);
            this.$emit('select', this.mulOpts);
        },
        outside() {
            this.selectMode = false;
        }
    },
    created() {
        //针对下拉单选
        let curOption = this.options.find(item => item.value === this.value);
        this.select(curOption);
    },
    directives: {
        clickoutside: Clickoutside
    },
    components: {
        Checkbox
    }
}
</script>
<style lang="less" scoped>
.select {
    width: 150px;
    position: relative;
    font-size: 12px;
    user-select: none;
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
    &.disabled .select-input {
        cursor: not-allowed;
        background-color: #f3f3f3;
        border-color: #d9d9d9;
        color: #ccc;
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
            margin: 0 20px 0 6px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .mul-text {
            display: inline-block;
            background-color: #f3f3f3;
            padding: 5px;
            padding-right: 16px;
            line-height: 1;
            margin-right: 5px;
            border-radius: 2px;
            position: relative;
            transition: all .2s;
            > em {
                display: inline-block;
                font-size: 16px;
                position: absolute;
                color: #999;
                top: 0;
                height: 100%;
                width: 14px;
                line-height: 22px;
                text-align: center;
            }
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
            > label {
                display: block;
                cursor: pointer;
            }
            &.active {
                color: #4475E8;
                background-color: #f3f3f3;
            }
            &.hover {
                background-color: #F0F8FD;
            }
            &.disabled {
                color: #ccc;
                cursor: not-allowed;
                > label {
                    color: #ccc;
                    cursor: not-allowed;
                }
            }
        }
    }
    .checkbox {
        margin-right: 5px;
    }
}

.dropDown {
    &-enter-active,
    &-leave-active {
        transition: all .1s;
        transform-origin: center top;
    }
    &-enter,
    &-leave-to{
        opacity: 0;
        transform: scaleY(.8);
        transform-origin: center top;
    }
}
</style>