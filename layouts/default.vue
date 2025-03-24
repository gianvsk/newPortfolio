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
  <div class="w-screen flex flex-col overflow-hidden">
    <!--     <div class="flex flex-col col-start-1 col-span-12">
      <div
        v-if="story"
        class="flex items-center ml-6 py-4 fixed top-0 left-0 bottom-0 z-[9999] bg-transparent"
      >
        <StoryblokComponent :blok="story.content" />
      </div>
    </div> -->
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
      transform: translateY(300px);
    }
  }
</style>
