<template>
<div class="tab-example">
    <vp-tabs @changed="change1" class="vp-tab--surround">
        <vp-tabpanel v-for="i in 10" :label="'tab' + i" :index="i">{{ i }}</vp-tabpanel>
    </vp-tabs>
    <br/>
    <vp-tabs>
        <vp-tabpanel v-for="i in 5" :label="'tab' + i" :index="i">{{ i }}</vp-tabpanel>
    </vp-tabs>
    <br/>
    <vp-tabs :isManual = "true" ref="mandualTab">
        <vp-tabpanel label="user" index="user">user</vp-tabpanel>
        <vp-tabpanel label="role" index="role">role</vp-tabpanel>
        <vp-tabpanel label="prvi" index="prvi">prvi</vp-tabpanel>
        <vp-tabpanel label="red" index="red">red</vp-tabpanel>
        <vp-tabpanel label="green" index="green">green</vp-tabpanel>
    </vp-tabs>
    <br/>
    <btn @click="chooseTab($refs.mandualTab, 'user')">选择 tab</btn>
    
</div>
</template>
<script>
import { Tabs, TabPanel,Button } from 'vpui'
export default {
    name: 'tab-page',
    components: {
        'vp-tabs': Tabs,
        'vp-tabpanel': TabPanel,
        btn: Button
    },
    methods: {
        change1(tab) {
            console.log(tab);
        },
        change2(tab) {
            console.log(tab);
        },
        chooseTab(tab, index){
            tab.to(index);
        }
    }
}
</script>
<style>
    .tab-example{
        background-color: #ccc;
        padding: 20px;
    }
</style>
