<script setup lang="ts">
  const headerStory = await useAsyncStoryblok(
    '/components/header/header-links-container',
    {
      version: 'published',
      resolve_relations: 'header-container.links',
    }
  );

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
    <div class="relative flex flex-col col-start-1 col-span-12">
      <NuxtLink to="/" class="absolute top-[22px] 3xl:w-[10%] z-[50]">
        <NuxtImg
          src="/logoWhite.png"
          width="150"
          height="40"
          alt="Logo che rappresenza un simbolo e il nickname dello sviluppatore"
        />
      </NuxtLink>
      <header
        v-if="headerStory?.content"
        class="fixed w-full xl:top-[30px] xl:left-1/2 xl:-translate-x-1/2 z-[100] xl:rounded-full"
      >
        <StoryblokComponent :blok="headerStory.content" />
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
