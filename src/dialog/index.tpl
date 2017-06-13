<div class="lg-dialog-mask" v-show="show" transition="fade">
    <div class="lg-dialog-body" :style="{width:dialog.width,height:dialog.height}">
        <a class="lg-dialog-close" @click="close(false)">×</a>
        <div class="lg-dialog-title" v-html="dialog.title" v-if="dialog.title.length>0"></div>
        <div class="lg-dialog-content">
            <slot></slot>
        </div>
        <div class="lg-dialog-bottom">
            <table class="lg-dialog-btns">
                <tr>
                    <td v-for="(btn,index) in dialog.btns"  :class="{'lg-dialog-btnfirst':index==0,'lg-dialog-btnlast':index==dialog.btns.length-1}">
                        <a href="javascript:void(0);" class="lg-btn"  :class="btn.klass" v-html="btn.name" @click="sure(index)"></a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>