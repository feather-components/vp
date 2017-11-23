const MONTH = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二']
};

export default {
    created() {
        this.$nextTick(() => {
            document.addEventListener('click', e => {
                if(this.$el && this.$el.compareDocumentPosition(e.target) < 20) {
                    'undefined' !== typeof this.open && (this.open = false);
                }
            });
        });
    },
    computed: {
        monthArr() {
            if('undefined' === typeof this.lang) return [];
            return ['en','zh'].indexOf(this.lang) > -1 ? MONTH[this.lang] : MONTH['en']
        }
    }
}