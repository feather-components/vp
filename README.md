vpui
================
vpui

### [例子演示] 

## 使用

###  feather2

```sh
feather2 install feather-components/vpui
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

#### 由于vm为了让适配更多的手机尺寸，故使用了rem进行尺寸的计算，所以在使用前，需要引入vm/rem.js文件

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

```html
<vm-scroll></vm-scroll>
```

## 组件列表

* [Pager](./doc/pager.md) 

## 指令

##方法
