<template>
    <a :class="className" @blur="handleBlur">
        <div class="vp-picker-rel" ref="pickerRel" @click="pickerClick">
            <slot>ref</slot>
        </div>
        <overlay :visible="false" class="vp-picker-overlay" position="center" ref="pickerOverlay" @click.native.stop="clickPickerContent();" @open="overlayOpen()">
            <slot name="picker-content">
                content
            </slot>
        </overlay>
    </a>
</template>

<script>
    import Picker from '../picker';
    export default {
        name: 'cityPicker',
        mixins: [Picker],
        props:{
            
        },
        mounted(){
            console.log('mounted');
        }
    }
</script>