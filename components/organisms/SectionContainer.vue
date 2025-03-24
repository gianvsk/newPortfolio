<script setup lang="ts">
  import type { SectionContainerProps } from './SectionContainer.props';

  const props = defineProps<SectionContainerProps>();

  const bgColors = {
    dark: 'bg-black',
    'dark-neutral': 'bg-neutral-900',
    white: 'bg-white',
  };

  const timelineSlideStyle = {
    dark: {
      bg: 'bg-neutral-900',
      title: 'text-white',
      description: 'text-neutral-500',
    },
    light: {
      bg: 'bg-white',
      title: 'text-neutral-900',
      description: 'text-slate-800',
    },
  };

  const theme = computed(() =>
    props.containerHeader?.theme === 'white'
      ? timelineSlideStyle.light
      : timelineSlideStyle.dark
  );

  const fillSvgColor = computed(() =>
    props.containerHeader?.theme === 'white' ? 'black' : 'white'
  );

  const currentBgColor = computed(() => {
    if (props.containerHeader?.theme)
      return bgColors[props?.containerHeader?.theme as keyof typeof bgColors];
    return 'bg-black';
  });

  defineExpose({
    theme,
    fillSvgColor,
  });
</script>

<template>
  <section
    class="col-start-1 col-span-12 relative flex flex-col overflow-hidden"
    :class="[
      noPadding
        ? 'p-0'
        : 'px-6 py-10 md:px-10 lg:gap-x-10 md:pb-6 lg:px-10 lg:pt-20 lg:pb-20 xl:px-[101.6px] md:pt-10 xl:pt-10 2xl:pt-16 3xl:pt-[88px]',
      currentBgColor,
    ]"
  >
    <slot name="section-header">
      <div class="flex flex-col gap-8">
        <h2
          v-if="containerHeader?.title"
          class="font-mont font-medium text-xl xl:text-5xl 3xl:text-6xl uppercase lg:max-w-none"
          :class="theme.title"
        >
          {{ containerHeader?.title }}
        </h2>
        <span
          v-if="containerHeader?.subtitle"
          class="text-md font-mont font-medium text-md xl:text-2xl 3xl:text-3xl"
          :class="theme?.description"
        >
          {{ containerHeader?.subtitle }}
        </span>
      </div>
    </slot>
    <slot :theme="containerHeader?.theme" />
  </section>
</template>
