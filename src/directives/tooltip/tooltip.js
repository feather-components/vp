export default {
    bind(el, binding, vnode) {
        var tipEl;
        el.onmouseenter = function() {
            var elW, elH, tipTxt, tipElL;
            var isExistTipEl = el.getElementsByClassName('tip').length ? true : false; // 是否已存在tipEl
            el.style.color = '#ff8447';
            console.log(binding.modifiers.down)
            if(isExistTipEl) {
                tipEl.style.display = 'inline-block';
            } else {
                el.style.position = 'relative';
                [elW, elH, tipTxt] = [el.offsetWidth, el.offsetHeight, binding.expression];
                tipEl = document.createElement('div');
                tipEl.innerText = binding.expression;
                tipEl.className = 'tip';
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