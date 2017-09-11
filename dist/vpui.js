(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["this"] = factory();
	else
		root["this"] = factory();
})(this, function() {
return webpackJsonpthis([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(19)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event__ = __webpack_require__(22);
/* unused harmony reexport Dom */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__util__["a"]; });
/* unused harmony reexport Event */




/* unused harmony default export */ var _unused_webpack_default_export = ({
    Dom: __WEBPACK_IMPORTED_MODULE_0__dom__["a" /* default */],
    Util: __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */],
    Event: __WEBPACK_IMPORTED_MODULE_2__event__["a" /* default */]
});



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = ({
    l2camel(str){
        return str.replace(/-(\w)/g, (all, c, index) => index > 0 ? c.toUpperCase() : c);
    },

    assign(obj){
        [].slice.call(arguments, 1).forEach((args) => {
            for(var i in args){
                obj[i] = args[i];
            }
        })

        return obj;
    },

    each(arr, callback){
        if(arr.length){
            [].forEach.call(arr, callback);
        }else{
            for(var i in arr){
                callback(arr[i], i);
            }
        }
    },

    rfa(callback){
        return (window.requestAnimationFrame     ||
            window.webkitRequestAnimationFrame  ||
            function (callback) { window.setTimeout(callback, 1000 / 60); })(callback);
    },

    crfa(id){
        return id && (
            window.cancelRequestAnimationFrame ||
            window.webkitCancelAnimationFrame  ||
            window.clearTimeout
        )(id);
    },

    makeArray(arr){
        if(Array.isArray(arr)){
            return arr;
        }

        return arr == null ? [] : [arr];
    },

    log(){
        var str = JSON.stringify(arguments);
        var container = document.querySelector('#__log__');

        if(!container){
            container = document.createElement('div');
            container.id = '__log__';
            container.style.cssText = 'position: fixed; bottom: 0px; width: 100%; background: #ccc; z-index: 10000;';
            document.body.appendChild(container);
        }

        container.innerHTML = container.innerHTML + '<br />' + str;
    },

    firstKey(obj){
        for(var i in obj){
            return i;
        }

        return false;
    },

    observer(target, config = {}, callback){
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        var observer = new MutationObserver(callback);

        observer.observe(target, config);
        return observer;
    },

    register(obj, directive = false){
        var Component = obj.Component || obj;

        function install(Vue){
            if(install._installed) return;

            install._installed = true;

            if(directive){
                Vue.directive(Component.name, obj);
            }else{
                Vue.component(`vp-${Component.name}`, obj);
            }
        }

        if(window.Vue){
            install(window.Vue);
        }else{
            obj.install = Component.install = install;
        }

        return obj;
    },

    factory(options, data = {}){
        var instance = new __WEBPACK_IMPORTED_MODULE_0_vue__["default"](options);
        Object.assign(instance, data);
        instance.$mount();
        document.body.appendChild(instance.$el);
        return instance;
    }
});

!Object.assign && (Object.assign = exports.default.assign);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pager__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(4);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__pager___default.a));

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__table__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(4);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__table___default.a));

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Pager = {
    name: 'pager',
    props: {
        'total': {
            type: Number,
            require: true
        },
        'current': {
            type: Number,
            require: true,
            default: 1
        },
        'position': {
            type: String
        },
        'volumn': {
            type: Number,
            default: 10,
            validator(value) {
                return value > 5;
            }
        }
    },
    methods: {
        to(current) {
            var cur = Number(current);
            if (isNaN(cur)) {
                alert('别任性~');
                return;
            }
            if (cur <= this.pager.total && cur >= 1 && cur != this.pager.current) {
                this.calculate(cur);
                this.$emit('to', cur);
            }
        },
        calculate(current) {
            var current = Math.floor(current / 1);
            var start = 2,
                end = this.pager.total - 1;
            if (this.pager.total > this.vol) {
                if (current - this.pre > 1) {
                    start = current - this.pre;
                    if (current + this.next - this.pager.total < 0) {
                        end = current + this.next;
                    } else {
                        start = end - (this.vol - 3);
                    }
                } else {
                    end = start + this.vol - 3;
                }
            } else if (start > end) {
                end = 1;
            }
            this.pager.start = start;
            this.pager.end = end;
            this.pager.current = current;
        },
        update() {
            this.vol = this.volumn;
            this.pre = Math.floor((this.vol - 3) / 2);
            this.next = Math.ceil((this.vol - 3) / 2);
            this.pager.total = this.total;
            this.calculate(this.current);
        }
    },
    data() {
        return {
            pager: {
                total: this.total,
                current: this.current
            },
            klass: {
                'lg-pager-left': this.position == 'left',
                'lg-pager-right': this.position == 'right'
            },
            shortcut: ''
        };
    },
    created() {
        this.update();
    },
    computed: {
        isHead() {
            return this.pager.current == 1;
        },
        isTail() {
            return this.pager.current == this.pager.total;
        },
        showPager() {
            return !!this.pager.total;
        },
        propsUpdate() {
            return this.total + '&' + this.current + '&' + this.volumn;
        }
    },
    watch: {
        'propsUpdate': function () {
            this.update();
        }
    }
};
/* harmony default export */ __webpack_exports__["default"] = (Pager);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Table = {
    name: 'table',
    props: {
        'thead': {
            type: Object,
            require: true
        },
        'tdata': {
            type: Array,
            require: true
        },
        'colspan': {
            type: Number,
            require: true
        },
        'btns': {
            type: Array,
            require: false
        },
        'parent': {
            type: Object,
            require: false
        },
        'noscroll': {
            type: Boolean,
            require: false
        }
    },
    methods: {
        sort: function (e, obj) {
            if (obj.desc === false) {
                this.p.$emit('table_sort', 'desc', obj.arg);
                this.sortClean();
                obj.desc = true;
            } else {
                this.p.$emit('table_sort', 'asc', obj.arg);
                this.sortClean();
                obj.desc = false;
            }
        },
        sortClean: function () {
            for (var head in this.aHead) {
                if (this.aHead[head].sort) this.aHead[head].sort.desc = '';
            }
        },
        checkAll: function (e, key) {
            var _this = this;
            var result = [];
            this.aCheckGroup[key] = [];
            this.tdata.forEach(function (item, i) {
                result.push(item[key]);
                if (e.target.checked) {
                    _this.aCheckGroup[key].push(item[key].id);
                }
            });
            this.p.$emit('table_checkall', e.target.checked, key, result);
        },
        check: function (e, key, i) {
            this.p.$emit('table_check', e.target.checked, key, this.tdata[i][key]);
        },
        chose: function (e, key, i) {
            this.p.$emit('table_radioclick', e.target.checked, key, this.tdata[i][key]);
        },
        initCheckbox: function (source) {
            var _this = this;
            for (var key in this.aCheckGroup) {
                this.aCheckGroup[key] = [];
                source.forEach(function (item, i) {
                    if (item[key].checked) _this.aCheckGroup[key].push(item[key].id);
                });
            }
        },
        initRadio: function (source) {
            var _this = this;
            for (var key in this.aRadioGroup) {
                this.aRadioGroup[key] = [];
                source.forEach(function (item, i) {
                    if (item[key].checked) _this.aCheckGroup[key].push(item[key].id);
                });
            }
        },
        btnClick: function (b) {
            this.p.$emit(b.emit, this.aCheckGroup, this.aRadioGroup);
        }
    },
    data: function () {
        var thead = {},
            checkGroup = {},
            radioGroup = {},
            hasCheckbox = false,
            hasRadio = false;
        for (var e in this.thead) {
            thead[e] = {
                type: this.thead[e].type || 'field',
                label: this.thead[e].label || (typeof this.thead[e] == 'string' ? this.thead[e] : ''),
                key: e
            };
            if (this.thead[e].sort) {
                thead[e].sort = {};
                thead[e].sort.desc = this.thead[e].sort.desc || '';
                thead[e].sort.arg = this.thead[e].sort.arg || e;
            }
            if (this.thead[e].tip) {
                thead[e].tip = {};
                thead[e].tip.option = this.thead[e].tip.option || { direction: 'b' };
                thead[e].tip.content = this.thead[e].tip.content || '';
            }
            if (this.thead[e].type == "checkbox") {
                checkGroup[e] = [];
                hasCheckbox = true;
            } else if (this.thead[e].type == "radio") {
                radioGroup[e] = [];
                hasRadio = true;
            }
        }
        var parent = this.parent || this.$parent;
        return {
            aHead: thead,
            aData: this.tdata,
            aCheckGroup: checkGroup,
            aRadioGroup: radioGroup,
            hasCheckbox: hasCheckbox,
            hasRadio: hasRadio,
            p: parent
        };
    },
    created: function () {
        var _this = this;
    },
    watch: {
        'tdata': function (newV) {
            this.aData = newV;
            if (this.hasCheckbox) {
                this.initCheckbox(this.aData);
            }
            if (this.hasRadio) {
                this.initRadio(this.aData);
            }
        }
    },
    directives: {
        format: {
            inserted: function (el, data) {
                var MyComponent = Vue.extend({
                    template: data.value.template,
                    data: function () {
                        return data.value.data;
                    },
                    methods: data.value.method ? data.value.method : {},
                    components: data.value.component ? data.value.component : {}
                });
                var component = new MyComponent().$mount();
                el.appendChild(component.$el);
            },
            update: function (el, data) {
                var child = el.childNodes;
                if (child) {
                    child.forEach(function (c) {
                        el.removeChild(c);
                    });
                }
                var MyComponent = Vue.extend({
                    template: data.value.template,
                    data: function () {
                        return data.value.data;
                    },
                    methods: data.value.method ? data.value.method : {},
                    components: data.value.component ? data.value.component : {}
                });
                var component = new MyComponent().$mount();
                el.appendChild(component.$el);
            }
        }
    }
};
/* harmony default export */ __webpack_exports__["default"] = (Table);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.lg-pager {\r\n    margin: 5px auto;\r\n    font: 12px Tahoma, Helvetica Neue, Hiragino Sans GB, Microsoft Yahei, sans-serif;\r\n    overflow: hidden;\r\n    height: 50px;\r\n    text-align: center;\n}\n.lg-pager-left {\r\n    text-align: left;\n}\n.lg-pager-right {\r\n    text-align: right;\n}\n.lg-pager ul {\r\n    display: inline-block;\n}\n.lg-pager li {\r\n    float: left;\r\n    list-style: none;\r\n    margin: 2px 3px;\r\n    line-height: 28px;\r\n    font-size: 12px;\r\n    height: 28px;\n}\n.lg-pager-item {\r\n    border: 1px solid #dfdfdf;\r\n    border-radius: 2px;\r\n    background-color: #fff;\n}\n.lg-pager-item:hover {\r\n    border-color: #5986E1;\n}\n.lg-pager-item.disable a {\r\n    color: #a3a3a3;\n}\n.lg-pager-item.disable a:after,\r\n.lg-pager-item.disable a:before {\r\n    color: #a3a3a3;\r\n    border-left-color: #a3a3a3;\n}\n.lg-pager-item.disable:hover {\r\n    border-color: #dfdfdf;\n}\n.lg-pager-item a {\r\n    display: inline-block;\r\n    text-align: center;\r\n    color: #666;\r\n    height: 28px;\r\n    min-width: 28px;\r\n    line-height: 28px;\r\n    padding: 0 5px;\r\n    text-decoration: none;\n}\n.lg-pager-total {\r\n    border: 1px solid transparent;\n}\n.lg-pager-current {\r\n    background: #5986E1;\r\n    border-color: #5986E1;\n}\n.lg-pager-current a {\r\n    color: #fff;\n}\n.lg-pager-item-large a {\r\n    padding: 0px 4px;\n}\n.lg-pager-previous a:before {\r\n    content: '';\r\n    display: inline-block;\r\n    border-top: 5px solid transparent;\r\n    border-bottom: 5px solid transparent;\r\n    border-left: 7px solid #666;\r\n    border-right: none;\r\n    -webkit-transform: rotateZ(180deg);\r\n    transform: rotateZ(180deg);\n}\n.lg-pager-next a:after {\r\n    content: '';\r\n    display: inline-block;\r\n    border-top: 5px solid transparent;\r\n    border-bottom: 5px solid transparent;\r\n    border-left: 7px solid #666;\r\n    border-right: none;\n}\n.lg-pager-current a,\r\n.lg-pager-point a {\r\n    currentsor: default;\n}\n.lg-pager-shortcut {\r\n    height: 24px;\r\n    color: #a3a3a3;\n}\n.lg-pager-shortcut input,\r\n.lg-pager-shortcut select {\r\n    height: 24px;\r\n    width: 38px;\r\n    padding: 0px;\r\n    outline: none;\r\n    text-align: center;\r\n    margin: 0 6px;\r\n    border-radius: 3px;\r\n    border: 1px solid #a3a3a3;\r\n    box-size: border-box;\n}\n.lg-pager-shortcut select {\r\n    padding: 0 3px;\r\n    width: auto;\r\n    margin: 0 5px;\n}\n.lg-pager-shortcut-confirm {\r\n    border-radius: 3px;\r\n    background: #5986E1;\r\n    text-decoration: none;\r\n    text-align: center;\r\n    display: inline-block;\r\n    color: #fff;\r\n    width: 50px;\r\n    height: 24px;\r\n    line-height: 24px;\r\n    margin: 0 5px;\n}\n.lg-pager-dot {\r\n    border: none;\n}\r\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.lg-table {\nspan.sort {\r\n        height: 14px;\r\n        display: inline-block;\r\n        line-height: 20px;\r\n        margin-right: 5px;\r\n        position: relative;\r\n        top: 1px;\r\n        cursor: pointer;\n&:before {\r\n            content: '';\r\n            border-bottom: 6px solid white;\r\n            border-right: 4px solid transparent;\r\n            border-left: 4px solid transparent;\r\n            border-top: none;\r\n            position: absolute;\r\n            top: 0;\n}\n&:after {\r\n            content: '';\r\n            border-top: 6px solid white;\r\n            border-right: 4px solid transparent;\r\n            border-left: 4px solid transparent;\r\n            border-bottom: none;\r\n            position: absolute;\r\n            bottom: 0;\n}\n}\nspan.up {\n&:before {\r\n            border-bottom: 7px solid white;\r\n            border-right: 5px solid transparent;\r\n            border-left: 5px solid transparent;\r\n            top: 4px;\n}\n&:after {\r\n            display: none;\n}\n}\nspan.down {\n&:before {\r\n            display: none;\n}\n&:after {\r\n            border-top: 7px solid white;\r\n            border-right: 5px solid transparent;\r\n            border-left: 5px solid transparent;\r\n            bottom: 2px;\n}\n}\n.lg-tiphand {\r\n        height: 20px;\r\n        line-height: 20px;\n}\na {\r\n        margin: 0 5px;\n}\n}\r\n", ""]);

// exports


/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(17)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(15),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\work\\vpui\\src\\components\\pager\\pager.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pager.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1657d968", Component.options)
  } else {
    hotAPI.reload("data-v-1657d968", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(18)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(16),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\work\\vpui\\src\\components\\table\\table.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] table.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a48347bc", Component.options)
  } else {
    hotAPI.reload("data-v-a48347bc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.showPager) ? _c('div', {
    staticClass: "lg-pager",
    class: _vm.klass
  }, [_vm._t("before"), _vm._v(" "), _c('ul', [_c('li', {
    staticClass: "lg-pager-item lg-pager-previous",
    class: {
      'disable': _vm.isHead
    }
  }, [_c('a', {
    attrs: {
      "href": "javascript:"
    },
    on: {
      "click": function($event) {
        _vm.to(_vm.pager.current - 1)
      }
    }
  })]), _vm._v(" "), _c('li', {
    staticClass: "lg-pager-item",
    class: {
      'lg-pager-current': _vm.isHead
    }
  }, [_c('a', {
    attrs: {
      "href": "javascript:"
    },
    on: {
      "click": function($event) {
        _vm.to(1)
      }
    }
  }, [_vm._v("1")])]), _vm._v(" "), (_vm.pager.start != 2) ? _c('li', {
    staticClass: "lg-pager-item lg-pager-dot"
  }, [_vm._v("\n            ...\n        ")]) : _vm._e(), _vm._v(" "), _vm._l(((_vm.pager.end - _vm.pager.start + 1)), function(n) {
    return _c('li', {
      staticClass: "lg-pager-item",
      class: {
        'lg-pager-current': _vm.pager.current == (_vm.pager.start + n - 1)
      }
    }, [_c('a', {
      attrs: {
        "href": "javascript:"
      },
      on: {
        "click": function($event) {
          _vm.to(_vm.pager.start + n - 1)
        }
      }
    }, [_vm._v(_vm._s(_vm.pager.start + n - 1))])])
  }), _vm._v(" "), (_vm.pager.end < _vm.pager.total - 1) ? _c('li', {
    staticClass: "lg-pager-item lg-pager-dot"
  }, [_vm._v("\n            ...\n        ")]) : _vm._e(), _vm._v(" "), (_vm.pager.total > 1) ? _c('li', {
    staticClass: "lg-pager-item",
    class: {
      'lg-pager-current': _vm.isTail
    }
  }, [_c('a', {
    attrs: {
      "href": "javascript:"
    },
    on: {
      "click": function($event) {
        _vm.to(_vm.pager.total)
      }
    }
  }, [_vm._v(_vm._s(_vm.pager.total))])]) : _vm._e(), _vm._v(" "), _c('li', {
    staticClass: "lg-pager-item lg-pager-next",
    class: {
      'disable': _vm.isTail
    }
  }, [_c('a', {
    attrs: {
      "href": "javascript:"
    },
    on: {
      "click": function($event) {
        _vm.to(_vm.pager.current + 1)
      }
    }
  })]), _vm._v(" "), _c('li', {
    staticClass: "lg-pager-shortcut"
  }, [_vm._v("\n            去第"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.shortcut),
      expression: "shortcut"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.shortcut)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.shortcut = $event.target.value
      }
    }
  }), _vm._v("页"), _c('a', {
    staticClass: "lg-pager-shortcut-confirm",
    attrs: {
      "href": "javascript:"
    },
    on: {
      "click": function($event) {
        _vm.to(_vm.shortcut)
      }
    }
  }, [_vm._v("确定")])]), _vm._v(" "), _c('li', {
    staticClass: "lg-pager-total"
  }, [_vm._v("共" + _vm._s(_vm.pager.total) + "页")])], 2), _vm._v(" "), _vm._t("after")], 2) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1657d968", module.exports)
  }
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "lg-table-scroll"
  }, [_vm._l((_vm.btns), function(btn) {
    return _c('button', {
      staticClass: "lg-btn-small",
      class: btn.class,
      attrs: {
        "disabled": btn.disabled
      },
      domProps: {
        "innerHTML": _vm._s(btn.label)
      },
      on: {
        "click": function($event) {
          _vm.btnClick(btn)
        }
      }
    })
  }), _vm._v(" "), _c('table', {
    staticClass: "lg-table",
    style: (_vm.noscroll ? '' : 'min-width:1200px')
  }, [_c('thead', [_c('tr', _vm._l((_vm.aHead), function(head) {
    return _c('th', [(head.type == 'checkbox') ? _c('span', {
      staticClass: "lg-checkbox"
    }, [_c('input', {
      attrs: {
        "type": "checkbox",
        "id": 'vtable_chb' + head.key
      },
      domProps: {
        "checked": _vm.aCheckGroup[head.key].length == _vm.aData.length && _vm.aData.length
      },
      on: {
        "click": function($event) {
          _vm.checkAll($event, head.key)
        }
      }
    }), _vm._v(" "), _c('label', {
      attrs: {
        "for": 'vtable_chb' + head.key
      },
      domProps: {
        "innerHTML": _vm._s(head.label)
      }
    })]) : _c('span', {
      domProps: {
        "innerHTML": _vm._s(head.label)
      }
    }), _vm._v(" "), (head.sort) ? _c('span', {
      staticClass: "sort",
      class: {
        'up': head.sort.desc === false, 'down': head.sort.desc
      },
      on: {
        "click": function($event) {
          _vm.sort($event, head.sort)
        }
      }
    }) : _vm._e(), _vm._v(" "), (head.tip) ? _c('vtip', {
      attrs: {
        "content": head.tip.content,
        "option": head.tip.option
      }
    }) : _vm._e()], 1)
  }))]), _vm._v(" "), (_vm.aData.length > 0) ? _c('tbody', _vm._l((_vm.aData), function(item, index) {
    return _c('tr', _vm._l((_vm.thead), function(field, key) {
      return _c('td', {
        staticClass: "nowrap"
      }, [(field.type == 'bodytip') ? _c('div', {
        staticStyle: {
          "position": "relative"
        }
      }, [_c('span', {
        attrs: {
          "title": item[key].text
        },
        domProps: {
          "innerHTML": _vm._s(item[key].text)
        }
      }), _vm._v(" "), _c('vtip', {
        attrs: {
          "content": item[key].tip.content,
          "option": item[key].tip.option
        }
      })], 1) : (field.type == 'checkbox') ? _c('span', {
        staticClass: "lg-checkbox"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (_vm.aCheckGroup[key]),
          expression: "aCheckGroup[key]"
        }],
        attrs: {
          "type": "checkbox",
          "name": key,
          "id": key + '_' + item[key].id
        },
        domProps: {
          "value": item[key].id,
          "checked": Array.isArray(_vm.aCheckGroup[key]) ? _vm._i(_vm.aCheckGroup[key], item[key].id) > -1 : (_vm.aCheckGroup[key])
        },
        on: {
          "click": function($event) {
            _vm.check($event, key, index)
          },
          "__c": function($event) {
            var $$a = _vm.aCheckGroup[key],
              $$el = $event.target,
              $$c = $$el.checked ? (true) : (false);
            if (Array.isArray($$a)) {
              var $$v = item[key].id,
                $$i = _vm._i($$a, $$v);
              if ($$el.checked) {
                $$i < 0 && (_vm.aCheckGroup[key] = $$a.concat($$v))
              } else {
                $$i > -1 && (_vm.aCheckGroup[key] = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
              }
            } else {
              _vm.$set(_vm.aCheckGroup, key, $$c)
            }
          }
        }
      }), _c('label', {
        attrs: {
          "for": key + '_' + item[key].id
        },
        domProps: {
          "innerHTML": _vm._s(item[key].label)
        }
      })]) : (field.type == 'radio') ? _c('span', {
        staticClass: "lg-radio"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (_vm.aRadioGroup[key]),
          expression: "aRadioGroup[key]"
        }],
        attrs: {
          "type": "radio",
          "name": key,
          "id": key + '_' + item[key].id
        },
        domProps: {
          "value": item[key].id,
          "checked": _vm._q(_vm.aRadioGroup[key], item[key].id)
        },
        on: {
          "click": function($event) {
            _vm.chose($event, key, index)
          },
          "__c": function($event) {
            _vm.$set(_vm.aRadioGroup, key, item[key].id)
          }
        }
      }), _c('label', {
        attrs: {
          "for": key + '_' + item[key].id
        },
        domProps: {
          "innerHTML": _vm._s(item[key].label)
        }
      })]) : (field.type == 'option') ? _c('div', _vm._l((item[key]), function(act) {
        return _c('a', {
          attrs: {
            "href": act.type == 'link' ? act.url : 'javascript:void(0)',
            "target": act.blank ? '_blank' : ''
          },
          domProps: {
            "innerHTML": _vm._s(act.text)
          },
          on: {
            "click": function($event) {
              act.cb && act.cb(act.arg)
            }
          }
        })
      })) : (field.type == 'velement') ? _c('div', {
        directives: [{
          name: "format",
          rawName: "v-format",
          value: (item[key]),
          expression: "item[key]"
        }]
      }) : _c('div', {
        attrs: {
          "title": !field.hideTitle ? (item[key] && item[key].title ? item[key].title : item[key]) : ''
        },
        domProps: {
          "innerHTML": _vm._s(item[key] && item[key].html ? item[key].html : item[key])
        }
      })])
    }))
  })) : _vm._e(), _vm._v(" "), (_vm.tdata.length == 0) ? _c('tbody', [_c('tr', [_c('td', {
    attrs: {
      "colspan": _vm.colspan
    },
    domProps: {
      "innerHTML": _vm._s('暂无数据')
    }
  })])]) : _vm._e()])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a48347bc", module.exports)
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("1f5c102c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1657d968\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pager.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1657d968\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pager.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("e0e665a6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a48347bc\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a48347bc\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(5);
var css3s = ['transform', 'transition'];



if(!Element.prototype.matches){
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector;
}

/* harmony default export */ __webpack_exports__["a"] = ({
    offset(element){
        var top = 0, left = 0;

        do{
            top += element.offsetTop;
            left += element.offsetLeft;
        }while(element = element.offsetParent);

        return {
            left,
            top
        }
    },

    matches(target, selector){
        return target.matches(selector);
    },
    
    siblings(element){
        return [].filter.call(element.parentNode.children, (child) => child !== element);
    },

    nexts(element){
        var els = [];

        while(element = element.nextSibling){
            if(element.nodeType == 1){
                els.push(element);
            }
        }

        return els;
    },

    height(element){
        return this.isDoc(element) ? document.documentElement.clientHeight : element.offsetHeight;
    },

    width(element){
        return this.isDoc(element) ? document.documentElement.clientWidth : element.offsetWidth;
    },

    size(element){
        return {width: this.width(element), height: this.height(element)};
    },

    rect(element){
        return element.getBoundingClientRect();
    },

    isDoc(element){
        return element === document.documentElement || element === document;
    },

    contains(root, el, hasSelf = true){
        return root === el && hasSelf || !!(root.compareDocumentPosition(el) & 16); 
    },

    css(element, name, value){
        if(typeof name == 'object'){
            for(var key in name){
                this.css(element, key, name[key]);
            }
        }else{
            var css3name;

            if(this.css3(name)){
                css3name = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].l2camel('-webkit-' + name);
            }

            var property = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].l2camel(name);

            if(typeof value == 'undefined'){
                return element.style[css3name || property] || window.getComputedStyle(element).getPropertyValue(css3name || name);
            }else{
                value += (typeof value == 'number' && !/^(?:opacity|zIndex)$/.test(property) ? 'px' : '');
                element.style[property] = value;

                if(css3name){
                    element.style[css3name] = value; 
                }
            }
        }
    },

    css3(name){
        return css3s.indexOf(name) > -1;
    },

    $(str, root = document){
        return typeof str == 'string' ? root.querySelector(str) : str;
    },

    $$(str, root = document){
        return (typeof str == 'string' ? root.querySelectorAll(str) : str) || [];
    },

    hasClass(element, className){  
        return element.className.match(new RegExp('(\\s+|^)' + className + '(\\s+|$)'));  
    },

    addClass(element, className){
        if(this.hasClass(element, className)){
            element.className += ' ' + className;
        }
    },

    removeClass(element, className){
        element.className = element.className.replace(new RegExp('(\\s+|^)' + className + '(\\s+|$)'));
    }
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    on(element, event, callback, options){
        event.split(' ').forEach((event) => {
            element.addEventListener(event, callback);
        });
    },

    off(element, event, callback){
        element.removeEventListener(event, callback);
    },

    trigger(element, event, data = []){
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(event, false, true);
        evt.data = data;
        return !element.dispatchEvent(evt);
    }
});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_pager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_table__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Pager", function() { return __WEBPACK_IMPORTED_MODULE_0__components_pager__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return __WEBPACK_IMPORTED_MODULE_1__components_table__["a"]; });





var Components = [
    __WEBPACK_IMPORTED_MODULE_0__components_pager__["a" /* default */],__WEBPACK_IMPORTED_MODULE_1__components_table__["a" /* default */] 
];

function install(Vue){
    for(let Component of Components){
        Vue.use(Component);
    }
}



/* harmony default export */ __webpack_exports__["default"] = ({install});

/***/ })
],[23]);
});