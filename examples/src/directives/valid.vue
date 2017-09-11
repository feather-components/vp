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