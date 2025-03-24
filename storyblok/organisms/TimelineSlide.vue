<script setup lang="ts">
  import type { TimelineSlideProps } from './TimelineSlide.props';

  defineProps<TimelineSlideProps>();
</script>

<template>
  <article
    v-editable="blok"
    class="flex flex-col md:flex-row md:portrait:flex-col md:portrait:gap-8 gap-4 md:gap-16 3xl:gap-[98px] 3xl:pt-20"
  >
    <div class="flex flex-col shrink-0">
      <span
        id="experience-text"
        class="text-md font-light text-neutral-500 font-mont md:portrait:text-3xl lg:text-xl 3xl:text-3xl"
      >
        {{ blok.subtitle }}
      </span>
      <span
        id="experience-text"
        class="text-3xl text-neutral-900 font-semibold font-mont mt-1 whitespace-nowrap md:portrait:text-5xl 3xl:text-6xl 3xl:mt-4"
        :class="theme.title"
      >
        {{ blok.title }}
      </span>
    </div>
    <p
      id="experience-text"
      class="font-medium text-md text-slate-800 mt-0 md:portrait:mt-0 md:portrait:text-2xl lg:text-xl xl:text-xl 3xl:text-3xl"
      :class="theme.description"
    >
      {{ blok.description }}
    </p>
  </article>
</template>
