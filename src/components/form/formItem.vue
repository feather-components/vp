<template>
    <div :class="['vp-form-item',className]">
        <label class="vp-form-label" v-if="label">
            <slot name="label">{{ label + form.labelSuffix }}</slot>
        </label>
        <div ref="valueBlock" class="vp-form-value">
            <slot></slot>
        </div>
        <div class="vp-form-item-error"></div>
    </div>
</template>
<script>
    export default {
        cmpName: 'vp-form-item',
        data () {
            return {
            };
        },
        props: {
            label: String,
            labelWidth: String,
            valueWidth: String,
            name: String,
            initValue: {
                type: String,
                default: ''
            }
        },

        computed: {
            form () {
                return this.$parent;
            },
            className () {
                return this['class'];
            }
        },
    
        methods: {
            resetField () {
                this.initValue = this.initValue ? this.initValue : '';
                this.setValue(this.initValue);
            },

            setValue (value) {
                let _list = this.$refs.valueBlock.children;
                this.setElValue(_list[0], value);
            },

            getField () {
                let value = this.getValue(this.$refs.valueBlock.children[0]);
                return {name: this.name, value: value};
            },

            setElValue (el, value) {
                let tagName = el.tagName;
                if (tagName === 'INPUT') {
                    let _t = el.getAttribute('type') || 'text';
    
                    if (_t === 'checkbox' || _t === 'radio') {
                        el.checked = (el.value === value);
                        return;
                    }
                    if (_t === 'text' || _t === 'hidden') {
                        el.value = value;
                        return;
                    }
                }
    
                if (tagName === 'SELECT') {
                    el.value = value;
                    return;
                }
    
                if (tagName === 'DIV') {
                    let _t = el.getAttribute('type');
                    if (!_t) {
                        return;
                    }
                    if (_t === 'VP-CHECKBOXES' || _t === 'VP-RADIOBOXES') {
                        return this.subItem.setValue(value);
                    }
                }
            },

            getValue (el) {
                let tagName = el.tagName;
                if (tagName === 'INPUT') {
                    let _t = el.getAttribute('type') || 'text';
                    if (_t === 'checkbox' || _t === 'radio') {
                        return el.checked ? el.value : '';
                    }
                    if (_t === 'text' || _t === 'hidden') {
                        return el.value;
                    }
                }
                if (tagName === 'SELECT') {
                    return el.value;
                }
                if (tagName === 'DIV') {
                    let _t = el.getAttribute('type');
                    if (!_t) {
                        return;
                    }
                    if (_t === 'VP-CHECKBOXES' || _t === 'VP-RADIOBOXES') {
                        return this.subItem.getValue();
                    }
                }
            },
            getComplexValue (elList) {
                console.log(elList);
            },
            setComplexValue (elList, value) {
                console.log(value);
            }
        },
        mounted () {
            if (this.form) {
                this.form.fields.push(this);
            }
            if (this.initValue) {
                this.setValue(this.initValue);
            }
        }
    };
</script>
<style>
   
    .vp-form-item{
        float: left;
        margin: 0 10px 6px 0;
    }
    .vp-form-value{
        float: left;
        height: 30px;
        line-height: 30px;
    }
    .vp-form-label{
        float: left;
        width: 100px;
        line-height: 30px;
        text-align: right;
        position: static;
    }

    /* text + textarea + select + checkbox + radio + switchbox copy from legoland*/
    input,
    select,
    textarea {
      outline: none;
      border-radius: 3px;
      font-size: 12px;
    }
    input,
    select {
      box-sizing: border-box;
      width: 120px;
      margin-right: 5px;
      line-height: 22px;
      -moz-appearance: textfield;
    }
    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    label {
      font-weight: normal;
      margin: 0;
    }
    label.lg-require:before {
      content: '*';
      color: red;
    }
    /* text */
    input[type='text'],
    input[type='number'],
    input[type='telephone'] {
      border: 1px solid #e1e1e1;
      padding: 3px 5px;
      font-size: 12px;
      color: #666;
      height: 30px;
    }
    input[type='text']:active,
    input[type='number']:active,
    input[type='telephone']:active,
    input[type='text']:focus,
    input[type='number']:focus,
    input[type='telephone']:focus {
      border: 1px solid #5986e1;
    }
    /* textarea */
    textarea {
      border: 1px solid #e1e1e1;
      padding: 3px 5px;
      font-size: 12px;
      color: #666;
      width: 80%;
      min-height: 100px;
      resize: none;
    }
    textarea:active,
    textarea:focus {
      border: 1px solid #5986e1;
    }
    /* select */
    select {
      border: 1px solid #e1e1e1;
      padding: 3px 5px;
      font-size: 12px;
      color: #666;
    }
    select:active,
    select:focus {
      border: 1px solid #5986e1;
    }
    select option:hover {
      background-color: #5986e1;
    }
    select option[selected] {
      background-color: #5986e1;
    }
    /* checkbox & radio */
    input[type='checkbox'],
    input[type='radio'] {
      z-index: 1;
      height: 12px;
      width: 12px;
      margin: 0;
    }
</style>