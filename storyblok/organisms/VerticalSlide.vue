<script setup lang="ts">
  import type { VerticalSlideProps } from './VerticalSlide.props';

  const props = defineProps<VerticalSlideProps>();

  console.log({ props });
</script>

<template>
  <div class="grid grid-cols-2 grid-rows-2 gap-6 bg-red-300 h-full w-full">
    <slot>
      <div class="col-start-1 row-start-1 col-span-1 row-span-1">
        <span class="text-black">{{ blok.title }}</span>
      </div>
      <div class="col-start-1 row-start-2 col-span-1 row-span-1">
        <span class="text-black">{{ blok.subtitle }}</span>
      </div>
    </slot>
    <div class="col-start-2 row-start-1 col-span-1 row-span-1">
      <span class="text-black">{{ blok.paragraph }}</span>
    </div>
    <div class="col-start-2 row-start-2 col-span-1 row-span-1">
      <span class="text-black">{{ blok.title }}</span>
    </div>
  </div>
</template>
