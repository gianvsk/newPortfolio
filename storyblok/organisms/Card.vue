<script setup lang="ts">
  import type { CardProps } from './Card.props';

  const props = defineProps<CardProps>();

  /* const p = ref(); */

  const { $gsap } = useNuxtApp();

  /*   const l = $gsap.timeline();
  onMounted(() => {
    if (p.value && c.value) {
      l.to(c.value, {
        x: 500,
        duration: 5,
        lazy: true,
        scrollTrigger: {
          trigger: document.body.querySelector('#ciao'),
          start: 'top+=400 top+=100',
          end: 'bottom center+=200',
          markers: true,
          scrub: true,
        },
      });
    }
  }); */

  const tl = $gsap.timeline();

  onMounted(() => {
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
  });
</script>

<template>
  <div ref="p" class="py-4 flex flex-col justify-center gap-2 overflow-hidden">
    <h1 id="first-text" class="text-white text-5xl font-bold showing-up-text">
      {{ blok.title }}
    </h1>
    <!-- <span id="second-text" class="text-white text-lg font-medium" /> -->
    <h2 class="text-white text-2xl showing-up-text">{{ blok.subtitle }}</h2>
    <div class="mt-6 flex flex-col">
      <!--       <NuxtPicture
        :src="`${blok.image.filename}/m/1000x800/`"
        :alt="blok.image.alt"
        sizes="100vw sm:25vw md:25vw"
        layout="responsive"
        class="max-w-full aspect-[6/7] shadow-lg self-center object-cover"
        fit="inside"
        loading="lazy"
        format="avif,webp"
        :img-attrs="{ class: 'img w-full h-full object-cover' }"
      /> -->
      <h3
        id="hero-description"
        class="text-md text-white font-mont font-bold min-h-[250px]"
      >
        <!-- {{ blok.description }} -->
      </h3>
    </div>
  </div>
</template>
