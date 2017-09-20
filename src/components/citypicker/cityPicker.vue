<template>
    <a :class="[className,'city-picker']" @blur="handleBlur">
        <div class="vp-picker-rel" ref="pickerRel" @click="pickerClick">
            <slot>全国</slot>
        </div>
        <overlay :visible="false" class="vp-picker-overlay ui3-citypicker-overlay" position="center" ref="pickerOverlay" @click.native.stop="clickPickerContent();" @open="overlayOpen()">
            <slot name="picker-content">
                <div class="ui3-citypicker-ws">
                    <a href="javascript:" v-for="word in words"> {{ word }}</a>
                </div>
                <div class="ui3-citypicker-list">
                    <div class="ui3-citypicker-wl" v-for="word in words">
                        <div class="ui3-citypicker-wm">{{word}}</div>
                        <div class="ui3-citypicker-items">
                            <a href="javascript:" v-for="city in getCitysByWord(word)">{{city.name}}</a>
                        </div>
                    </div>
                </div>
            </slot>
        </overlay>
    </a>
</template>

<script>
    import Picker from '../picker';
    export default {
        name: 'cityPicker',
        mixins: [Picker],
        props: {
            source: Object
        },
        data(){
            return {

            }
        },

        methods: {
            getCitysByWord(word){
                var list = [];
                word = word.toUpperCase();

                for(let key in this.source){
                    let city = this.source[key];
                    if(city.word == word){
                        list.push({
                            id: key,
                            name: city.name
                        });
                    }
                }

                return list;
            }
        },

        computed: {
            words(){
                var arr = [];
                for(var i = 65; i < 91; i++){
                    arr.push(String.fromCharCode(i));
                }
                return arr;
            }
        },

        mounted(){
            console.log('mounted');
        }
    }
</script>

<style>
    .city-picker .ui3-citypicker-overlay{
        width: 420px;
        padding-bottom: 10px;
    }

    .ui3-citypicker-ws{
        margin: 20px 14px 0px 14px;
        border-bottom: 2px solid #e1e1e1;;
    }

    .ui3-citypicker-ws a{
        position: relative;
        top: 2px;
        font-size: 14px;
        color: #999;
        width: 15px;
        padding-bottom: 5px;
        display: inline-block;
        text-align: center;
        border-bottom: 2px solid transparent;
    }

    .ui3-citypicker-ws a:hover{
        border-bottom: 2px solid #5986E1;
    }

    .ui3-citypicker-list{
        margin: 10px 17px;
        height: 230px;
        overflow: auto;
    }

    .ui3-citypicker-wl{
        clear: both;
        margin-bottom: 20px;
    }

    .ui3-citypicker-wm{
        float: left;
        font-size: 14px;
        width: 12px;
        margin-left: 2px;
        display: block;
        color: #5986E1;
        line-height: 16px;
        height: 16px;
    }

    .ui3-citypicker-items{
        margin-left: 15px;
    }

    .ui3-citypicker-items a{
        margin-bottom: 5px;
        color: #666;
        width: 48px;
        display: inline-block;
        margin-left: 10px;
        line-height: 16px;
        height: 16px;
    }

    .ui3-citypicker-items a:hover, .ui3-citypicker .ui3-citypicker-selected{
        color: #5986E1;
        text-decoration: underline;
    }

    .ui3-citypicker .ui3-citypicker-lw{
        width: 106px;
    }

    .ui3-citypicker-disabled{
        color: #ccc !important;
    }

    .ui3-citypicker-disabled:hover{
        color: #ccc !important;
        text-decoration: none;
    };
</style>