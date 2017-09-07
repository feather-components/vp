Table
======================
表格

### Props

* thead(required): Object 表头。 
* tdata(required): Array 数据源。 
* colspan(required): Number 列数。 
* btns: Array 批量操作按钮。 
* parent: Object 父级。
* noscroll: Boolean 禁用横向滚动。默认启用(true)。

```html
<vp-pager :model={total:100,size:10,current:5} :callback="searchHandle"></vp-pager>
```

```js
import {Pager} from 'vpui';
//new vue
```

### Events

* 无