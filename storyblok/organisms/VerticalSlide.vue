<script setup lang="ts">
  import type { VerticalSlideProps } from './VerticalSlide.props';

  const props = defineProps<VerticalSlideProps>();

  const bg = ref<HTMLElement>();

  const bgColor: Record<string, string> = {
    'neutral-900': 'bg-neutral-900',
    'red-600': 'bg-gray-900',
    'neutral-300': 'bg-neutral-300',
    white: 'bg-white',
  };

  const k = `text-${props.blok.bgColor}`;

  onMounted(() => {
    if (props.blok.bgColor) {
      bg.value?.classList.add(k);
    }
  });
</script>

<template>
  <div
    id="vertical-slide"
    ref="bg"
    class="absolute inset-0 shrink-0 flex flex-col justify-end"
    :class="`${bgColor[props.blok.bgColor]}`"
  >
    <div class="w-full h-[90%] md:h-4/5">
      <div
        class="grid grid-cols-2 grid-rows-2 gap-6 w-full py-10 px-[101.6px] h-full"
      >
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
