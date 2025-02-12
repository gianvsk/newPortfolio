<script setup lang="ts">
  const story = await useAsyncStoryblok(
    '/components/header/header-links-container',
    {
      version: 'draft',
      resolve_relations: 'header-container.links',
    }
  );

  /*   import Lenis from '@studio-freight/lenis';

onMounted(() => {
  // Initialize Lenis
  const lenis = new Lenis({
    lerp: 0.1, // Adjust the smoothness (lower values = smoother)
    smoothWheel: true, // Enable smooth wheel scrolling
  });

  // Update Lenis on each frame
  function raf(time: any) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});

onUnmounted(() => {
  // Clean up Lenis
  if (lenis) {
    lenis.destroy();
  }
}); */
</script>

<template>
  <div class="w-screen grid grid-cols-12 bg-white">
    <div class="flex flex-col col-start-1 col-span-12">
      <div
        v-if="story"
        class="flex flex-col justify-center w-full px-8 py-4 fixed top-0 left-0 right-0 z-[9999] bg-transparent"
      >
        <StoryblokComponent :blok="story.content" />
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .hover-animation {
    &:hover {
      animation: rotation 2s forwards linear;
    }
  }

  @keyframes rotation {
    0% {
      transform: translate(50px, 50px);
    }
    100% {
      transfrom: translateY(300px);
    }
  }
</style>
