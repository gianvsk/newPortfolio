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
      });
    }
  });
</script>

<template>
  <div
    class="py-4 flex flex-col justify-center items-center gap-2 overflow-hidden text-center"
  >
    <div
      class="relative w-32 h-32 border rounded-full flex justify-center items-center group"
    >
      <NuxtPicture
        v-if="blok.image?.filename"
        :src="blok.image?.filename"
        :alt="blok.image?.alt ?? 'Immagine di me a Milano'"
        provider="storyblok"
        width="600"
        height="400"
        sizes="25vw"
        class="w-full h-full border overflow-hidden rounded-full object-cover"
        :img-attrs="{
          class:
            'w-full h-full scale-[3] -translate-y-10 translate-x-4 md:translate-y-0 object-center aspect-square md:translate-x-0 md:scale-100 md:group-hover:scale-[3] md:group-hover:translate-x-4 md:group-hover:-translate-y-10 md:duration-300 z-2',
        }"
        format="webp"
        :preload="{ fetchPriority: 'high' }"
      />
      <div
        class="hidden md:block absolute inset-0 border rounded-full border-white zoom-image"
      />
    </div>
    <div class="flex flex-col items-center gap-6">
      <div>
        <h1
          id="first-text"
          class="text-white text-2xl 2xl:text-4xl font-mont font-medium showing-up-text mt-2 text-left md:text-center uppercase"
        >
          {{ blok.title }}
        </h1>
        <h2
          class="text-zinc-300 text-lg 2xl:text-2xl font-mont font-medium showing-up-text text-left md:text-center"
        >
          {{ blok.subtitle }}
        </h2>
      </div>
      <h3
        id="hero-description"
        class="text-md text-white font-mont font-bold md:min-h-[150px] lg:min-h-[100px]"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @screen md {
    .zoom-image {
      transition: all 0.3s ease-in;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
</style>
