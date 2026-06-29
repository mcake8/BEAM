<template>
  <div class="layout">
    <div class="container">
      <AppHeader />
      <slot />
    </div>
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
