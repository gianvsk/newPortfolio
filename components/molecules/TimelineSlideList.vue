<script setup lang="ts">
  import type { TimelineSlideListProps } from './TimelineSlideList.props';

  const props = defineProps<TimelineSlideListProps>();

  const timelineSlideStyle = {
    dark: {
      bg: 'bg-neutral-900',
      title: 'text-white',
      description: 'text-zinc-200',
    },
    light: {
      bg: 'bg-white',
      title: 'text-neutral-900',
      description: 'text-slate-800',
    },
  };

  const theme = computed(() =>
    props.theme === 'white' ? timelineSlideStyle.light : timelineSlideStyle.dark
  );

  const fillSvgColor = computed(() =>
    props?.theme === 'white' ? 'black' : 'white'
  );
</script>

<template>
  <div
    class="w-full flex flex-col items-start justify-center gap-10 h-full md:h-[50vh]"
    :class="theme.bg"
  >
    <TimelineSvg
      :fill-color="fillSvgColor"
      :bg-color="theme.bg"
      class="w-full md:w-1/2"
    />
    <div
      id="career-sections"
      class="flex flex-nowrap w-full overflow-visbile gap-[50%]"
    >
      <div
        v-for="blok in contents"
        id="career-section"
        :key="blok.id"
        class="shrink-0 w-full flex justify-between items-start gap-8 translate-x-full"
      >
        <TimelineSlide :blok="blok.content" :theme="theme" />
      </div>
    </div>
  </div>
</template>
