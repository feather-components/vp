埋点指令:  v-reporter
---------------------------------
用于绑定类埋点事件

###  依赖：
*  全局变量globalLog （该变量使用企业自已的埋点实现）

###  示例：
#### event为click时可以省略
    v-reporter="{key: 'HF_W_CLICK_HFKOL_DETAIL_HF'}"
#### 单event传 {}
    v-reporter="{key: 'HF_W_CLICK_HFKOL_DETAIL_HF', event: 'click'}"
#### 上报用户数据用 data: {}
    v-reporter="{key: 'HF_W_CLICK_HFKOL_DETAIL_HF', event: 'keyup', data: {'userId': '1132321'}}"
#### 多事件用[] 包裹单事件
    v-reporter="[
        {key: 'HF_W_CLICK_HFKOL_DETAIL_HF', event: 'keyup', data: {'userId': '1132321'}},
        {key: 'HF_W_CLICK_HFKOL_DETAIL_HF', event: 'keydown', data: {'userId': '1132321'}, afterSend: {timeout: 0, handle: function(){ alert('report')}, args:{name: 'abc'}}}
    ]"

###  binding.value 说明：
*    key:上报给日志服务器的key。
*    event:触发上报的事件类型参考 [https://www.w3.org/TR/uievents/#event-types](https://www.w3.org/TR/uievents/#event-types "event-types")。
*    data:上报给日志服务器用户数据 json格式, js Object。
*    afterSend:日志发送成功之后需要执行方法，采用该选项，本选项有三个参数：{timeout: //默认为 200ms [object Number], handle: //用户自定义的方法 [object Function], args: //用于给handle传参 [object Object] 请注意args里的key}

###  总结：

###  待优化点
-    args