<template>
    <div class="demo-wrap">
        <div clsss="demo-block">
            <div class="demo-title">示例1: （默认）</div>
            <div class="demo-code">
                <code>&lt;vp-pager ref="pagination"&gt;&lt;/vp-pager&gt;</code>
            </div>
            <div class="demo-instance">
                <vp-pager ref="pagination"></vp-pager>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/components/pager/pager.js';

    export default {

        mounted () {
            // alert('dd');
            var self = this;
            self.$refs.pagination.setPage(10);
        }

    };

</script>


<style>
    body{
        margin: 0;
        padding: 0;
        font-size: 12px;
        -webkit-padding-start: 0;
    }
    ul, menu, dir{
        list-style-type: disc;
        -webkit-margin-before: 1em;
        -webkit-margin-after: 1em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0;
        -webkit-padding-start: 0;
    }
</style>