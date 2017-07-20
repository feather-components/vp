<template>
    <div class="demo-wrap">
        <div class="cmp-name">vp-form</div>
        <div class="demo-block">
            <div class="demo-title">示例1:</div>
            <div class="demo-instance">
                <vp-form labelSuffix=":" ref="searchForm">
                    <vp-form-item label="abc" name="name" labelWidth="50px" initValue="1">
                        <input></input>
                    </vp-form-item>
                    <vp-form-item label="checkbox" name="age" labelWidth="90px" initValue="1">
                        <input type="checkbox" value="1"></input>
                    </vp-form-item>
                    <vp-form-item label="radio" name="max" labelWidth="60px" initValue="1">
                        <input type="radio" value="1"></input>
                    </vp-form-item>
                    <vp-form-item label="select" name="city" labelWidth="60px" initValue="1">
                        <select>
                            <option value='1'>北京</option>
                            <option value='2'>上海</option>
                            <option value='3'>广州</option>
                            <option value='4'>南京</option>
                            <option value='5'>土水之山</option>
                        </select>
                    </vp-form-item>
                    
                </vp-form>
            </div>
            <br/>
            <button @click="getFormData">获取表单</button>
            <button @click="formReset">重置</button>
            
        </div>
        <div class="demo-block" style="border-top: 1px #ccc solid;">
            <div class="demo-title">formData</div>
            {{formData}}
        </div>
    </div>
</template>

<script>
    import '@/components/form/form.js';

    export default {
        data () {
            return {
                total1: 15,
                formData: ''
            };
        },

        mounted () {
            this.searchForm = this.$refs.searchForm;
        },

        methods: {
            getFormData () {
                let obj = this.searchForm.getFields();
                this.formData = JSON.stringify(obj);
            },
            formReset () {
                this.searchForm.reset();
            }
        },

        watch: {
        }

    };

</script>
