import Rule from './rule';
import { Event, Dom, Util } from '../../helper';

var _ERRORCLASS = 'lg-error-border';
var _ERRORMSGCLASS = 'lg-error-msg';

function Result(ruleName, fieldName, tag, errorMsg) {
    return {
        rule: ruleName,
        field: fieldName,
        msg: errorMsg,
        tag: tag
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
        } else if (el.type == 'file') {
            val = el.parentNode.lastChild.value;
        } else if (target.type == 'file') {
            val = target.parentNode.lastChild.value;
        } else {
            val = target.value;
        }
    }

    for (var ruleName in rules) {
        if (Rule[ruleName]) { //default rule
            var rule = Rule[ruleName];
            var arg = typeof Array.isArray(rules[ruleName]) ? rules[ruleName] : rules[ruleName][0];
            var msg = typeof rules[ruleName] == 'object' && !Array.isArray(rules[ruleName]) ? rules[ruleName][1] : rule.msg;
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
            if (!isNaN(rule.length) && typeof rule != 'function') { //array
                rule = rules[ruleName][0];
                msg = rules[ruleName][1];
            }
            switch (typeof rule) {
                case 'function':
                    if (!rule(val, el)) {
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

function addErrorStyle(el, errors) {
    var hasRedBorder = !!el.className.match(new RegExp('(\\s|^)' + _ERRORCLASS + '(\\s|$)'));
    !hasRedBorder && (el.className += ' ' + _ERRORCLASS);
    if (!hasErrorMsg(el)) {
        var msgEl = document.createElement('span');
        msgEl.className = _ERRORMSGCLASS;
        insertAfter(msgEl, el);
    }
    el.nextSibling.innerHTML = errors[0].msg; //show first error
}

function removeErrorStyle(el) {
    var reg = new RegExp('(\\s|^)' + _ERRORCLASS + '(\\s|$)');
    el.className = el.className.replace(reg, '');
    hasErrorMsg(el) && el.nextSibling.remove();
}

function hasErrorMsg(el) {
    return el.nextSibling && el.nextSibling.className && (!!el.nextSibling.className.match(new RegExp('(\\s|^)' + _ERRORMSGCLASS + '(\\s|$)')));
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement, targetElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    };
}

class Validator {
    constructor(el, binding, vnode) {
        var vm = vnode.context;
        var rules = binding.value;
        var fieldName = binding.arg || '';
        var group = el.getAttribute('group') || 'default';
        var tag = el.getAttribute('tag') || '';
        var realElement = this.getEl(el) || el;
        var target = this.getModelExpression(vm, vnode) || realElement;
        this.attachField(vm, group, el, target, fieldName, rules, tag);
        var option = binding.modifiers;
        if (!option.nk) {
            if (realElement.length && realElement.localName != 'select') {
                [].forEach.call(realElement, function(realE, i) {
                    realE.addEventListener('keyup', check.bind(realE, el, vm, target, rules, fieldName, tag, true));
                    realE.addEventListener('change', check.bind(realE, el, vm, target, rules, fieldName, tag, true));
                })
            } else {
                realElement.addEventListener('keyup', check.bind(realElement, el, vm, target, rules, fieldName, tag, true));
                realElement.addEventListener('change', check.bind(realElement, el, vm, target, rules, fieldName, tag, true));
            }
        }
        if (!option.nb) {
            if (realElement.length && realElement.localName != 'select') {
                [].forEach.call(realElement, function(realE, i) {
                    realE.addEventListener('blur', check.bind(realE, el, vm, target, rules, fieldName, tag, true));
                })
            } else {
                realElement.addEventListener('blur', check.bind(realElement, el, vm, target, rules, fieldName, tag, true));
            }
        }
    }

    attachField(vm, group, el, target, field, rules, tag) {
        if (!vm.$vform)
            vm.$vform = [];
        if (!vm.$vform[group])
            vm.$vform[group] = {
                checkAll: this.checkAll,
                fields: []
            }
        vm.$vform[group].fields.push({
            vm: vm,
            el: el,
            target: target,
            field: field,
            rules: rules,
            tag: tag,
            check: this.checkOne
        })
    }

    detachField(vm, group, el) {
        if (vm.$vform) {
            vm.$vform[group].fields = vm.$vform[group].fields.filter(function(e) {
                return e.el != el;
            })
        }
    }

    getModelExpression(vm, vnode) {
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

    getEl(el) {
        if (el.length >= 1 && el.localName != 'select') {
            for (var item in el) {
                var temp = this.getEl(el[item]);
                if (temp)
                    return temp;
            }
        } else {
            switch (el.localName) {
                case 'input':
                    if (el.type == 'text' || el.type == 'file')
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
                        return this.getEl(el.children);
                    } else {
                        return false;
                    }
            }
        }
    }

    checkAll() {
        var err = [];
        this.fields.forEach(function(item, i) {
            err = err.concat(check(item.el, item.vm, item.target, item.rules, item.field, item.tag, false));
        })
        return err;
    }

    checkOne() {
        return check(this.el, this.vm, this.target, this.rules, this.field, this.tag, false);
    }
}

export default {
    name: 'valid',
    bind(el, binding, vnode) {
        setTimeout(() => {
            new Validator(el, binding, vnode);
        });
    },
    unbind(el, binding, vnode) {
        var vm = vnode.context;
        var group = el.getAttribute('group') || 'default';
        detachField(vm, group, el);
    }
}