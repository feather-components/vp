<template>
    <div class="components-list">
        components
        <ul>
            <li>
                <a class="item" href="/#/pager">
                    pager
                </a>
            </li>
        </ul>
        
    </div>
</template>
<script>
    export default{
        mounted () {
            //alert('mounted');
        }
    };
</script>
<style scope>
    .components-list{
        padding:10px;
    }
    .components-list li{
        padding:10px;
        margin:10px; 
        border-left: 1px #ccc solid;
    }
</style>