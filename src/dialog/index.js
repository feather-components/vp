import template from './tpl.js';
export default {
    props: {
        'option': {
            type: Object
        }
    },
    template: template,
    methods: {
        close: function(flag) {
            this.show = false;
            this.reject(flag);
        },
        sure: function(index) {
            this.show = false;
            this.resolve(index);
        },
        open: function(argument) {
            var _this = this;
            this.show = true;
            this.promise = new Promise(function(resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
            });
            return this.promise;
        }
    },
    data: function() {
        return {
            show: false,
            resolve: '',
            reject: ''
        }
    },
    computed: {
        dialog: {
            get: function(argument) {
                var option = this.option;
                var result = {
                    title: option.title || '',
                    btns: option && option.btns ? option.btns : [{ text: '取消', klass: 'lg-btn-o' }, { text: '确定' }],
                    height: option && option.height && option.height > 190 ? option.height + 'px' : '190',
                    width: option && option.width && option.width > 320 ? option.width + 'px' : '320px'
                }
                return result;
            }
        }
    }
}
