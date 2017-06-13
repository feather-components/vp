<div class="lg-pager" :class="{'lg-pager-left':position=='left','lg-pager-center':position=='center'}" v-if="pager.total">
    <ul>
        <li class="lg-pager-item" v-if="pager.page>max" :class="{'disable':pager.cur==1}">
            <a href="javascript:" @click="to(1,pager.cur==1)">首页</a>
        </li>
        <li class="lg-pager-previous lg-pager-item" :class="{'disable':pager.cur==1}">
            <a href="javascript:" @click="to(pager.cur-1,pager.cur==1)"></a>
        </li>
        <li class="lg-pager-item" :class="{'lg-pager-current':pager.cur==1}">
            <a href="javascript:" @click="to(1,pager.cur==1)" v-html="1"></a>
        </li>
        <li class="lg-pager-item lg-pager-dot" v-if="pager.start!=2">
            ...
        </li>
        <li v-for="n in (pager.end-pager.start+1)" class="lg-pager-item" :class="{'lg-pager-current':pager.cur==(pager.start+n-1)}" v-if="pager.page>0">
            <a href="javascript:" @click="to(pager.start+n-1,pager.cur==(pager.start+n-1))" v-html="pager.start+n-1"></a>
        </li>
        <li class="lg-pager-item lg-pager-dot" v-if="pager.end<pager.page-1">
            ...
        </li>
        <li class="lg-pager-item" :class="{'lg-pager-current':pager.cur==pager.page}" v-if="pager.page>1">
            <a href="javascript:" @click="to(pager.page)" v-html="pager.page"></a>
        </li>
        <li class="lg-pager-next lg-pager-item" :class="{'disable':pager.cur==pager.page}">
            <a href="javascript:" @click="to(pager.cur+1,pager.cur==pager.page)"></a>
        </li>
        <li class="lg-pager-item" v-if="pager.page>max" :class="{'disable':pager.cur==pager.page}">
            <a href="javascript:" @click="to(pager.page,pager.cur==pager.page)">尾页</a>
        </li>
        <li class="lg-pager-shortcut">去第
            <input type="text" v-model="shortcut"> 页<a href="javascript:" class="lg-pager-shortcut-confirm" @click="to(shortcut)">确定</a>每页
            <select v-model="pager.size" @change="select(pager.size)">
                <option v-for="o in opt" :value="o" v-html="o+'条'"></option>
            </select>共{{pager.page}}页，{{pager.total}}条
        </li>
    </ul>
</div>