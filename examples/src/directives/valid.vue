<template>
    <div> 
        <div class="lg-grid-6">
            <div class="lg-form-line" v-valid="{required:true}">
                <label>checkbox：</label>
                <span class="lg-checkbox-plain">
                    <input type="checkbox" name="checkgroup-f" id="cg1-f"/><label for="cg1-f">High</label>
                    <!-- <label><vp-checkbox :value="1" />High</label> -->
                </span>
                <span class="lg-checkbox">
                    <input type="checkbox" name="checkgroup-f" id="cg2-f"/><label for="cg2-f">Normal</label>
                    <!-- <label><vp-checkbox :value="2" />Normal</label> -->
                </span>
                <span class="lg-checkbox">
                    <input type="checkbox" name="checkgroup-f" id="cg3-f"/><label for="cg3-f">Low</label>
                    <!-- <label><vp-checkbox :value="3" />Low</label> -->
                </span>
            </div>
            
            <div class="lg-form-line" v-valid="{required: true}">
                <label>radio：</label>
                <span class="lg-radio">
                    <label><vp-radio :value="1" name="pet" />dog</label>
                    <label><vp-radio :value="2" name="pet" />cat</label>
                    <!-- <input type="radio" name="animal" id="a1"><label for="a1">dog</label> -->
                    <!-- <input type="radio" name="animal" id="a2"><label for="a2">cat</label> -->
                </span>
            </div>

            <div class="lg-form-line">
                <label>select：</label>
                <select name="" id="" v-valid="{required: true}">
                    <option value="">请选择</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>

            <div class="lg-form-line">
                <label>手机号码：</label><input type="text" v-valid="{required: true, mobile: true}">
            </div>
            <div class="lg-form-line">
                <label>身份证号：</label><input type="text" v-valid="{required: true, idcard: true}">
            </div>
            <div class="lg-form-line">
                <label>邮箱地址：</label><input type="text" v-valid="{required: true, email: true}">
            </div>
            <div class="lg-form-line">
                <label>数字：</label><input type="text" v-valid="{required: true, number: true}">
            </div>
            <div class="lg-form-line">
                <label>数值：</label><input type="text" v-valid="{required: true, float: true}">
            </div>
            <div class="lg-form-line">
                <label>整数：</label><input type="text" v-valid="{required: true, int: true}">
            </div>
            <div class="lg-form-line">
                <label>区间2~5：</label><input type="text" v-valid="{required: true, float: true, range: [2,5]}">
            </div>
            <div class="lg-form-line">
                <label>长度6：</label><input type="text" v-valid="{required: true, length: 6}">
            </div>
            <div class="lg-form-line">
                <label>textarea：</label>
                <textarea name="" v-valid="{required: true}"></textarea>
            </div>
        </div>
        <div class="lg-grid-12"> 
            <btn size="normal" @click="check()">保存</btn>
        </div> 
    </div>
</template>
<script>
    import {
        Valid, Toast, Button, Radio, Checkbox
    } from 'vpui';
    
    export default{
        components: {
            'btn': Button,
            'vp-radio': Radio,
            'vp-checkbox': Checkbox,
        },
        directives: {
            "valid":Valid
        },
        methods:{
            check(){
                let errLen = this.$vform['default'].checkAll().length;
                this.$vform['default'].checkAll();
                !errLen && Toast.success('验证通过，发送请求', true);
            }
        }
    }
</script>
<style scoped>
    .lg-checkbox-plain label,
    .lg-checkbox label,
    .lg-radio label {
        position: static;
        margin-right: 10px;
    }
    .lg-radio .radio{
        vertical-align: sub;
        margin-right: 5px;
    }
    .lg-checkbox-plain .checkbox,
    .lg-checkbox .checkbox{
        margin-right: 5px;
    }
</style>