<template>
    <div class="clearfix">
        <form>
            <slot>form</slot>
        </form>
    </div>
</template>
<script>
    export default {
        cmpName: 'vp-form',
        data () {
            return {
                labelSuffix: '：',
                fields: []
            };
        },
        props: {

        },
        methods: {
            getFormData () {
                var obj = {};
                this.fields.forEach((item) => {
                    let field = item.getField();
                    obj[field.name] = field.value;
                });
                return obj;
            },
            reset () {
                this.fields.forEach((item) => {
                    item.resetField();
                });
            },
            setValue (fieldName, value) {
                this.fields.forEach((item) => {
                    if (item.name === fieldName) {
                        item.setValue(value);
                    }
                });
            }
        },
        mounted () {

        }
    };
</script>
<style>
    .vp-form-line,
    .vp-form-block,
    .vp-form-box {
      margin-top: 5px;
      padding-left: 100px;
      position: relative;
      min-height: 30px;
    }
    .vp-form-line label,
    .vp-form-block label,
    .vp-form-box label {
      width: 100px;
      position: absolute;
      top: 0;
      left: 0;
      line-height: 30px;
      text-align: right;
      font-size: 12px;
    }
    .vp-form-line input + span,
    .vp-form-block input + span,
    .vp-form-box input + span {
      margin-right: 5px;
    }
    .vp-form-line label + span,
    .vp-form-block label + span,
    .vp-form-box label + span {
      line-height: 30px;
      margin-left: 5px;
      display: inline-block;
    }
    .vp-form-line *[class^='vp-btn'],
    .vp-form-block *[class^='vp-btn'],
    .vp-form-box *[class^='vp-btn'] {
      margin-top: 0;
      margin-bottom: 0;
    }
    .vp-form-line span,
    .vp-form-block span,
    .vp-form-box span {
      word-break: break-all;
      margin-right: 5px;
    }
</style>
