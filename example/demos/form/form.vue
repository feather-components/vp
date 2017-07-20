<template>
    <div class="demo-wrap">
        <div class="cmp-name">vp-form</div>
        <div class="demo-block">
            <div class="demo-title">示例1:</div>
            <div class="demo-instance">
                <vp-form labelSuffix=":">
                    <vp-form-item label="abc">
                        <input></iput>
                    </vp-form-item>
                </vp-form>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/components/form/form.js';

    export default {
        data () {
            return {
                total1: 15
            };
        },

        mounted () {
        },

        methods: {
        },

        watch: {
        }

    };

</script>
