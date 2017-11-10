export default {
	bind (el, binding, vnode) {
		el.onmousedown = function (e) {
			//计算当前元素距离可视区的距离
		    var disX,disY;
            var clw = document.documentElement.clientWidth;
            var clh = document.documentElement.clientHeight;
            var elw,elh;
            setTimeout(function () {
                elw = el.offsetWidth;
                elh = el.offsetHeight;
                disX = e.clientX - el.offsetLeft;
                disY = e.clientY - el.offsetTop;
            });
		    el.style.position = 'fixed';
		    el.style.zIndex = '100';
		    document.onmousemove = function (e) {
				let left = e.clientX - disX;
				let top = e.clientY - disY;
				//移动当前元素 
				left <= 0 ? left = 0 : left;
				top <= 0 ? top = 0 : top;
				left >= clw - elw ? left = clw - elw : left;
				top >= clh - elh ? top = clh - elh: top;
				el.style.left = left + 'px';
				el.style.top = top + 'px';
		    };
		    document.onmouseup = function (e) {
				document.onmousemove = null;
				document.onmouseup = null;
		    };
		};
	},
	unbind (el) {
		// el.style.position = 'inherit';
	}
}