<div class="lg-suggest"><i></i>
    <input @keyup="keyup" @focus="focus" @blur="blur" :style="width?'width:'+width:''" type="text" :placeholder="placeholder" :value="selected" v-model="selected" /><i class="c" @click="clean" v-if="selected"></i>
    <ul @mouseenter="enter" @mouseleave="leave" v-if="show" :style="width?'width:'+width:''">
        <li v-for="item in data" :title="item.text"><a @click="check(item)">${item.text}</a></li>
    </ul>
</div>