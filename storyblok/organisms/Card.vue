<script setup lang="ts">
  import type { CardProps } from './Card.props';

  const props = defineProps<CardProps>();

  const { $gsap } = useNuxtApp();

  const tl = $gsap.timeline();

  onMounted(() => {
    if (window.innerWidth >= 768) {
      tl.from('#hero-description, .showing-up-text', {
        yPercent: -500,
        autoAlpha: 0,
        stagger: 0.5,
        duration: 0.5,
      });
      tl.to('#hero-description', {
        duration: 6,
        text: { value: props.blok.description ?? '' },
        ease: 'power1.out',
        repeat: -1,
        repeatDelay: 1,
        yoyo: true,
        yoyoEase: 'power1.in',
      });
      tl.to('#second-text', {
        duration: 4,
        text: { value: `Sono uno sviluppatore web` },
        repeat: -1,
        repeatDelay: 3,
        yoyo: true,
        ease: 'power1.in',
      });
    }
  });
</script>

<template>
  <div
    ref="p"
    class="py-4 flex flex-col justify-center items-center gap-2 overflow-hidden text-center"
  >
    <div
      class="relative w-32 h-32 border rounded-full flex justify-center items-center group"
    >
      <NuxtPicture
        v-if="blok.image?.filename"
        :src="`${blok.image?.filename}/m/600x400`"
        :alt="blok.image?.alt"
        class="w-full h-full border overflow-hidden rounded-full object-cover"
        sizes="sm:100% md:600px"
        :img-attrs="{
          class:
            'w-full h-full scale-[3] -translate-y-10 translate-x-4 md:translate-y-0 object-center aspect-square md:translate-x-0 md:scale-100 md:group-hover:scale-[3] md:group-hover:translate-x-4 md:group-hover:-translate-y-10 md:duration-300 z-2',
        }"
        fit="cover"
        preload
      />
      <div
        class="hidden md:block absolute inset-0 border rounded-full border-white zoom-image"
      />
    </div>
    <h1
      id="first-text"
      class="text-white text-3xl font-bold showing-up-text mt-2"
    >
      {{ blok.title }}
    </h1>
    <h2 class="text-white text-2xl showing-up-text">{{ blok.subtitle }}</h2>
    <div class="mt-6 flex flex-col">
      <h3
        id="hero-description"
        class="text-md text-white font-mont font-bold min-h-[250px]"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .zoom-image {
    transition: all 0.3s ease-in;
    &:hover {
      transform: scale(1.2);
    }
  }
</style>
