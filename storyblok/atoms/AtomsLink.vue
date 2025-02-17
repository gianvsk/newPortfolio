<script setup lang="ts">
  import type { LinkSchema } from './AtomsLink.props';
  defineProps<LinkSchema>();
</script>
<template>
  <NuxtLink :to="blok.link.url" class="link">
    <span v-if="!blok.showOnlyIcon" class="text-p">{{ blok.label }}</span>
    <template v-else>
      <component
        :is="`Icons${blok.icon}`"
        class="w-6 h-6 stroke-amber-300"
        :font-controlled="false"
      />
    </template>
  </NuxtLink>
</template>

<style lang="scss" scoped>
  .link {
    transition: box-shadow 0.5s ease-in;
    position: relative;
    &:after {
      position: absolute;
      content: '';
      inset: 0;
    }
    &:hover:after {
      box-shadow:
        inset 0 12px -3px rgba(255, 255, 255, 0.9),
        0 0 5px white,
        0 0 25px white,
        0 0 50px white,
        0 0 100px white;
    }
  }
</style>
