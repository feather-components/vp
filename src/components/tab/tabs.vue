<template>
<transition name="fade">
<div class="tab" :class="tabStyle">
    <ul class="tab-nav">
        <li v-for="tab in tabs"
            v-html="tab.name"
            @click="selectTab(tab.hash)"
            :class="{ 'active': tab.isActive }"></li>
    </ul>
    <div class="tab-panel">
        <slot></slot>
    </div>
</div>
</transition> 
</template>
<script>
import expiringStorage from './expiringStorage'

const styleNames = ['default', 'surround'];

export default {
	name: 'tabs',
    props: {
        cacheLifetime: {
            default: 5
        },
        styleType: { // 0 default, 1 surround
            type: Number | String
        },
        id: {
            type: Number | String
        }
    },
    data() {
        return {
            tabs: []
        }
    },
    computed: {
        storageKey() {
            return `vue-tabs-component.cache${ this.id ? '.' + this.id : '' }.${ window.location.host }${ window.location.pathname }` ;
        },
        tabStyle() {
            if(this.styleType && styleNames.indexOf(this.styleType) > -1) {
                return this.styleType
            } else {
                return 'default'
            }
        },
    },
    created() {
        this.tabs = this.$children;
    },
    mounted() {
        window.addEventListener('hashchange', () => this.selectTab(window.location.hash));
        if (this.findTab(window.location.hash)) {
            this.selectTab(window.location.hash);
            return;
        }
        const previousSelectedTabHash = expiringStorage.get(this.storageKey);
        if (this.findTab(previousSelectedTabHash)) {
            this.selectTab(previousSelectedTabHash);
            return;
        }
        if (this.tabs.length) {
            this.selectTab(this.tabs[0].hash);
        }
    },
    methods: {
        findTab(hash) {
            return this.tabs.find(tab => tab.hash === hash);
        },
        selectTab(selectedTabHash) {
            let index = 0;
            const selectedTab = this.findTab(selectedTabHash);
            if (! selectedTab) {
                return;
            }
            this.tabs.forEach((tab, i) => {
                tab.isActive = (tab.hash === selectedTab.hash);
                tab.isActive && (index = i);
            });
            this.$emit('changed', { tab: selectedTab, index });
            expiringStorage.set(this.storageKey, selectedTab.hash, this.cacheLifetime);
        }
    }
}
// Array find polyfill
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function(predicate) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var thisArg = arguments[1];
            var k = 0;
            while (k < len) {
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                k++;
            }
            return undefined;
        }
    });
}

</script>
<style lang="less" scoped>
.tab {
    &.default {
        background-color: #fff;
        .tab-nav {
            border-bottom: 1px solid #DBDEE2;
            > li {
                margin: 0 20px;
                &.active {
                    color: #4475E8;
                    &:after {
                        content: "";
                        display: block;
                        height: 2px;
                        background-color: #4475E8;
                        margin-top: -1px;
                    }
                }
            }
        }
    }
    &.surround {
        border: 1px solid  #DBDEE2;
        .tab-nav > li {
            background-color: #F7F7F8;
            border-right: 1px solid #DBDEE2;
            min-width: 90px;
            &.active {
                background-color: #fff;
                color: #4475E8;
            }
        }
    }
    .tab-nav {
        display: flex;
        > li {
            cursor: pointer;
            height: 44px;
            line-height: 44px;
            font-size: 14px;
            color: #333;
            text-align: center;
        }
    }
}
.fade {
	&-enter-active,
	&-leave-active {
		transition: all .3s;
	}
	&-enter,
	&-leave-to{
		opacity: 0;
	}
} 
</style>