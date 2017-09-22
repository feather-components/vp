<teplate>
    <transition>
        <div :class="className" v-show="visibility">
            <slot></slot>
        </div>
    </transition>
</teplate>
<script>
    import { Event } from '../../helper';
    export default{
        name: 'overlay',

        props: {
            visible: {
                type: Boolean, 
                default: false
            },

            position: {
                type: String,
                default: false
            },

            picked: {
                type: Object
            }
        },

        data(){
            return {
                visibility: false,
                destroyed: false
            }
        },

        watch: {
            visible(v) {
                v ? this.open() : this.close();
            }
        },

        computed: {
            className() {
                let self = this;
                let c = ['vp-overlay'];

                if(self.picked){
                    c.push('vp-overlay-absolute');
                } else {
                    c.push('vp-overlay-fixed');
                }

                c.push(self.class || '');

                return c;
            }
        },

        mounted: function(){
            this.visible && this.open();
        },

        destroyed(){
            //console.log('overlay destroy');
        },

        methods: {
            open(){
                let self = this;
                if(self.visibility) return false;
                self.visibility = true;
                self.$nextTick(function(){
                    self.$emit('open');
                });
            },

            close(){
                var self = this;
                if(!self.visibility) return false;
                self.visibility = false;
                self.$nextTick(function(){
                    self.$emit('close');
                });
            },

            destroy(fx = this.fx){
                var self = this;
                if(self.destroyed) return;
                self.close();
                if(fx){
                    Event.on(self.$el, 'transitionend webkitTransitionEnd', () => {
                        self._destroy();
                    });
                }else{
                    self._destroy();
                }
            },

             _destroy(){
                var self = this;
                self.$el.parentNode && self.$el.parentNode.removeChild(self.$el);
                self.$emit('destroy');
                self.destroyed = true;
                self.$destroy();
            }
        }
    }
</script>

<style>
    .vp-position-absolute {
        position: absolute;
    }

    .vp-position-fixed {
        position: fixed;
    }

    .vp-position-center {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
    }


</style>
