<template>
    <div> 
            
            <div class="lg-grid-6">
                <div class="lg-form-line" v-valid="{required:true}">
                    <label>checkbox：</label>
                    <span class="lg-checkbox-plain">
                        <input type="checkbox" name="checkgroup-f" id="cg1-f"/><label for="cg1-f">High</label>
                    </span>
                    <span class="lg-checkbox">
                        <input type="checkbox" name="checkgroup-f" id="cg2-f"/><label for="cg2-f">Normal</label>
                    </span>
                    <span class="lg-checkbox">
                        <input type="checkbox" name="checkgroup-f" id="cg3-f"/><label for="cg3-f">Low</label>
                    </span>
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
                    <label>区间2~5：</label><input type="text" v-valid="{required: true, range: [2,5]}">
                </div>
                <div class="lg-form-line">
                    <label>长度6：</label><input type="text" v-valid="{required: true, length: 6}">
                </div>
            </div>
            <div class="lg-grid-12"> 
                <button type="button" class="lg-btn" @click="check()">保存</button>
            </div> 
    </div>
</template>
<script>
    import {
        Valid
    } from 'vpui';

    export default{
        directives: {
            "valid":Valid
        },
        methods:{
            check(){
                this.$vform['default'].checkAll();
            }
        }
    }
</script>