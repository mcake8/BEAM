<template>
  <Transition name="menu">
    <div v-if="isOpen && anchor" class="ui-menu-portal">
      <div class="ui-menu__backdrop" @click="emit('close')" />
      <div ref="menuRef" class="ui-menu" :style="styles">
        <ul class="ui-menu__list">
          <slot />
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script setup>
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    },
    anchor: {
      type: Object,
      default: null
    }
  })

  const emit = defineEmits(['close'])

  watch(
    () => props.isOpen,
    (open) => {
      if (import.meta.server) return
      document.documentElement.classList.toggle('is-lock', open)
    }
  )

  onUnmounted(() => {
    if (import.meta.client) {
      document.documentElement.classList.remove('is-lock')
    }
  })

  const onKeydown = (event) => {
    if (event.key === 'Escape' && props.isOpen) {
      emit('close')
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))

  const menuRef = ref(null)

  defineExpose({ el: menuRef })

  const styles = ref({})

  const updatePosition = () => {
    if (!props.anchor || !menuRef.value) return

    const el = props.anchor.$el ?? props.anchor

    const rect = el.getBoundingClientRect()
    const menuWidth = menuRef.value.offsetWidth
    const offset = 4

    let left = rect.right - menuWidth

    if (left < 0) left = rect.left

    const viewportWidth = window.innerWidth
    if (left + menuWidth > viewportWidth) {
      left = viewportWidth - menuWidth - offset
    }

    styles.value = {
      left: `${left}px`,
      top: `${rect.bottom + offset}px`
    }
  }

  watch([() => props.isOpen, () => props.anchor], async ([open]) => {
    if (!open) return
    await nextTick()
    requestAnimationFrame(updatePosition)
  })
</script>

<style lang="scss">
  .menu-enter-active .ui-menu,
  .menu-leave-active .ui-menu {
    transition: opacity var(--transition-duration);
  }

  .menu-enter-from .ui-menu,
  .menu-leave-to .ui-menu {
    opacity: 0;
  }

  .ui-menu__backdrop {
    position: fixed;
    inset: 0;
    z-index: 99;
  }

  .ui-menu {
    position: fixed;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: var(--box-shadow);
    backdrop-filter: blur(10px);
    min-width: 210px;
    z-index: 100;
  }
</style>
