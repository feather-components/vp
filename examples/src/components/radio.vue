<template>
<div class="content">
    <p>radio示例1</p>
    <label><vp-radio /> Normal</label>
    <label class="disabled"><vp-radio disabled /> Disabled</label>
    <label><vp-radio checked /> Checked</label>
    <label class="disabled"><vp-radio checked disabled /> Disabled Checked</label>

    <p>radio示例2</p>
    <label><vp-radio :value="1" v-model="val" name="radio" /> radio1</label>
    <label><vp-radio :value="2" v-model="val" name="radio" /> radio2</label>
    <label><vp-radio :value="3" v-model="val" name="radio" /> radio3</label>
    <div>当前选中：{{ val }}</div>
</div>
</template>
<script>
import { Radio } from 'vpui';
export default {
    name: 'radio-page',
    components: {
        'vp-radio': Radio
    },
    data() {
        return {
            val: 2
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