<template> 
    <vp-table :thead="table.head" :tdata="table.data" :colspan="table.colspan"></vp-table>
</template>


<script>
    import {
        Table
    } from 'vpui';

    export default{
        components: {
            "vp-table":Table
        },
        data(){
            return {
                table:{
                    head:{
                        sName: '姓名',
                        sMoblie: '手机号码',
                        sCityName: '城市',
                        sCreateTime: '抽奖时间',
                        sType: '类型',
                        sPrizeName: '奖品',
                        sUserMobile: '获奖联系方式',
                        sBeizhu: '备注',
                        sStatus: '状态',
                        option: { label: '操作', type: 'option' }
                    },
                    data:[],
                    colspan:10
                }
            }
        }
    }
</script>