<template>
    <a :class="[className,'city-picker']" @blur="handleBlur">
        <div class="vp-picker-rel" ref="pickerRel" @click="pickerClick">
            <slot>全国</slot>
        </div>
        <overlay :visible="false" class="vp-picker-overlay ui3-citypicker-overlay" position="center" ref="pickerOverlay" @click.native.stop="clickPickerContent();" @open="overlayOpen()">
            <slot name="picker-content">
                <div class="ui3-citypicker-ws">
                    <a href="javascript:" v-for="word in words" @click="chooseWord(word)"> {{ word }}</a>
                </div>
                <div class="ui3-citypicker-list" ref="cityList" id="J-ui3-citypicker-list">
                    <div class="ui3-citypicker-wl" v-for="word in words" :ref="'cityBlock'+word">
                        <div class="ui3-citypicker-wm">{{word}}</div>
                        <div class="ui3-citypicker-items">
                            <a href="javascript:" v-for="city in getCitysByWord(word)" :class="cityNameClass(city)" @click="chooseCity(city)">{{city.name}}</a>
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
            source: Object,
            isMultiple: {
                type: Boolean,
                default: false,
            }
        },
        data(){
            return {
                citySource: this.source,
                words: [],
                choosedCitys: [],
            }
        },

        methods: {
            getCitysByWord(word){
                var list = [];
                word = word.toUpperCase();

                for(let key in this.citySource){
                    let city = this.citySource[key];
                    if(city.word == word){
                        list.push({
                            id: key,
                            name: city.name,
                            choosed: city.choosed,
                        });
                    }
                }

                return list;
            },

            cityNameClass(city){
                let className = [];
                if(city.name.length > 4){
                    className.push('ui3-citypicker-lw');
                }
                if(city.choosed){
                    className.push('ui3-citypicker-city-choosed');
                }

                return className.join(' ');
            },

            chooseWord(word){
                let top = this.$refs['cityBlock'+word][0].offsetTop;
                this.$refs.cityList.scrollTop = top;
            },

            chooseCity(city){
                let citySourceItem = this.citySource[city.id];
                citySourceItem['choosed'] = citySourceItem['choosed'] ? false : true;
                if(!this.isMultiple){
                    if(this.choosedCitys.length === 1){
                        if(city.id != this.choosedCitys[0].id){
                            this.citySource[this.choosedCitys[0].id]['choosed'] = false;
                        }
                    }
                    this.choosedCitys = [];
                }
                this.choosedCitys.push(city);
                this.words = this.getWords();
            },

            getCitys(){
                return this.choosedCitys;
            },

            getWords(){
                let words = [];
                for(var i = 65; i < 91; i++){
                    words.push(String.fromCharCode(i));
                }
                return words;
            }
        },

        mounted(){
            this.words = this.getWords();
        }

    }
</script>

<style>
    .city-picker .ui3-citypicker-overlay{
        width: 420px;
        padding-bottom: 10px;
        border:1px #ccc solid;
        background-color: #fff;
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
        font-size: 12px;
        position: relative;
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
        color: red;
    }

    .ui3-citypicker-items{
        margin-left: 15px;
    }

    .ui3-citypicker-items a{
        margin-bottom: 5px;
        color: #333;
        width: 48px;
        display: inline-block;
        margin-left: 10px;
        line-height: 16px;
        height: 16px;
        float: left;
        text-align: left;
    }

    .ui3-citypicker-items a:hover, .ui3-citypicker .ui3-citypicker-selected{
        color: #5986E1;
        text-decoration: underline;
    }

    .ui3-citypicker-overlay .ui3-citypicker-lw{
        width: 106px;
    }

    .ui3-citypicker-disabled{
        color: #ccc !important;
    }

    .ui3-citypicker-disabled:hover{
        color: #ccc !important;
        text-decoration: none;
    }

    .ui3-citypicker-list .ui3-citypicker-items .ui3-citypicker-city-choosed{
        color: red;
    }
</style>