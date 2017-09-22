<template>
<transition name="fade">
<div class="radio">
    <input
        class="input-radio"
        type="radio"
        :id="id"
        :name="name"
        :value="value"
        :class="className"
        :required="required"
        :disabled="disabled"
        @change="onChange"
        :checked="state" />
    <span class="icon-radio"></span>
</div>
</transition> 
</template>
<script>
export default {
    name: 'radio',
    model: {
        prop: 'modelValue',
        event: 'input'
    },
    props: {
        id: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        value: {
            default: null
        },
        modelValue: {
            type: String | Array,
            default: undefined
        },
        checked: {
            type: Boolean,
            default: false
        },
        className: {
            type: String,
            default: null
        },
        required: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        state() {
            if(this.modelValue === undefined) {
                return this.checked
            }
            return this.modelValue === this.value
        }
    },
    methods: {
        onChange(e) {
            this.toggle()
            this.$emit('change',e)
        },
        toggle() {
            this.$emit('input',this.state ? undefined : this.value)
        }
    },
    watch: {
        checked(newValue) {
            if(newValue !== this.state) {
                this.toggle()
            }
        }
    }
}
</script>
<style lang="less" scoped>
.radio {
    position: relative;
    width: 14px;
    height: 14px;
    display: inline-block;
    vertical-align: middle;
    .input-radio,
    .icon-radio {
        width: 100%;
        height: 100%;
        cursor: pointer;
        &:disabled {
            cursor: not-allowed;
        }
    }
    .input-radio {
        position: absolute;
        opacity: 0;
    }
    .icon-radio {
        display: inline-block;
        border-radius: 50%;
        border: 1px solid #999;
        user-select: none;
        box-sizing: border-box;
        position: relative;
        transition: border-color .3s;
        &:before {
            content: "";
            display: block;
            width: 6px;
            height: 6px;
            background-color: transparent;
            border-radius: 50%;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            transition: background-color .3s;
        }
    }
    .input-radio:checked + .icon-radio {
        border-color: #4475E8;
        &:before {
            background-color: #4475E8;
        }
    }
    .input-radio:disabled + .icon-radio {
        border-color: #d9d9d9;
    }
    .input-radio:disabled:checked + .icon-radio {
        border-color: #d9d9d9;
        &:before {
            background-color: #d9d9d9;
        }
    }
}

.fade {
    &-enter-active,
    &-leave-active {
        transition: opacity .3s;
    }
    &-enter,
    &-leave-to{
        opacity: 0;
    }
} 
</style>