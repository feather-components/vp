<template>
    <div class="demo-wrap">
        <div class="demo-block">
            <div class="demo-title">示例1:</div>
            props:
            <div class="demo-code">
                <code>&lt;vp-pager ref="pagination1"&gt;&lt;/vp-pager&gt;</code>
            </div>
            <div class="demo-code">
                JS：
                <code>self.$refs.pagination1.setPage(total1);</code>
            </div>
            <div>
                
            </div>
            <div>请输入 total1：<input v-model="total1"></input></div>
            <div class="demo-instance">
                <vp-pager ref="pagination1" v-on:to="pageTo1"></vp-pager>
            </div>
        </div>
         <div class="demo-block">
            <div class="demo-title">示例2:</div>
            props:
            <div class="demo-code">
                <code>&lt;vp-pager ref="pagination2"  :visibleCount="5"&gt;&lt;/vp-pager&gt;</code>
            </div>
            <div class="demo-code">
                JS：
                <code>self.$refs.pagination2.setPage(total2);</code>
            </div>
            <div>
                
            </div>
            <div>请输入 total2：<input v-model="total2"></input></div>
            <div class="demo-instance">
                <vp-pager ref="pagination2" v-on:to="pageTo2" :visibleCount="5"></vp-pager>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/components/pager/pager.js';

    export default {
        data () {
            return {
                total1: 1,
                total2: 3
            };
        },

        mounted () {
            // alert('dd');
            this.$refs.pagination1.setPage(this.total1);
            this.$refs.pagination2.setPage(this.total2);
        },

        methods: {
            pageTo1 (index) {
                this.$refs.pagination1.setPage(this.total1, index);
            },
            pageTo2 (index) {
                this.$refs.pagination2.setPage(this.total2, index);
            }
        },

        watch: {
            total1 () {
                this.$refs.pagination1.setPage(this.total1);
            },
            total2 () {
                this.$refs.pagination2.setPage(this.total2);
            }
        }

    };

</script>


<style scope>
    .demo-wrap{
        padding: 10px;
    }
    .demo-block{
        padding: 10px;
    }
    .demo-title{
        margin-bottom: 10px;
    }
    .demo-code{
        border: 1px #ccc dashed;
        padding: 20px;
        margin-bottom: 5px;
    }

</style>