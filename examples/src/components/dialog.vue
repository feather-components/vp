<template>
    <div>
        <br>
        <btn @click="showDefaultDialog">默认dialog</btn>
        <vp-dialog ref="defaultDialog"></vp-dialog>

        <btn @click="showCustomDialog">自定义dialog</btn>
        <vp-dialog ref="customDialog">
            <div slot="title">这里是自定义标题</div>
            <div slot="content">这里是自定义内容</div>
            <div slot="btns">
                <btn type="main" @click="ok">ok</btn>
                <btn type="plain" @click="cancel">cancel</btn>
            </div>
        </vp-dialog>
    </div>
</template>

<script>
    import { Button, Dialog, Mask } from 'vpui';

    export default {
        components: {
            btn: Button,
            vpDialog: Dialog,
            vpMask: Mask
        },
        data() {
            return {

            }
        },
        methods: {
            showDefaultDialog() {
                // Mask.show();
                this.$refs.defaultDialog.open();
            },
            showCustomDialog() {
                // Mask.show();
                this.$refs.customDialog.open();
            },
            ok() {
                alert('ok');
            },
            cancel() {
                alert('cancel');
                // Mask.hide();
                this.$refs.customDialog.close();
            }
        }
    }
</script>