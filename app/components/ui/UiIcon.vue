<template>
	<div
		class="ui-icon"
		:class="{ 'is-clickable': $attrs.onClick }"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
interface Props {
	size?: number
	iconSize?: number
}

const props = withDefaults(defineProps<Props>(), {
	size: 32,
	iconSize: 24
})
</script>

<style lang="scss">
.ui-icon {
	@include flex-center(true);

	flex-shrink: 0;

	width: v-bind('props.size + "px"');
	height: v-bind('props.size + "px"');

	&.is-clickable {
		cursor: pointer;
	}

	:deep(svg),
	:deep(.icon) {
		width: v-bind('props.iconSize + "px"');
		height: v-bind('props.iconSize + "px"');
	}
}
</style>
