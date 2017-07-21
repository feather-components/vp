<template>
    <div class="vp_citybox_wrap J_vp_citybox_wrap" v-show="showCityBox" type="VPCITYBOXES">
        <i class="vp_citybox_arrow J_vp_citybox_arrow"></i>
        <h3 class="J_layer_h3">城市索引：</h3>
        <div class="letter_list J_letter_list">
            <a href="javascript:;" class="letter J_letter J_letter_all" style="width:50px;">全部</a>
            <a href="javascript:;" class="letter J_letter" v-for="city, index in cityList">{{city.letter}}</a>
            <input class="J_letter_input"></input>
        </div>
        <h3 class="J_layer_h3">全部城市：</h3>
        <div class="city_list J_city_list">
            <ol class="blocks_ol">
                <li class="sub_panel" data-letter-value="ALL_CITY">
                    <h5 class="index_title">&nbsp;</h5>
                    <ol class="citys_ol clearfix">
                        <li class="item" data-value-str="" data-value-id=""><a href="javascript:;">全国</a></li>
                    </ol>
                </li>
                <li class="sub_panel" data-letter-value="{{ city.letter }}" v-for="city, index in cityList">
                    <h5 class="index_title">{{ city.letter }}</h5>
                    <ol class="citys_ol clearfix">
                        <li class="item" 
                            data-value-str="<%=list[iIndex].data[zIndex].zh%><%=list[iIndex].data[zIndex].py%>" 
                            data-value-id={{cityItem.id}} v-for="cityItem in city.data">
                            <a href="javascript:;"></a>
                        </li>
                    </ol>
                </li>
            </ol>
        </div>
    </div>
</template>
<script>
    export default{
        cmpName: 'vp-cityboxes',
        data () {
            return {
                showCityBox: true
            };
        },
        props: {
            cityJson: {
                type: Object,
                required: true
            }
        },
        computed: {
            cityList () {
                let json = this.cityJson;
                let citys = [];
                let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                for (var index = 0; index < letters.length; index++) {
                    var letter = letters[index];
                    if (json[letter]) {
                        var cityItem = {};
                        cityItem.letter = letter;
                        cityItem.data = json[letter];
                        citys.push(cityItem);
                    }
                }
                return citys;
            }
        },

        methods: {
            getValue () {
                console.log('iCityBoxes get');
            },
            setValue () {
                console.log('iCityBoxes set');
            }
        }
    };
</script>

<style>
    .vp_citybox_wrap {
        background-color: #fff;
        cursor: default;
        z-index: 10000;
        width: 400px;
        height: 300px;
        border: 1px #ccc solid;
        position: absolute;
        padding: 4px;
    }
    .vp_citybox_wrap ol,
    .vp_citybox_wrap ul,
    .vp_citybox_wrap h3 {
        -webkit-padding-start: 0;
        -webkit-margin-before: 0;
        -webkit-margin-after: 0;
        -webkit-margin-start: 0;
        -webkit-margin-end: 0;
    }
    .vp_citybox_wrap h3 {
        font-size: 14px;
        height: 20px;
        line-height: 20px;
    }
    .vp_citybox_wrap .letter_list .letter {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
    }
    .vp_citybox_wrap .letter_list .letter_cur {
        background-color: #ccc;
    }
    .vp_citybox_wrap .city_list {
        position: absolute;
        bottom: 0px;
        top: 110px;
        left: 0px;
        right: 0px;
        overflow-y: auto;
    }
    .vp_citybox_wrap .city_list .blocks_ol {
        list-style-type: none;
        padding-left: 20px;
    }
    .vp_citybox_wrap .city_list .sub_panel .index_title {
        background-color: #ccc;
        height: 20px;
        width: 20px;
        margin: 0 0;
        text-align: center;
        line-height: 20px;
        float: left;
    }
    .vp_citybox_wrap .city_list .sub_panel .citys_ol {
        list-style-type: none;
        margin-left: 22px;
        margin-bottom: 10px;
    }
    .vp_citybox_wrap .city_list .sub_panel .citys_ol .item {
        float: left;
        margin: 0 0 10px 10px;
    }
    .vp_citybox_wrap .city_list .sub_panel .citys_ol .item a {
        height: 20px;
        line-height: 20px;
        display: block;
        padding: 0 6px;
    }
    .vp_citybox_wrap .vp_citybox_arrow {
        width: 0;
        height: 0;
        font-size: 0;
        line-height: 0;
        position: absolute;
        display: block;
    }
    .vp_citybox_wrap .arrow_left {
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right: 6px solid #ccc;
    }
    .vp_citybox_wrap .arrow_bottom {
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #ccc;
    }
</style>