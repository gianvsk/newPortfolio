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
        class="absolute top-[16px] xl:top-[30px] left-6 md:left-10 lg:left-10 md:pt-6 xl:left-[101.6px] 3xl:pt-6"
      >
        <button
          class="w-8 h-8 md:w-12 md:h-12 3xl:w-16 3xl:h-16 px-2 py-1 border-white border bg-neutral-900 rounded-full group hover:bg-white hover:scale-125 transition-all duration-300"
          aria-label="Torna alla pagina precedente"
          @click="$router.back()"
        >
          <IconsArrowLeft
            class="text-white group-hover:text-neutral-900"
            :font-controlled="false"
            filled
          />
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
