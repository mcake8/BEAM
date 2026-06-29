<template>
  <svg
    class="contacts-svg"
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    fill="none"
    viewBox="0 0 40 40"
  >
    <path
      class="contacts-svg__bg"
      fill="var(--color-surface-3)"
      d="M0 12C0 5.373 5.373 0 12 0h16c6.627 0 12 5.373 12 12v16c0 6.627-5.373 12-12 12H12C5.373 40 0 34.627 0 28z"
    />
    <path
      class="contacts-svg__border"
      stroke="currentColor"
      stroke-width="2"
      d="M12 1h16c6.075 0 11 4.925 11 11v16c0 6.075-4.925 11-11 11H12C5.925 39 1 34.075 1 28V12C1 5.925 5.925 1 12 1Z"
    />
    <path
      class="contacts-svg__center"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M15 17h10m-10 4h5m9 7-3.324-1.662a4 4 0 0 0-.51-.234 2 2 0 0 0-.36-.085c-.139-.019-.28-.019-.561-.019H14.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C11 24.48 11 23.92 11 22.8v-7.6c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C12.52 12 13.08 12 14.2 12h11.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C29 13.52 29 14.08 29 15.2z"
    />
  </svg>
</template>

<style lang="scss">
  .contacts-svg__border {
    opacity: 0.2;
    transition: opacity var(--transition-duration);
  }

  .ui-icon-button:has(.contacts-svg):hover {
    opacity: 1;

    .contacts-svg__border {
      opacity: 1;
    }
  }

  .ui-icon-button.is-active:has(.contacts-svg) {
    .contacts-svg__bg {
      fill: var(--color-surface-2);
    }
    .contacts-svg__border {
      opacity: 1;
    }
  }
</style>
