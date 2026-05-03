
<template>
    <button class="ui-button">
        <slot></slot>
    </button>
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped lang="scss">

</style>