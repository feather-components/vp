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
//vue结尾的文件则编译
feather.match('**.vue', {
    parser: ['vue', 'es6-babel']
});

feather.match('**.es6', {
    parser: ['es6-babel']
});

feather.match('components/vpui/**.js', {
    parser: 'es6-babel'
});

feather.match('*.{less,css}', {
    preprocessor : fis.plugin("autoprefixer",{ 
        "browsers": [ "last 3 version", "Chrome >= 20" ] 
    })
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
