<script setup lang="ts">
  import type { LinkSchema } from './AtomsLink.props';
  defineProps<LinkSchema>();
</script>
<template>
  <NuxtLink
    :to="blok.link.url"
    class="relative box-shadow-sm before:absolute before:opacity-0 before:inset-0 hover:before:scale-150 before:rounded-full hover:before:opacity-100 before:transition-all before:duration-300 hover:before:z-[10]"
  >
    <span v-if="!blok.showOnlyIcon" class="text-p">{{ blok.label }}</span>
    <template v-else>
      <component
        :is="`Icons${blok.icon}`"
        class="w-5 h-5"
        :font-controlled="false"
      />
    </template>
  </NuxtLink>
</template>

<style lang="scss" scoped>
  .box-shadow-sm {
    &:before {
      box-shadow:
        0 0 3px rgba(255, 255, 255, 1),
        0 0 5px white;
    }
  }
</style>
