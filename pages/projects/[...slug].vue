<script setup lang="ts">
  definePageMeta({
    layout: 'default',
  });

  const route = useRoute();

  const projectId = route.params?.slug[0] as string;

  const story = await useAsyncStoryblok(`components/cards/${projectId}`, {
    version: 'published',
  });

  useHead({
    title: story.value?.content?.metaTitle,
    meta: [
      { name: 'description', content: story.value?.content?.metaDescription },
    ],
    htmlAttrs: {
      lang: 'it',
    },
  });

  const content = story.value?.content || {};

  const { getDefaultResolver } = useResolver();

  const textStyle = {
    h3: 'text-lg md:my-4 md:mb-0 md:portrait:text-3xl lg:text-xl xl:text-2xl 3xl:text-4xl font-bold mb-2 md:portrait:my-6 2xl:my-8',
    h4: 'text-md  md:portrait:text-xl lg:text-lg xl:text-xl 3xl:text-2xl font-bold mb-2 md:portrait:mb-4 xl:mb-4 2xl:mb-8',
    p: 'my-2 text-xs md:text-sm md:portrait:text-lg lg:text-md xl:text-lg 3xl:text-2xl',
  };
</script>

<template>
  <Transition name="page-fade">
    <div
      :key="$route.fullPath"
      class="col-span-12 px-6 py-10 md:px-10 lg:gap-x-10 lg:px-10 md:py-0 md:pt-32 xl:px-[101.6px] 3xl:pt-36"
    >
      <div class="flex flex-col justify-start gap-4">
        <h1 class="text-white text-left text-4xl">{{ content.title }}</h1>
        <h2 class="text-white mt-2 text-2xl">{{ content.subtitle }}</h2>
        <NuxtImg
          v-if="content?.image?.filename"
          class="aspect-video mt-4"
          :src="content.image.filename"
          provider="storyblok"
          width="800"
          alt="Logo che rappresenza un simbolo e il nickname dello sviluppatore"
        />
        <div class="text-white">
          <StoryblokRichText
            v-if="content?.richText"
            :doc="content?.richText"
            :resolvers="getDefaultResolver(textStyle)"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
  .page-fade-enter-active,
  .page-fade-leave-active {
    transition: opacity 1s 0.2s ease-in-out;
  }

  .page-fade-enter-from,
  .page-fade-leave-to {
    opacity: 0;
  }
</style>
