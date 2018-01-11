vpui
================

### [例子演示] 

## 使用

###  feather2

```sh
feather2 install feather-components/vp@dev
```

编译vue的单文件组件

```sh
npm install feather2-parser-vue fis-parser-es6-babel --save
```

conf/conf.js

```js
feather.config.set('project.fileType.js', 'vue');

feather.match('components/vm/**.vue', {
    parser: ['vue', 'es6-babel']
});

feather.match('components/vm/**.js', {
    parser: 'es6-babel'
});

```

### webpack

具体可见[webpack.config.js](./examples/webpack.config.js)

```html
 
```

```js
//index.js
import {Pager} from 'vpui';

```

## 注册全局，所有的组件以 vp- 开头， 指令除外

```js
import Vpui from 'vpui';
import Vue from 'vue';

Vue.use(Vpui);
```
