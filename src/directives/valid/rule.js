export default {
    required: {
        msg: '必填',
        exp: /\S+/
    },
    mobile: {
        msg: '格式错误',
        exp: /^\d{11}$/
    },
    idcard: {
        msg: '格式错误',
        exp: /^(?:\d{14}|\d{17})[\dx]$/i
    },
    email: {
        msg: '格式错误',
        exp: /^\w[\._\-\w]*@[\w_-]+(?:\.[\w_-]+)+$/i
    },
    number: {
        msg: '必须为数字',
        exp: /^\d*$/
    },
    float: {
        msg: '必须为数值',
        exp: /^(?:\d+(?:\.\d+)?)$/
    },
    int: {
        msg: '必须为整数',
        exp: /^(?:\d+(?:\.\d+)?)$/
    },
    range: {
        msg: '必须在范围内',
        exp: function(value, range) {
            if (!value) return true;

            if (range[0] && value < range[0]) {
                return false;
            }

            if (range[1] && value > range[1]) {
                return false;
            }

            return true;
        }
    },
    length: {
        msg: '长度不正确',
        exp: function(value, range) {
            if (value) {
                return (new RegExp('^[\\s\\S]{' + range + '}$')).test(value);
            }
            return true;
        }
    }
}