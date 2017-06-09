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

    function check(el, vm, target, rules, fieldName, tag, autocheck) {
        var errorArry = [];
        var val = '';
        if (typeof target == 'string') {
            var vm = vm;
            val = eval('vm.' + target);
        } else {
            if (target.length && target.localName != 'select') {
                for (var i in target) {
                    if (target[i].checked) {
                        val = target[i].value;
                        break;
                    }
                }
            } else {
                val = target.value;
            }
        }

        for (var ruleName in rules) {
            if (BaseRule[ruleName]) { //default rule
                var rule = BaseRule[ruleName];
                var arg = typeof rules[ruleName] == 'object' ? rules[ruleName][0] : rules[ruleName];
                var msg = typeof rules[ruleName] == 'object' && rules[ruleName][1] != undefined ? rules[ruleName][1] : rule.msg;
                if (!autocheck || ruleName != 'required') { //never check required at real-time
                    switch (typeof rule.exp) {
                        case 'function':
                            if (!rule.exp(val, arg)) {
                                errorArry.push(Result(ruleName, fieldName, tag, msg));
                            }
                            break;
                        case 'object':
                            if (!rule.exp.test(val)) {
                                errorArry.push(Result(ruleName, fieldName, tag, msg));
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
                        if (!rule(val)) {
                            errorArry.push(Result(ruleName, fieldName, tag, msg));
                        }
                        break;
                    case 'object':
                        if (!rule.test(val)) {
                            errorArry.push(Result(ruleName, fieldName, tag, msg));
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
        var err = [];
        this.fields.forEach(function(item, i) {
            err = err.concat(check(item.el, item.vm, item.target, item.rules, item.field, item.tag, false));
        })
        return err;
    }

    function checkOne() {
        return check(this.el, this.vm, this.target, this.rules, this.field, this.tag, false);
    }

    function Result(ruleName, fieldName, tag, errorMsg) {
        return {
            rule: ruleName,
            field: fieldName,
            msg: errorMsg,
            tag: tag
        }
    }

    function attachField(vm, group, el, target, field, rules, tag) {
        if (!vm.$vform)
            vm.$vform = [];
        if (!vm.$vform[group])
            vm.$vform[group] = {
                checkAll: checkAll,
                fields: []
            }
        vm.$vform[group].fields.push({
            vm: vm,
            el: el,
            target: target,
            field: field,
            rules: rules,
            tag: tag,
            check: checkOne
        })
    }

    function detachField(vm, group, el) {
        if (vm.$vform) {
            vm.$vform[group].fields = vm.$vform[group].fields.filter(function(e) {
                return e.el != el;
            })
        }
    }

    function getEl(el) {
        if (el.length > 1 && el.localName != 'select') {
            for (var item in el) {
                var temp = getEl(el[item]);
                if (temp)
                    return temp;
            }
        } else {
            switch (el.localName) {
                case 'input':
                    if (el.type == 'text')
                        return el;
                    if (el.type == 'radio') {
                        return document.getElementsByName(el.name);
                    }
                    if (el.type == 'checkbox') {
                        return document.getElementsByName(el.name);
                    }
                case 'select':
                    return el;
                case 'textarea':
                    return el;
                default:
                    if (el.children && el.children.length) {
                        return getEl(el.children);
                    } else {
                        return false;
                    }
            }
        }
    }

    function getModelExpression(vm, vnode) {
        var model = vnode.data.directives.filter(function(d, i) {
            return d.name == 'model';
        })
        model.push(vnode.data.model);
        if (model.length) {
            try {
                eval('vm.' + model[0].expression);
                return model[0].expression;
            } catch (e) {
                return false;
            }
        }
        return false;
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
                var fieldName = binding.arg || '';
                var group = el.getAttribute('group') || 'default';
                var tag = el.getAttribute('tag') || '';
                var target = getModelExpression(vm, vnode);
                if (!target) {
                    target = getEl(el);
                    if (!target)
                        target = el;
                }
                attachField(vm, group, el, target, fieldName, rules, tag);
                var option = binding.modifiers;
                if (!option.nk) {
                    el.addEventListener('keyup', check.bind(el, el, vm, target, rules, fieldName, tag, true));
                    el.addEventListener('change', check.bind(el, el, vm, target, rules, fieldName, tag, true));
                }
                if (!option.nb)
                    el.addEventListener('blur', check.bind(el, el, vm, target, rules, fieldName, tag, true));
            },
            unbind: function(el, binding, vnode) {
                var vm = vnode.context;
                var group = el.getAttribute('group') || 'default';
                detachField(vm, group, el);
            }
        })
    }
    Vue.use(vForm);
    return vForm;
});
