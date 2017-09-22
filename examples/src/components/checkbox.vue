<template>
<div class="content">
    <p>checkbox示例1</p>
    <label><vp-checkbox /> Normal</label>
    <label class="disabled"><vp-checkbox disabled /> Disabled</label>
    <label><vp-checkbox checked /> Checked</label>
    <label class="disabled"><vp-checkbox disabled checked /> Disabled Checked</label>
    <label><vp-checkbox :part="true" checked /> Part</label>
    <label class="disabled"><vp-checkbox :part="true" disabled checked /> Disabled Part</label>

    <p>checkbox示例2</p>
    <label><vp-checkbox :value="1" v-model="val" /> checkbox1</label></label>
    <label><vp-checkbox :value="2" v-model="val" /> checkbox2</label></label>
    <label><vp-checkbox :value="3" v-model="val" /> checkbox3</label></label>
    <div>已选择：{{ val }}</div>

    <p>checkbox示例3</p>
    <div>
        <label><vp-checkbox :checked="parts.length !== 0" :part="parts.length > 0 && parts.length < 3" @change="checkall"/> 全选/反选</label>
        <div>
            <label><vp-checkbox :value="1" v-model="parts"/> part1</label>
            <label><vp-checkbox :value="2" v-model="parts"/> part2</label>
            <label><vp-checkbox :value="3" v-model="parts"/> part3</label>
        </div>
        <div>已选择：{{ parts }}</div>
    </div>
</div>
</template>
<script>
import { Checkbox } from 'vpui';
export default {
    name: 'checkbox-page',
    components: {
        'vp-checkbox': Checkbox
    },
    data() {
        return {
            val: [2],
            parts: [2]
        }
    },
    methods: {
        checkall(e) {
            this.parts = e.target.checked ? [1,2,3] : [];
        }
    }
}
</script>
<style leng="less" scoped>
    p {
        margin: 20px 0 5px;
    }
    label {
        font-size: 14px;
        margin-right: 10px;
    }
    .disabled {
        color: #d9d9d9;
    }
</style>