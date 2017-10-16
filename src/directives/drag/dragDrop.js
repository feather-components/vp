var arrList = [];
var arrListNub = 0;
var dragElement = null;
export default {
	bind (el, binding, vnode) {
		
		var elt = [];
		for (var i = 0, len = el.children.length; i < len; i++) {
			elt.push(el.children[i]);
		}
		arrList.push([el.children]);
		elt.forEach(function (item, index, arr) {
			bd(item, index, arr, arrListNub);
		});
		console.log(arrList)
		arrListNub++;

		function bd (item, index, arr, listIndex) {
			item.draggable = true;
			var eventList = [function (ev) {
				dragElement = item;
				// 我来自哪个大区
				dragElement.index = listIndex;
				// 绑定函数挂上，以后要解绑用
				dragElement.eventList = eventList;
				// 当前自身的索引
				dragElement.myIndex = index;
				// console.log('dragstart');
			}, function (ev) {
				ev.preventDefault();
				// console.log('drop');
			}, function (ev) {
				// console.log(item, dragElement);
				
				if (item == dragElement) return;
				// console.log('dragenter');

				insert(item, index, arr, ev, listIndex);
				
			}, function () {
				
				// console.log('dragleave');
			}, function (ev) {
				ev.preventDefault();
				// console.log('dragover');
			}];
			eventList[0].evt = 'ondragstart';
			eventList[1].evt = 'ondrop';
			eventList[2].evt = 'ondragenter';
			eventList[3].evt = 'ondragleave';
			eventList[4].evt = 'ondragover';
			item.ondragstart = eventList[0];
			item.ondrop = eventList[1];
			item.ondragenter = eventList[2];
			item.ondragleave = eventList[3];
			item.ondragover = eventList[4];
		}



		function insert (item, index, arr, ev, listIndex) {
			
			// 是否外星来的
			if (!isExistence(arr, dragElement)) {
				// 你是外来生物

				item.parentNode.insertBefore(dragElement, item);
				// 同化--插到相应的位置
				arr.splice(index, 0, dragElement);

				// console.log(dragElement.index, listIndex);

				// 删除原来的地方
				arrList[dragElement.index].splice(dragElement.myIndex, 1);

				// 重新绑定目标
				[].forEach.call(arrList[listIndex], function (item, index, arr) {
					bd(item, index, arr, listIndex);
				});
				// 重新绑定来源
				[].forEach.call(arrList[dragElement.index], function (item, index, arr) {
					bd(item, index, arr, dragElement.index);
				});
				// 更新值
				dragElement.myIndex = index;
				dragElement.index = listIndex;

				// console.log(arrList[dragElement.index]);
				// console.log(arr);
				return;
			}
			// 本来物
			// 每次触及某个目标有可能只是经过，关键是一次性经过加越级了，跑到别人的地盘去了
			dragElement.myIndex = index;

			if (item == dragElement.nextElementSibling) {// 基本--相邻就互换位置
				// 插后面
				item.parentNode.insertBefore(dragElement, item.nextElementSibling);
				transposition(arr, arr.indexOf(dragElement), arr.indexOf(item));
				// console.log(arr, index);
			} else if (item == dragElement.previousElementSibling) {
				// 插前面
				item.parentNode.insertBefore(dragElement, item);
				transposition(arr, arr.indexOf(dragElement), arr.indexOf(item));
				// console.log(arr, index);
			} else if (item == item.parentNode.lastElementChild) {// 下面都不相邻了
				// 插尾巴
				item.parentNode.appendChild(dragElement);
				// 这里不能互换，因为是往前推和往后推的概念，像插队
				[].push.apply(arr, arr.splice(arr.indexOf(dragElement), 1));
				// console.log(arr, arr.indexOf(dragElement), arr.indexOf(item));
			} else {
				// 不相邻都插前面
				item.parentNode.insertBefore(dragElement, item);
				if (arr.indexOf(item) > arr.indexOf(dragElement)) {
					// 回到互换----前面插后面需要互换
					item.parentNode.insertBefore(dragElement, item.nextElementSibling);
				}
				arr.splice(arr.indexOf(item), 0, arr.splice(arr.indexOf(dragElement), 1)[0]);
				// console.log(arr);
			}
			// console.log(arr);
			// 重新绑定目标
			[].forEach.call(arrList[listIndex], function (item, index, arr) {
				bd(item, index, arr, dragElement.index);
			});
		}

		function isExistence (where) { // 目的地（值），目标（值，方法）
			// 1. 数组中存在1，存在2，存在‘dsfsdf’，这些事具体的形
			// 2. 数组中存在数字，字符串，英文，标点，这些是一种抽象
			// 可以传具体的值，也能穿概念
			// 现在只是单个存在，要添加多个存在，不但存在一，还要存在多
			var args = [].slice.call(arguments, 1);
			var val = [];
			var predicate = [];
			args.forEach(function (item, index, arr) {
				typeof item == 'function' ? predicate.push(item) : val.push(item);
			});
			val = val.length == 0 ? true : val.every(function (item, index, arr) {
				return where.indexOf(item) > -1;
			});
			predicate = predicate.length == 0 ? true : predicate.every(function (item, index, arr) {
				return where.some(function (val, index, arr) {
					return item(val);
				});
			});
			return val && predicate;
		}

		// 移形换位
		function transposition (obj, key1, key2) {
			var third = obj[key1];
			obj[key1] = obj[key2];
			obj[key2] = third;
		}

	},
	unbind (el) {
		
	}
}