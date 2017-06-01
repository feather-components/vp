;
(function(factory) {
    if (typeof module === 'object' && typeof module.exports == 'object') {
        module.exports = factory();
    } else {
        window.validateRule=factory();
    }
})(function() {
    return {
        rules: {
            required: /\S+/,
            email: /^\w[\._\-\w]*@[\w_-]+(?:\.[\w_-]+)+$/i,
            mobile: /^\d{11}$/,
            idcard: /^(?:\d{14}|\d{17})[\dx]$/i,
            number: /^(?:\d+(?:\.\d+)?)$/,
            range: function(value, range) {
                if (!value) return true; 

                if (range[0] && value < range[0]) {
                    return false;
                }

                if (range[1] && value > range[1]) {
                    return false;
                }

                return true;
            },
            length: function(value, range) {   
                if (value) {
                    return (new RegExp('^[\\s\\S]{' + range.join(',') + '}$')).test(value);
                } 
                return true;
            }, 
            remote: function(value, options) {
                return $.ajax(options).then(function() {
                    return options.checker.apply(null, arguments);
                });
            }
        },

        msgs: {
            required: '该字段必填',
            email: '邮箱格式错误',
            mobile: '手机号码格式错误',
            idcard: '身份证格式错误',
            number: '该字段必须为数字',
            range: '字段输入范围错误',
            length: '字段输入长度错误'
        }
    }; 
}); 