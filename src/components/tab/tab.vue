<template>
<section class="tab-panel" :id="hash" v-if="isActive">
    <slot></slot>
</section>
</template>
<script>
export default {
    name: 'tab',
    props: {
        id: { default: null },
        name: { required: true }
    },
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        hash() {
            return this.id ? '#' + this.id : '#' + this.name.toLowerCase().replace(/ /g, '-');
        }
    }
}
</script>