<script setup lang="ts">
  import type { CardProps } from './Card.props';

  const props = defineProps<CardProps>();

  const { $gsap } = useNuxtApp();

  const tl = $gsap.timeline();

  onMounted(() => {
    if (window.innerWidth >= 1024) {
      tl.from('#hero-description, .showing-up-text', {
        yPercent: -500,
        autoAlpha: 0,
        stagger: 0.5,
        duration: 0.5,
        delay: 0.5,
      });
      tl.to('#hero-description', {
        duration: 6,
        text: { value: (props.blok.description as string) ?? '' },
        ease: 'power1.out',
        delay: 0.5,
      });
    }
  });

  const splitDescriptionText = computed(
    () => props.blok.description.split('. ') ?? []
  );
</script>

<template>
  <div
    class="py-4 px-6 md:px-0 flex flex-col justify-center items-center gap-2 overflow-hidden md:text-center"
  >
    <div
      class="relative w-32 h-32 3xl:w-44 3xl:h-44 border rounded-full flex justify-center items-center group"
    >
      <NuxtPicture
        v-if="blok.image?.filename"
        :src="blok.image?.filename"
        :alt="blok.image?.alt"
        provider="storyblok"
        width="800"
        height="800"
        sizes="100% md:50vw"
        class="w-full h-full border overflow-hidden rounded-full object-cover"
        :img-attrs="{
          class:
            'w-full h-full scale-[2.5] aspect-square will-change-transform translate-y-[80px] -translate-x-[50px] md:translate-y-0 object-center aspect-square md:translate-x-0 md:scale-100 md:group-hover:scale-[4] md:group-hover:-translate-x-[80px] md:group-hover:translate-y-[150px] md:duration-300 3xl:group-hover:-translate-x-[120px] 3xl:group-hover:translate-y-[200px] z-2',
        }"
        format="webp"
      />
      <div
        class="hidden md:block absolute inset-0 border rounded-full border-white zoom-image"
      />
    </div>
    <div class="flex flex-col items-center md:gap-2 lg:gap-4">
      <div>
        <h1
          id="first-text"
          class="text-white text-2xl 2xl:text-4xl 3xl:text-6xl font-mont showing-up-text mt-2 text-center font-semibold"
        >
          {{ blok.title }}
        </h1>
        <h2
          class="text-stone-400 text-lg 2xl:text-2xl 3xl:text-4xl md:mt-2 font-mont font-medium showing-up-text text-center"
        >
          {{ blok.subtitle }}
        </h2>
      </div>
      <h3
        id="hero-description"
        class="text-lg text-white font-mont lg:min-h-[100px] hidden lg:block 2xl:text-xl 3xl:text-2xl"
      />
      <div class="flex flex-col mt-2 gap-2 xl:gap-4 lg:hidden">
        <p
          v-for="text in splitDescriptionText"
          :key="text"
          class="text-xs text-white font-mont lg:min-h-[100px] text-center"
        >
          {{ text }}.
        </p>
      </div>
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
