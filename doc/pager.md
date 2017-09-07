Pager
======================
分页

### Props

* model(required): Object 分页对象。且必须有属性total,size,current
* callback: Function 切换页码回调。参数：(current,size)
* position: String 组件位置。可识别项（left|center)
* max: Int 页码数量显示上限。默认10，必须是大于5的整数
* option: Array size下拉框选项。默认[10,20,50] 

```html
<vp-pager :model={total:100,size:10,current:5} :callback="searchHandle"></vp-pager>
```

```js
import {Pager} from 'vpui';
//new vue
```

### Events

* 无