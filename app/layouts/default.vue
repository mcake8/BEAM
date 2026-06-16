<template>
	<div class="layout">
		<slot />
	</div>
</template>

<style lang="scss">
.layout {
	background-image: url('/images/background.jpg');
	background-size: cover;
	background-attachment: fixed;
	min-height: 100dvh;
}
</style>
