;
(function(factory) {
    if (typeof module === 'object' && typeof module.exports == 'object') {
        module.exports = factory(
            require('vue'), require('rule.js')
        );
    } else {
        window.vForm = factory(window.Vue, window.Vrules);
    }
})(function(Vue, BaseRule) {
    var _ERRORCLASS = 'lg-error-border';
    var _ERRORMSGCLASS = 'lg-error-msg';

    function addErrorStyle(el, errors) {
        var hasClass = !!el.className.match(new RegExp('(\\s|^)' + _ERRORCLASS + '(\\s|$)'))
        if (!hasClass)
            el.className += ' ' + _ERRORCLASS;
        var hasSibling = el.nextSibling && el.nextSibling.className && (!!el.nextSibling.className.match(new RegExp('(\\s|^)' + _ERRORMSGCLASS + '(\\s|$)')));
        if (!hasSibling) {
            var msgEl = document.createElement('span');
            msgEl.className = _ERRORMSGCLASS;
            el.after(msgEl);
        }
        el.nextSibling.innerHTML = errors[0].msg;
    }

    function removeErrorStyle(el) {
        var reg = new RegExp('(\\s|^)' + _ERRORCLASS + '(\\s|$)');
        el.className = el.className.replace(reg, '');
        var hasSibling = el.nextSibling && el.nextSibling.className && (!!el.nextSibling.className.match(new RegExp('(\\s|^)' + _ERRORMSGCLASS + '(\\s|$)')));
        if (hasSibling) {
            el.nextSibling.remove();
        }
    }

    function check(el,rules, fieldName, autocheck) {
    if(el.childNodes)
    console.log(el.childNodes); 
        var errorArry = [];
        for (var ruleName in rules) {
            if (BaseRule[ruleName]) { //default rule
                var rule = BaseRule[ruleName];
                var arg = typeof rules[ruleName] == 'object' ? rules[ruleName][0] : rules[ruleName];
                var msg = typeof rules[ruleName] == 'object' && rules[ruleName][1] ? rules[ruleName][1] : rule.msg;
                if (!autocheck || ruleName != 'required') { //never check required at real-time
                    switch (typeof rule.exp) {
                        case 'function':
                            if (!rule.exp(el.value, arg)) {
                                errorArry.push(Result(ruleName, fieldName, msg));
                            }
                            break;
                        case 'object':
                            if (!rule.exp.test(el.value)) {
                                errorArry.push(Result(ruleName, fieldName, msg));
                            }
                            break;
                    }
                }
            } else { //customer rule
                var rule = rules[ruleName];
                var msg = '输入有误';
                if (!isNaN(rules[ruleName].length)) { //array
                    rule = rules[ruleName][0];
                    msg = rules[ruleName][1];
                }
                switch (typeof rule) {
                    case 'function':
                        if (!rules[ruleName](el.value)) {
                            errorArry.push(Result(ruleName, fieldName, msg));
                        }
                        break;
                    case 'object':
                        if (!rules[ruleName].test(el.value)) {
                            errorArry.push(Result(ruleName, fieldName, msg));
                        } 
                        break;
                } 
            }
        }
        if (errorArry.length) {
            addErrorStyle(el, errorArry);
        } else {
            removeErrorStyle(el);
        }
        return errorArry;
    }

    function checkAll() { 
        var err=[]; 
        this.fields.forEach(function(item,i){
            err=err.concat(check(item.el,item.rules,item.field,false));
        })
        return err;
    }

    function Result(ruleName, fieldName, errorMsg) {
        return {
            rule: ruleName,
            field: fieldName,
            msg: errorMsg
        }
    }
    function attachField(vm,group,el,field,rules,tag){
        if(!vm.$vform) 
            vm.$vform=[]; 
        if(!vm.$vform[group])
            vm.$vform[group]={
                checkAll:checkAll,
                check:check,
                fields:[]
            } 
        vm.$vform[group].fields.push({
            el:el,
            field:field,
            rules:rules,
            tag:tag
        })

    }
    var vForm = {};
    //binding.arg:field name(字段名)，
    //binding.modifiers: ,
    //binding.value:default/customer rules(自定义规则，eg:{name:/\s{4}/}),
    //tag:displayname(字段中文标签),
    //group:,
    vForm.install = function(Vue) {
        Vue.directive('form', {
            bind: function(el, binding, vnode) {
                var vm = vnode.context;
                var rules = binding.value;
                var fieldName = binding.arg;
                var group=el.getAttribute('group')||'default';
                var tag=el.getAttribute('tag')||'该字段';
                attachField(vm,group,el,fieldName,rules,tag);  
                
                el.addEventListener('keyup', check.bind(el,el, rules, fieldName, true));
                el.addEventListener('change', check.bind(el,el, rules, fieldName, true));
                el.addEventListener('blur', check.bind(el,el, rules, fieldName, true));                

            },
            inserted: function(el, binding) {

            },
            update: function(el, binding) {

            },
            componentUpdated: function(el, binding) {

            },
            unbind: function() {

            }
        })
    }


    Vue.use(vForm);
    return vForm;
});
