<script setup lang="ts">
  import type { TimelineSliderProps } from './TimelineSlider.props';

  const props = defineProps<TimelineSliderProps>();

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
    props.blok?.isDarkTheme ? timelineSlideStyle.dark : timelineSlideStyle.light
  );

  const fillSvgColor = computed(() =>
    props.blok?.isDarkTheme ? 'white' : 'black'
  );
</script>

<template>
  <div
    class="h-screen flex flex-col items-center relative gap-4 px-6 w-full md:px-5 md:gap-6 md:gap-y-6 lg:gap-x-10 md:pb-6 lg:px-10 xl:px-[101.6px] md:pt-10 lg:pt-8 xl:pt-10 2xl:pt-16 3xl:pt-[88px] overflow-hidden"
    :class="theme.bg"
  >
    <div class="w-full flex flex-col items-start gap-14">
      <div class="flex flex-col gap-8">
        <h2
          class="font-mont font-medium text-4xl 2xl:text-4xl 3xl:text-6xl uppercase md:max-w-[80%] lg:max-w-none"
          :class="theme.title"
        >
          {{ blok.title }}
        </h2>
        <span
          v-if="blok?.subtitle"
          class="text-lg font-medium xl:text-xl 3xl:text-3xl"
          :class="theme.description"
        >
          {{ blok?.subtitle }}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="45 35 460 30"
          width="520"
          class="shrink-0 w-full text-gray-500"
          :class="blok?.isDarkTheme ? 'text-zinc-600' : 'text-neutral-200'"
        >
          <defs>
            <mask id="colorMask">
              <rect
                id="maskRect"
                x="0"
                y="0"
                width="0"
                height="100"
                fill="white"
              />
            </mask>
          </defs>

          <line
            x1="50"
            y1="50"
            x2="500"
            y2="50"
            stroke="currentColor"
            stroke-width="1"
          />
          <circle cx="50" cy="50" r="4" fill="currentColor" />
          <circle cx="275" cy="50" r="4" fill="currentColor" />
          <circle cx="500" cy="50" r="4" fill="currentColor" />

          <g mask="url(#colorMask)">
            <line
              x1="50"
              y1="50"
              x2="500"
              y2="50"
              :stroke="fillSvgColor"
              stroke-width="1"
            />
            <circle cx="50" cy="50" r="4" :fill="fillSvgColor" />
            <circle cx="275" cy="50" r="4" :fill="fillSvgColor" />
            <circle cx="500" cy="50" r="4" :fill="fillSvgColor" />
          </g>
        </svg>
      </div>
      <div
        id="career-sections"
        class="flex flex-nowrap w-full h-full overflow-visbile gap-[50%]"
      >
        <div
          v-for="blok in blok?.contents"
          id="career-section"
          :key="blok.id"
          class="shrink-0 h-full w-full flex justify-between items-start gap-8 py-6 translate-x-full"
        >
          <article
            v-if="blok.content"
            class="flex gap-16 3xl:gap-[98px] 3xl:pt-20"
          >
            <div class="flex flex-col shrink-0">
              <span
                id="experience-text"
                class="text-md font-light text-neutral-500 font-mont xl:text-xl 3xl:text-3xl"
              >
                {{ blok.content.subtitle }}
              </span>
              <span
                id="experience-text"
                class="text-3xl text-neutral-900 font-semibold font-mont mt-1 whitespace-nowrap 3xl:text-6xl 3xl:mt-4"
                :class="theme.title"
              >
                {{ blok.content.title }}
              </span>
            </div>
            <p
              id="experience-text"
              class="text-md text-slate-800 mt-[34px] font-medium xl:text-xl 3xl:text-3xl"
              :class="theme.description"
            >
              {{ blok.content.description }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
