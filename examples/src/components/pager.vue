<template>
    <div>
        <span>分页外面</span>
        <vp-pager :total="total" :current="current" @to="callback">
        </vp-pager>
        <vp-pager :total="total" :current="current" @to="callback" :position="'left'" :volumn="volumn">
        </vp-pager>
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
                    <td>总页码数</td>
                </tr>
                <tr>
                    <td>current</td>
                    <td>True</td>
                    <td>Int</td>
                    <td>当前页码。默认：1。</td>
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
    Pager
} from 'vpui';

export default {
    components: {
        "vp-pager": Pager
    },
    data() {
        return {
            current: 5,
            total: 150,
            volumn: 20,
            msg: 'current page is :'
        }
    },
    methods: {
        callback(page) {
            console.log(123);
            this.msg = 'current page is :' + page;
        }
    }
}
</script>