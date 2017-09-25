<template>
<div class="content">
    <div>
        <p>Single Select</p>
        <vp-select v-model="val" :options="list" @select="function(o){ option = o }"></vp-select>
        <span>当前选项值：{{ val }}， 选择项：{{ option }}</span>
    </div>
    <div>
        <p>Single Disabled Part Options</p>
        <vp-select v-model="val2" :options="list2" @select="function(o){ option2 = o }"></vp-select>
        <span>当前选项值：{{ val2 }}， 选择项：{{ option2 }}</span>
    </div>
    <div>
        <p style="color: #ccc">Single Disabled</p>
        <vp-select v-model="val3" :disabled="true" :options="list3" @select="function(o){ option3 = o }"></vp-select>
        <span>当前选项值：{{ val3 }}， 选择项：{{ option3 }}</span>
    </div>
    <div>
        <p>Multiple Select</p>
        <vp-select width="350" type="multiple" v-model="val4" :options="list4" @select="function(o){ option4 = o }"></vp-select>
        <span>当前选项值：{{ val4 }}， 选择项：{{ option4 }}</span>
    </div>
    <div>
        <p>Multiple Disabled Part Options</p>
        <vp-select width="350" type="multiple" v-model="val5" :options="list5" @select="function(o){ option5 = o }"></vp-select>
        <span>当前选项值：{{ val5 }}， 选择项：{{ option5 }}</span>
    </div>
    <div style="color: #ccc">
        <p>Multiple Disabled</p>
        <vp-select width="350" type="multiple" v-model="val6" :options="list6" :disabled="true" @select="function(o){ option6 = o }"></vp-select>
        <span>当前选项值：{{ val6 }}， 选择项：{{ option6 }}</span>
    </div>
</div>
</template>
<script>
import { Select } from 'vpui';
const arr = new Array(5).fill(true).map((item, i) => ({ value: i + 1, text: `option${ i + 1 }` }));
export default {
    name: 'select-page',
    components: {
        'vp-select': Select
    },
    data() {
        return {
            val: 2,
            option: {},
            list: [...arr],

            val2: 1,
            option2: {},
            list2: [...arr].concat([{ value: 6, text: 'option6', disabled: true }, { value: 7, text: 'option7', disabled: true }]),

            val3: 1,
            option3: {},
            list3: [...arr],

            val4: [2,3,5],
            option4: {},
            list4: [...arr],

            val5: [1,5],
            option5: {},
            list5: [...arr].concat([{ value: 6, text: 'option6', disabled: true }, { value: 7, text: 'option7', disabled: true }]),

            val6: [1,3],
            option6: {},
            list6: [...arr],
        }
    }
}
</script>
<style leng="less" scoped>
.content{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
}
.content > div {
    margin-bottom: 50px;
    width: 33.33%;
}
p {
    margin: 20px 0 10px;
    font-weight: bold;
}
</style>