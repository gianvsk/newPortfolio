<script setup lang="ts">
  import type { HeroSectionProps } from './HeroSection.props';

  defineProps<HeroSectionProps>();
</script>

<template>
  <section
    class="col-start-1 col-span-12 relative flex flex-col items-center justify-center overflow-hidden min-h-screen bg-[url('../bg/test1.jpg')] bg-cover"
  >
    <div class="flex flex-col gap-4 items-center z-[2] md:max-w-[70%]">
      <StoryblokComponent :blok="blok.card[0].content" class="shrink-0" />
      <div
        v-for="blok in blok.contents"
        :key="blok?.id"
        class="flex flex-col gap-4"
      >
        <StoryblokComponent
          v-for="item in blok.block"
          :key="item.id"
          :blok="item"
          class="shrink-0"
        />
      </div>
      <!--       <PopupContainer /> -->
    </div>
    <NuxtLink to="/">
      <NuxtImg
        src="/logoWhite.png"
        height="80"
        width="180"
        class="absolute top-0 left-0"
      />
    </NuxtLink>
  </section>
</template>
