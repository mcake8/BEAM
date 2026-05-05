<template>
	<button
		class="ui-button"
		:type="props.type"
		:disabled="props.disabled"
	>
		<slot />
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
