<template>
    <div>
        <vp-tablepager :total="total" :current="current" @to="callback">
        </vp-tablepager>
        <vp-tablepager :total="total" :current="current" @to="callback" :position="'right'" :volumn="15" :sizeList="[20,40,60,80]">
        </vp-tablepager>
        <table class='lg-table'>
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Example</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>to</td>
                    <td v-html="msg" class="lg-color-plain-bg"></td>
                </tr>
            </tbody>
        </table>
        <table class='lg-table'>
            <thead>
                <tr>
                    <th>Props</th>
                    <th>Required</th>
                    <th>Type</th>
                    <th>Memo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>total</td>
                    <td>True</td>
                    <td>Int</td>
                    <td>数据总数</td>
                </tr>
                <tr>
                    <td>current</td>
                    <td>True</td>
                    <td>Int</td>
                    <td>当前页码。默认：1。</td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>True</td>
                    <td>Int</td>
                    <td>单页容量。默认：10</td>
                </tr>
                <tr>
                    <td>sizeList</td>
                    <td>False</td>
                    <td>Attay</td>
                    <td>单页容量选项。默认：[10,20,50]</td>
                </tr>
                <tr>
                    <td>position</td>
                    <td>False</td>
                    <td>String</td>
                    <td>组件位置。默认：center。可识别项：left,right。</td>
                </tr>
                <tr>
                    <td>volumn</td>
                    <td>False</td>
                    <td>Int</td>
                    <td>页码数量显示上限。默认：10，必须是大于5的整数。</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import {
    Tablepager
} from 'vpui';

export default {
    components: {
        "vp-tablepager": Tablepager
    },
    data() {
        return {
            current: 5,
            total: 1500,
            size: 15,
            volumn: 20,
            msg: 'current page is :',
            n: ''
        }
    },
    methods: {
        callback(page) {
            this.msg = 'current page is :' + page;
        },
        test(n) {
        }
    }
}
</script>