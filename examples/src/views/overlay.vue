<template>
    <div>
        <btn :types="['small']" @click="showMask">mask</btn>
    </div>
</template>
<script>
    import { Button } from 'vpui';
    export default {
        components: {
            btn: Button
        },
        methods: {
            showMask(){
                alert('mask');
            }
        }
    }
</script>
<style>

</style>