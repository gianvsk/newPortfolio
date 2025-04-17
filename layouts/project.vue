<script setup lang="ts">
  const footerStory = await useAsyncStoryblok(
    '/components/footer/footer-container',
    {
      version: 'published',
      resolve_relations: 'footer-container.contents',
    }
  );
</script>

<template>
  <div class="w-screen flex flex-col overflow-hidden relative bg-stone-900">
    <div class="flex flex-col col-start-1 col-span-12">
      <header
        class="absolute top-[16px] xl:top-[30px] left-6 py-16 md:left-10 lg:left-10 md:pt-6 xl:left-[101.6px] 3xl:pt-6"
      >
        <button
          class="w-8 h-8 xl:w-12 xl:h-12 3xl:w-16 3xl:h-16 px-2 py-1 border-white border bg-neutral-900 rounded-full"
          aria-label="Torna alla pagina precedente"
          @click="$router.back()"
        >
          <IconsArrowLeft class="text-white" :font-controlled="false" filled />
        </button>
      </header>
    </div>
    <slot />
    <StoryblokComponent
      v-if="footerStory?.content"
      :blok="footerStory.content"
    />
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
