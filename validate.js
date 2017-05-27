;
(function(factory) {
    if (typeof module === 'object' && typeof module.exports == 'object') {
        module.exports = factory(
            require('vue'), require('vue-components/validate-rule')
        );
    } else {
        factory(window.Vue, window.validateRule);
    }
})(function(Vue, defaultRules) {
    Vue.prototype.validate = function(form, rules) {
        var errorList = [];
         rules.forEach(function(item, i) {
            if (item.rule) {
                if (typeof item.rule == 'object') {
                    for(var key in item.rule){
                        errorList.push(check({ value: form[item.key], rule: key, arg: item.rule[key],key: item.key }))
                    } 
                } 
            }
        })
        return errorList.filter(function(item) {
            return item.hasError
        });
    }

    function check(arg) { 
        var vTrim = (arg.value + '').replace(/(^\s*)|(\s*$)/g, "");
        var result, flag,message;
        if (typeof defaultRules.rules[arg.rule] == 'function') {    
            flag = defaultRules.rules[arg.rule](vTrim,arg.arg.slice(1,3));
        } else if(defaultRules.rules[arg.rule]) { 
            flag = defaultRules.rules[arg.rule].test(vTrim);
        }  else{
            flag = arg.rule.test(vTrim);
        }
        result = {
            hasError: !flag,
            key: arg.key,
            rule: arg.rule,
            msg: arg.arg[0] ? arg.arg[0] : defaultRules.msgs[arg.rule]
        };
        return result;
    }
});
