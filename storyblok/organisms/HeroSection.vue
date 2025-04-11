<script setup lang="ts">
  import type { HeroSectionProps } from './HeroSection.props';

  const { $gsap } = useNuxtApp();

  onMounted(() => {
    $gsap.matchMedia().add(
      {
        isMobile: '(max-width: 767px)',
        isDesktop: '(min-width: 768px)',
      },
      (context: gsap.Context) => {
        if (!context.conditions) return;

        const { isMobile } = context.conditions;

        const delayTime = isMobile ? 0.5 : 5.5;

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
            delay: delayTime,
            ease: 'back.out',
            y: 0,
            clearProps: 'all',
          }
        );
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
    <div class="flex flex-col items-center z-[2] md:max-w-[70%]">
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
    </div>
    <NuxtLink to="/" class="absolute top-0 left-0 3xl:w-[10%]">
      <NuxtImg
        class="3xl:w-full h-full"
        src="/logoWhite.png"
        width="150"
        height="90"
        alt="Logo che rappresenza un simbolo e il nickname dello sviluppatore"
      />
    </NuxtLink>
  </section>
</template>
