<template>
    <div>
        <div>
            <btn :types="['small']">small</btn>
            <btn :types="['small-o','small']">small-o</btn>
            <btn :types="['success','small']">success</btn>
            <btn :types="['success','small','small-o']">success</btn>
            <btn :types="['danger','small']">danger</btn>
            <btn :types="['danger','small','small-o']">danger</btn>
            <btn :types="['sys', 'small']">sys</btn>
            <btn :types="['sys','small','small-o']">sys</btn>
            <btn :types="['plain', 'small']">plain</btn>
            <btn :types="['plain', 'small', 'small-o']">plain</btn>
            <btn :types="['highlight', 'small']">highlight</btn>
            <btn :types="['highlight', 'small', 'small-o']">highlight</btn>
        </div>
        <div>
            <btn>main</btn>
            <btn :types="['success']">success</btn>
            <btn :types="['danger']">danger</btn>
            <btn :types="['sys']">sys</btn>
            <btn :types="['plain']">plain</btn>
            <btn :types="['highlight']">highlight</btn>
        </div>
        <div>
            <btn :types="['large']">large</btn>
            <btn :types="['success','large']">success</btn>
            <btn :types="['danger','large']">danger</btn>
            <btn :types="['sys','large']">sys</btn>
            <btn :types="['plain','large']">plain</btn>
            <btn :types="['highlight','large']">highlight</btn>
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