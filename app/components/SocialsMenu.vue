<template>
  <UiMenu :is-open="isOpen" :anchor="anchor" @close="$emit('close')">
    <UiMenuItem href="https://t.me/im_filmdude">
      <template #icon>
        <UiIcon :size="32"><IconTelegram /></UiIcon>
      </template>
      @im_filmdude
    </UiMenuItem>
    <UiMenuItem href="https://www.instagram.com/beam_izh">
      <template #icon>
        <UiIcon :size="32"><IconInstagram /></UiIcon>
      </template>
      beam_izh
    </UiMenuItem>
    <UiMenuItem tel="+88005553535">
      <template #icon>
        <UiIcon :size="32"><IconPhone /></UiIcon>
      </template>
      8 800 555 35 35
    </UiMenuItem>
  </UiMenu>
</template>

<script setup>
  import IconInstagram from '~/assets/icons/socials/IconInstagram.vue'
  import IconPhone from '~/assets/icons/socials/IconPhone.vue'
  import IconTelegram from '~/assets/icons/socials/IconTelegram.vue'

  defineProps({
    isOpen: {
      type: Boolean,
      required: true
    },
    anchor: {
      type: Object,
      default: null
    }
  })

  defineEmits(['close'])
</script>
