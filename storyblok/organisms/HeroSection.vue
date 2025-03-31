<script setup lang="ts">
  import type { HeroSectionProps } from './HeroSection.props';

  const { $gsap } = useNuxtApp();

  onMounted(() => {
    $gsap.fromTo(
      '#hero-section div a',
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        stagger: 0.5,
        duration: 1,
        delay: 5.5,
        ease: 'back.out',
        y: 0,
        clearProps: 'all',
      }
    );
  });

  defineProps<HeroSectionProps>();
</script>

<template>
  <section
    id="hero-section"
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
