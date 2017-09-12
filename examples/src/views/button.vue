<template>
    <div>
        <div>
            <btn size="small">main</btn>
            <btn type="success" size="small">success</btn>
            <btn type="danger" size="small">danger</btn>
            <btn type="sys" size="small">sys</btn>
            <btn type="plain" size="small">plain</btn>
            <btn type="highlight" size="small">highlight</btn>
        </div>
        <div>
            <btn size="normal">main</btn>
            <btn type="success" size="normal">success</btn>
            <btn type="danger" size="normal">danger</btn>
            <btn type="sys" size="normal">sys</btn>
            <btn type="plain" size="normal">plain</btn>
            <btn type="highlight" size="normal">highlight</btn>
        </div>
        <div>
            <btn size="large">main</btn>
            <btn type="success" size="large">success</btn>
            <btn type="danger" size="large">danger</btn>
            <btn type="sys" size="large">sys</btn>
            <btn type="plain" size="large">plain</btn>
            <btn type="highlight" size="large">highlight</btn>
        </div>
    </div>
</template>
<script>
    import { Button } from 'vpui';
    export default {
        components: {
            btn: Button
        }
    }
</script>
<style>

</style>