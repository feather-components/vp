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
    Vue.prototype.ajaxServer = function(url, type, data, success, error) { 
        $.ajax({
            url: url,
            dataType: "json",
            type: type,
            data: data,
            success: function(data) { 
                if (data.success) {
                    success && success(data);
                } else {
                    error && error(data.error);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                if (XMLHttpRequest.status == 401) {
                    location.href = $('#major-layout-login').val();
                } else {
                    error && error(errorThrown);
                }
            }
        });
    } 
}); 
