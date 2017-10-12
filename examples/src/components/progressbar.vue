<template>
    <div>
        <br>
        <progress-bar :scale="80"></progress-bar>
        <br><br>
        <progress-bar :scale="50" :error="true"></progress-bar>
        <br><br>
        <progress-bar :scale="100"></progress-bar>
        <br><br>
        <progress-bar :scale="80" type="small"></progress-bar>
        <br><br>
        <progress-bar :scale="50" type="small" :error="true"></progress-bar>
        <br><br>
        <progress-bar :scale="100" type="small"></progress-bar>
    </div>
</template>
<script>
    import {ProgressBar} from 'vpui';
    export default {
        methods:{
        },
        components: {
            progressBar: ProgressBar
        }
    }
</script>
<style scoped>
</style>