<div class="lg-table-scroll">
    <table class="lg-table" style="min-width:1200px">
        <thead>
            <tr>
                <th v-for="head in aHead">
                    <span v-if="head.type=='checkbox'">
                        <input type="checkbox"/>
                        <label v-html="head.label"></label>
                    </span>
                    <span v-if="head.type=='field'||head.type=='option'" v-html="head.label"></span>
                    <span v-if="head.sort" class="sort" @click="sort($event,head.sort)"></span>
                    <span class="tooltip">
                        ?                        
                    </span> 
                </th> 
            </tr>
        </thead> 
        <tbody v-if="tdata.length>0">
            <tr v-for="(item, index) in tdata">
                <td  v-for="(field,key) in thead" class="nowrap" >
                    <div v-if="!field.type" v-html="item[key]" :title="item[key]"></div>
                    <span v-if="field.type=='checkbox'" class="lg-checkbox"><input type="checkbox"/><label v-html="item[key]"></label></span>
                    <div v-if="field.type=='option'"> 
                        <a v-for="act in item[key]" :href="act.type=='link'?act.url:'javascript:void(0)'" v-html="act.text" @click="act.cb(act.arg)"></a> 
                    </div>  
                </td>
            </tr>
        </tbody> 
        <tbody v-if="tdata.length==0">
            <tr>
                <td :colspan="colspan" v-html="'暂无数据'"></td>
            </tr>
        </tbody>
    </table>
</div>
