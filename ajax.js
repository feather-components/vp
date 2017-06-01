;
(function(factory) {
    if (typeof module === 'object' && typeof module.exports == 'object') {
        module.exports = factory(
            require('vue'), require('jquery')
        );
    } else {
        factory(window.Vue, window.Jquery);
    }
})(function(Vue, $) {
    Vue.prototype.ajax = function() {
        var _url=arguments[0],_success=arguments[3],_error=arguments[4];
        var _type='GET';
        var _data={}; 
        if(typeof arguments[1]=='string'){
            _type=arguments[1]; 
        }         
        else if(typeof arguments[1]=='object'){
            _data=arguments[1]; 
        } 
        else if(typeof arguments[1]=='function'){
            _success=arguments[1];
            _error=arguments[2];
        }
        if(typeof arguments[2]=='object'){
            _data=arguments[2];
        }
        else if(arguments[1]!='function'){
            _success=arguments[2];
            _error=arguments[3];
        }

        $.ajax({
            url: _url,
            dataType: "json",
            type: _type,
            data: _data,
            success: function(data) {  
                if (data.success) { 
                    _success && _success(data);
                } else { 
                    _error && _error(data.error!=undefined?data.error:'未知错误');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                if (XMLHttpRequest.status == 401) {
                    location.href = $('#major-layout-login').val();
                } else {
                    _error && _error(errorThrown);
                }
            }
        });
    } 
}); 