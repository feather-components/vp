export default {
    bind(el, binding, vnode) {
        var tipEl;
        el.onmouseenter = function() {
            var elW, elH, tipTxt, tipElL, isExistTipEl, tipClass;
            var location = Object.keys(binding.modifiers)[0];
            switch (location) {
                case 'up':
                    tipClass = 'tip-up'
                    break;
                case 'right':
                    tipClass = 'tip-right'
                    break;
                case 'down':
                    tipClass = 'tip-down'
                    break;
                default:
                    tipClass = 'tip-left'
                    break;
            }
            isExistTipEl = el.getElementsByClassName(tipClass).length ? true : false; // 是否已存在tipEl
            el.style.color = '#ff8447';
            // console.log(location)
            if(isExistTipEl) {
                tipEl.style.display = 'inline-block';
            } else {
                el.style.position = 'relative';
                [elW, elH, tipTxt] = [el.offsetWidth, el.offsetHeight, binding.expression];
                tipEl = document.createElement('div');
                tipEl.innerText = binding.expression;
                tipEl.className = `tip ${tipClass}`;
                el.append(tipEl);
            }
            tipElL = tipEl.offsetWidth / 2; // 向左偏移自身的一半
            tipEl.style.left = `${elW / 2 - tipElL}px`;
        }
        el.onmouseleave = function() {
            el.style.color = '';
            tipEl.style.display = 'none';
        }
    }
}