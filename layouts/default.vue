<script setup lang="ts">
  const story = await useAsyncStoryblok(
    '/components/header/header-links-container',
    {
      version: 'draft',
      resolve_relations: 'header-container.links',
    }
  );

  /* onMounted(() => {
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
  <div class="w-screen flex flex-col overflow-hidden relative bg-stone-900">
    <div class="flex flex-col col-start-1 col-span-12">
      <header
        v-if="story"
        class="fixed top-10 xl:top-[30px] left-1/2 -translate-x-1/2 z-[100] bg-black rounded-full"
      >
        <StoryblokComponent :blok="story.content" />
      </header>
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
      transform: translateY(300px);
    }
  }
</style>
