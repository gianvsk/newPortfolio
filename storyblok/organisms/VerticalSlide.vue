<script setup lang="ts">
  import type { VerticalSlideProps } from './VerticalSlide.props';

  const props = defineProps<VerticalSlideProps>();

  const bgColor = ref('');

  /*   const currentBgColor = computed(() =>
    props.blok.bgColor ? `bg-${props.blok.bgColor}` : ''
  ); */

  console.log(props.blok.bgColor);

  onMounted(() => {
    bgColor.value = `bg-${props.blok.bgColor}`;
  });
</script>

<template>
  <div id="vertical-slide" :class="bgColor">
    <div class="w-full h-[90%] md:h-4/5 px-8 py-5">
      <div class="grid grid-cols-2 grid-rows-2 gap-6 h-full w-full py-6 px-18">
        <div
          class="col-start-1 row-start-1 col-span-1 row-span-1 md:col-span-1 md:row-span-1"
        >
          <span>{{ blok.title }}</span>
        </div>
        <div class="md:col-start-1 md:row-start-2 md:col-span-1 md:row-span-1">
          <span>{{ blok.subtitle }}</span>
        </div>
        <div class="col-start-2 row-start-1 col-span-1 row-span-1">
          <span>{{ blok.paragraph }}</span>
        </div>
        <div class="col-start-2 row-start-2 col-span-1 row-span-1">
          <span>{{ blok.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
