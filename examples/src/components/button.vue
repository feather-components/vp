<template>
    <div>
        <br/>
        <br/>
        <br/>
        <div class="buttons-wrap">
            <div class="buttons-wrap-title">1st Button</div>
            <div class="buttons-list">
                <btn size="large">main</btn>
                <btn type="success" size="large">success</btn>
                <btn type="danger" size="large">danger</btn>
                <btn type="sys" size="large">sys</btn>
                <btn type="plain" size="large">plain</btn>
                <btn type="highlight" size="large">highlight</btn>
            </div>
            <div class="desc">
                文字距离边缘最小宽度为24px，button最小宽度96px
            </div>
        </div>
        <div class="buttons-wrap">
            <div class="buttons-wrap-title">2nd Button</div>
            <div class="buttons-list">
                <btn size="normal">main</btn>
                <btn type="success" size="normal">success</btn>
                <btn type="danger" size="normal">danger</btn>
                <btn type="sys" size="normal">sys</btn>
                <btn type="plain" size="normal">plain</btn>
                <btn type="highlight" size="normal">highlight</btn>
            </div>
            <div class="desc">
                文字距离边缘最小宽度为8px，button最小宽40px
            </div>
        </div>
        <div class="buttons-wrap">
            <div class="buttons-wrap-title">3rd Button</div>
            <div class="buttons-list">
                <btn size="small">main</btn>
                <btn type="success" size="small">success</btn>
                <btn type="danger" size="small">danger</btn>
                <btn type="sys" size="small">sys</btn>
                <btn type="plain" size="small">plain</btn>
                <btn type="highlight" size="small">highlight</btn>
            </div>
            <div class="desc">
                文字距离边缘最小宽度为24px，button最小宽度96px
            </div>
        </div>
        
        <div class="buttons-wrap">
            <div class="buttons-wrap-title">Text Link</div>
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
<style scoped>
    
    .desc{
        margin-bottom: 54px;
        font-size: 14px;
    }
    
    .buttons-wrap-title{
        margin-bottom: 16px;
        font-size: 14px;
        color: #666;
    }

    .buttons-list button{
        margin-right: 30px;
    }

    .buttons-list{
        margin-bottom: 16px;
    }
</style>