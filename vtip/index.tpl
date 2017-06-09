<div :class="classname" @mouseleave="hideTip($event)" @mouseenter="showTip($event)">
    <span v-html="label"></span>
    <div class="lg-bubble" v-html="body" v-if="show" :style="style" :class="klass"></div>     
</div>
