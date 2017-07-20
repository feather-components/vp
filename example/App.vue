<template>
    <div id="app">
        <div class="components-list">
            components
            <ul>
                <li>
                    <a class="item" href="/#/pager">
                        pager
                    </a>
                </li>
                <li>
                    <a class="item" href="/#/form">
                        form
                    </a>
                </li>
            </ul>
        </div>
        <div class="component-show">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'app',
        mounted () {
            //alert('mounted');
        }
    };
</script>
<style scope>
    body{
        border-top: 3px red solid;
    }
    .components-list{
        padding:10px;
        width:190px;
        padding-top:20px;
    }
    .component-show{
        position:absolute;
        top:0px;
        bottom:0px;
        left:200px;
        right:0px;
    }
    .components-list li{
        padding:10px;
        margin:10px; 
        border-left: 1px #ccc solid;
        border-bottom: 1px #ccc dashed;
        width: 100px;
    }

    .demo-wrap{
        padding: 10px;
    }
    .demo-block{
        padding: 10px;
        padding-left: 0;
        margin-bottom: 10px;
    }
    .demo-block .demo-input{
        padding: 3px 5px;
    }
    .demo-title{
        margin-bottom: 10px;
        font-size: 14px;
    }
    .demo-code{
        border: 1px #ccc dashed;
        padding: 20px;
        margin-bottom: 5px;
        padding-left: 5px;
    }

    .cmp-name{
        padding: 10px;
    }

    .clearfix {
        *zoom: 1;
    }

    .clearfix:after {
        clear: both;
        content: '.';
        display: block;
        height: 0;
        overflow: hidden;
    }
</style>