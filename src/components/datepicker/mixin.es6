export default {
    created() {
        this.$nextTick(() => {
            document.addEventListener('click', e => {
                if(this.$el && this.$el.compareDocumentPosition(e.target) < 20) {
                    'undefined' !== typeof this.open && (this.open = false);
                }
            });
        });
    }
}