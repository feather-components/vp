var bindEvent = function bindEvent(el, options){
    var params = {};
    var baseParams = globalLog.getArgusObj();
    var eventKey = options.event || 'click';
    el.addEventListener(eventKey, function() {
        params = Object.assign(baseParams, {'self_event_type': options.key, 'data' : options.data || {} });
        globalLog.send(params);
        
        var afterSend = options.afterSend;
        
        if(Object.prototype.toString.call(afterSend) == '[object Object]'){
            var timeout = parseInt(afterSend.timeout, 10);
            timeout = Object.prototype.toString.call(timeout) == '[object Number]' ? timeout : 200; 
            setTimeout(function(){
                afterSend.handle(afterSend.args);
            }, timeout);
        }
    });
}

export default {
    bind(el, binding) {
        let val = binding.value;
        if(val instanceof Array) {
            //多个事件
            //用法：v-reporter="[{event: 'click', key: '' , data: {}}, {event: 'click', key: '' ,  data: {}}]"
            val.forEach(item => {
                bindEvent(el, item)
            })
        } else {
            //单个事件
            //用法：v-reporter="{event: 'click', key: '' , data: {}}"
            bindEvent(el, val)
        }
    }
}