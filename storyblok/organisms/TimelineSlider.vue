<script setup lang="ts">
  import type { TimelineSliderProps } from './TimelineSlider.props';

  defineProps<TimelineSliderProps>();
</script>

<template>
  <section
    id="career"
    class="col-start-1 col-span-12 h-screen bg-white flex flex-col items-center relative p-20"
  >
    <div class="w-4/5 flex flex-col items-start gap-8">
      <span class="text-2xl uppercase font-mont font-medium">
        {{ blok.title }}
      </span>
      <svg
        ref="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="45 35 460 30"
        width="520"
        class="text-neutral-200 shrink-0"
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
        <circle cx="50" cy="50" r="4" fill="text-black" />
        <circle cx="275" cy="50" r="4" fill="currentColor" />
        <circle cx="500" cy="50" r="4" fill="currentColor" />

        <g mask="url(#colorMask)">
          <line
            x1="50"
            y1="50"
            x2="500"
            y2="50"
            stroke="#000"
            stroke-width="1"
          />
          <circle cx="50" cy="50" r="4" fill="text-black" />
          <circle cx="275" cy="50" r="4" fill="text-black" />
          <circle cx="500" cy="50" r="4" fill="text-black" />
        </g>
      </svg>
      <div
        id="career-sections"
        class="flex flex-nowrap w-full h-full overflow-visible"
      >
        <div
          v-for="blok in blok?.contents"
          id="career-section"
          :key="blok.id"
          class="shrink-0 h-full w-full flex justify-between items-start gap-8 py-6"
        >
          <article v-if="blok.content" class="flex gap-16">
            <div class="flex flex-col">
              <span
                id="experience-text"
                class="text-md font-light text-neutral-500 font-mont"
              >
                {{ blok.content.subtitle }}
              </span>
              <span
                id="experience-text"
                class="text-2xl text-neutral-900 font-semibold font-mont mt-1 whitespace-nowrap"
              >
                {{ blok.content.title }}
              </span>
            </div>
            <p
              id="experience-text"
              class="text-md text-slate-800 mt-3 font-medium"
            >
              {{ blok.content.description }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
