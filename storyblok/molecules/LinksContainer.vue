<script setup lang="ts">
  import type { LinksContainerProps } from './LinksContainer.props';

  defineProps<LinksContainerProps>();
</script>

<template>
  <div
    v-for="container in blok.block"
    :key="container.id"
    class="flex flex-col gap-1"
    :class="[container.id === 'bottom-block' ? 'hidden' : 'px-5 py-3']"
  >
    <span
      v-if="container?.label"
      class="text-white text-center font-mont font-medium text-lg"
    >
      {{ container?.label }}
    </span>
    <ul class="flex gap-6 h-min">
      <li v-for="link in container.block" :key="link.id">
        <StoryblokComponent :blok="link" class="text-white" />
      </li>
    </ul>
  </div>
</template>
