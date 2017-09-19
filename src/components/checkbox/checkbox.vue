<template>
<transition name="fade">
<div class="checkbox">
    <input
        class="input-checkbox"
        type="checkbox"
        :id="id"
        :name="name"
        :value="value"
        :class="className"
        :required="required"
        :disabled="disabled"
        @change="onChange"
        :checked="state" />
    <span class="icon-checkbox">
        <template v-if="part">
            <i class="part-middle"></i>
        </template>
        <template v-else>
            <svg t="1505701737916" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2898" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="12">
                <path d="M804.562219 227.217978 415.999552 615.749946 219.436758 419.218874 128.936581 509.71905 415.999552 796.782022 895.062396 317.718155Z" p-id="2899" :fill="disabled && checked ? '#D9D9D9' : (disabled ? '#F3F3F3' : '#fff')"></path>
            </svg>
        </template>
    </span>
</div>
</transition> 
</template>
<script>
export default {
    name: 'checkbox',
    model: {
        prop: 'modelValue',
        event: 'input'
    },
    props: {
        id: {
            type: String,
            default: null
        },
        label: {
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
        disabled: {
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
        part: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        state() {
            if(this.modelValue === undefined) {
                return this.checked
            }
            if(Array.isArray(this.modelValue)) {
                return this.modelValue.indexOf(this.value) > -1
            }
            return !!this.modelValue
        }
    },
    methods: {
        onChange(e) {
            this.toggle()
            this.$emit('change',e)
        },
        toggle() {
            let value
            if(Array.isArray(this.modelValue)) {
                value = this.modelValue.slice(0);
                if(this.state) {
                    value.splice(value.indexOf(this.value), 1)
                } else {
                    value.push(this.value)
                }
            } else {
                value = !this.state
            }
            this.$emit('input',value)
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
.checkbox {
    position: relative;
    width: 14px;
    height: 14px;
    display: inline-block;
    vertical-align: middle;
    .input-checkbox,
    .icon-checkbox {
        width: 100%;
        height: 100%;
        position: absolute;
        cursor: pointer;
        left: 0;
        top: 0;
        &:disabled {
            cursor: not-allowed;
        }
    }
    .input-checkbox {
        opacity: 0;
        z-index: 2;
    }
    .icon-checkbox {
        display: inline-block;
        border: 1px solid #999;
        width: 12px;
        height: 12px;
        text-align: center;
        vertical-align: bottom;
        border-radius: 2px;
        transition: all .3s;
        z-index: 1;
    }
    &:hover .icon-checkbox {
        border-color: #4475E8;
    }
    .input-checkbox:checked + .icon-checkbox {
        border-color: #4475E8;
        background-color: #4475E8;
    }
    .input-checkbox:disabled + .icon-checkbox {
        border-color: #D9D9D9 !important;
        background-color: #F3F3F3;
    }
    .input-checkbox:disabled:checked + .icon-checkbox {
        background-color: #F3F3F3;
    }
    .input-checkbox:disabled:checked + .icon-checkbox .part-middle {
        background-color: #D9D9D9;
    }
    .part-middle {
        height: 2px;
        background-color: #fff;
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 65%;
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