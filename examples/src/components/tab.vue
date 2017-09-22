<template>
<div class="tab">
    <vp-tabs id="1" @changed="change1">
        <vp-tab v-for="i in 10" :name="'tab' + i" class="tab-panel" :key="i">{{ i }}</vp-tab>
    </vp-tabs>
    <vp-tabs style-type="surround" @changed="change2">
        <vp-tab v-for="i in 5" :name="'tab' + i" class="tab-panel" :key="i">{{ i }}</vp-tab>
    </vp-tabs>
</div>
</template>
<script>
import { Tabs, Tab } from 'vpui'
export default {
    name: 'tab-page',
    components: {
        'vp-tabs': Tabs,
        'vp-tab': Tab
    },
    methods: {
        change1(tab) {
            console.log(tab);
        },
        change2(tab) {
            console.log(tab);
        }
    }
}
</script>
<style lang="less" scoped>
.tab {
    margin-top: 20px;
    &-panel {
        padding: 20px;
    }
}
</style>