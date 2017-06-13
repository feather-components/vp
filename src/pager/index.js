import template from './tpl.js'; 
export default {
    props: {
        'model': {
            type: Object,
            require: true
        },
        'callback': {
            type: Function
        },
        'position': {
            type: String
        },
        'max': {
            type: Number,
            default: 10,
            validator: function(value) {
                return value > 5;
            }
        },
        'option': {
            type: Array
        }
    },
    template: template,
    methods: {
        to: function(page, disable) {
            if (disable)
                return;
            if (isNaN(Number(page))) {
                alert('别任性~');
                this.shortcut = '';
                return;
            }
            if (Number(page) > this.pager.page)
                page = this.pager.page;
            if (Number(page) < 1)
                page = 1;
            this.calc(this.pager, page);
            this.callback && this.callback(page, this.pager.size);
            this.shortcut = '';
        },
        calc: function(pager, cur) {
            var cur = Math.floor(cur / 1);
            var start = 2, end = pager.page - 1;
            if (pager.page > this.m) {
                if (cur - this.pre > 1) {
                    start = cur - this.pre;
                    if (cur + this.next - pager.page < 0) {
                        end = cur + this.next
                    } else {
                        start = end - (this.m - 3);
                    }
                } else {
                    end = start + this.m - 3;
                }
            } else if (start > end) {
                end = 1;
            }
            pager.start = start;
            pager.end = end;
            pager.cur = cur;
        },
        select: function(size) {
            this.update();
            this.to(1);
        },
        update: function(size) {
            if (size) {
                this.pager.size = size;
            }
            this.pager.total = this.model.total;
            this.pager.cur = this.model.cur;
            this.pager.page = Math.ceil(this.pager.total / this.pager.size);
            this.calc(this.pager, this.pager.cur);
        }
    },
    data() {
        var option = this.option ? this.option : [10, 20, 50];
        var size = option.indexOf(this.model.size) >= 0 ? this.model.size : option[0];
        return {
            pager: {
                page: Math.ceil(this.model.total / size),
                size: size,
                total: this.model.total,
                cur: this.model.cur
            },
            shortcut: '',
            m: this.max,
            pre: Math.floor((this.max - 3) / 2),
            next: Math.ceil((this.max - 3) / 2),
            opt: option
        }
    },
    created() {
        this.calc(this.pager, this.pager.cur);
    },
    watch: {
        model: {
            handler() {
                this.update(this.model.size);
            },
            deep: true
        }
    }
}
