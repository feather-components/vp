<template>
    <div class="demo-wrap">
        <div class="demo-block">
            <div class="demo-title">示例1:</div>
            <div class="demo-code">
                <code>&lt;vp-pager ref="pagination1"&gt;&lt;/vp-pager&gt;</code>
            </div>
            <div>请输入 total1：<input class="demo-input" v-model="total1"></input></div>
            <div class="demo-instance">
                <vp-pager ref="pagination1" v-on:to="pageTo1"></vp-pager>
            </div>
        </div>
        <div class="demo-block">
            <div class="demo-title">示例2:</div>
            <div class="demo-code">
                <code>&lt;vp-pager ref="pagination2"  :visibleCount="5"&gt;&lt;/vp-pager&gt;</code>
            </div>
            <div>请输入 total2：<input class="demo-input" v-model="total2"></input></div>
            <div class="demo-instance">
                <vp-pager ref="pagination2" v-on:to="pageTo2" :visibleCount="5"></vp-pager>
            </div>
        </div>
        <div class="demo-block">
            <div class="demo-title">示例3:</div>
            <div class="demo-code">
                <code>&lt;vp-pager ref="pagination3" :showShortCut="true"  &gt;&lt;/vp-pager&gt;</code>
            </div>
            <div class="demo-instance">
                <vp-pager ref="pagination3" v-on:to="pageTo3"  :showShortCut="true" ></vp-pager>
            </div>
        </div>
        <div class="demo-block">
            <div class="demo-title">示例4:</div>
            <div class="demo-code">
                <code>&lt;vp-pager ref="pagination4" :showFirstBtn="false" :showLastBtn="false"  &gt;&lt;/vp-pager&gt;</code>
            </div>
            <div>请输入 total4：<input class="demo-input" v-model="total4"></input></div>
            <div class="demo-instance">
                <vp-pager ref="pagination4" v-on:to="pageTo4"  :showFirstBtn="false" :showLastBtn="false" ></vp-pager>
            </div>
        </div>
         <div class="demo-block">
            <div class="demo-title">示例5:</div>
            <div class="demo-code">
                <code>&lt;vp-pager ref="pagination5"  previous="" next=""  &gt;&lt;/vp-pager&gt;</code>
            </div>
            <div class="demo-instance">
                <vp-pager ref="pagination5" previous="" next=""></vp-pager>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/components/pager/pager.js';

    export default {
        data () {
            return {
                total1: 15,
                total2: 7,
                total3: 17,
                total4: 13
            };
        },

        mounted () {
            // alert('dd');
            this.$refs.pagination1.setPage(this.total1);
            this.$refs.pagination2.setPage(this.total2);
            this.$refs.pagination3.setPage(17);
            this.$refs.pagination4.setPage(this.total4);
            this.$refs.pagination5.setPage(12);
        },

        methods: {
            pageTo1 (index) {
                this.$refs.pagination1.setPage(this.total1, index);
            },
            pageTo2 (index) {
                this.$refs.pagination2.setPage(this.total2, index);
            },
            pageTo3 (index) {
                this.$refs.pagination3.setPage(this.total3, index);
            },

            pageTo4 (index) {
                this.$refs.pagination4.setPage(this.total4, index);
            }
        },

        watch: {
            total1 () {
                this.$refs.pagination1.setPage(this.total1);
            },
            total2 () {
                this.$refs.pagination2.setPage(this.total2);
            },
            total4 () {
                this.$refs.pagination4.setPage(this.total4);
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
    .demo-block .demo-input{
        padding: 3px 5px;
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