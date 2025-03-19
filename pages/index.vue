<script setup lang="ts">
  import { useAnimation } from '~/composables/useAnimation';

  const story = await useAsyncStoryblok('homepage', {
    version: 'draft',
    resolve_relations: [
      'hero.contents',
      'vertical-container.contents',
      'timeline-slider.contents',
      'cards-container.contents',
    ],
  });

  const { homepageAnimations } = useAnimation();

  useHead({
    title: 'GS Portfolio Homepage',
    meta: [
      {
        name: 'description',
        content:
          'This is Gianvito Scandurra new portfolio homepage. You will find all the infos about the author, skills and projects.',
      },
    ],
    htmlAttrs: {
      lang: 'it',
    },
  });

  onMounted(() => {
    homepageAnimations(story.value);
  });

  const verticalSlides = computed<StoryblokContent[]>(
    () =>
      story.value?.content.body.find((story: ContentType) => {
        return story?.id === 'vertical-slider-container';
      }).contents
  );

  const timelineSlides = computed(() =>
    story.value?.content.body.find(
      (story: ContentType) => story?.id === 'timeline-slider'
    )
  );

  const projectCards = computed<StoryblokContent[]>(
    () =>
      story.value?.content.body.find(
        (story: ContentType) => story?.id === 'project-cards-container'
      ).contents
  );
</script>

<template>
  <div class="col-span-12 grid grid-cols-12">
    <section
      class="col-start-1 col-span-12 bg-black flex justify-center items-center h-[95vh]"
    >
      <StoryblokComponent
        v-for="singleStory in story.content.body[0].contents"
        :key="singleStory"
        :blok="singleStory.content"
        class="px-6 md:px-10 py-6 md:h-min-[90%] max-w-[60%]"
      />
    </section>

    <section
      id="vertical-slider"
      class="col-start-1 col-span-12 h-screen relative bg-white pt-6 px-4 md:px-8"
    >
      <div
        id="sphere-container"
        class="absolute inset-0 flex w-full justify-center items-center z-50 bg-black overflow-hidden"
      >
        <div
          id="sphere"
          class="h-10 w-10 border border-transparent rounded-full bg-white"
        />
      </div>
    </section>

    <section id="vertical-slider-container" class="col-start-1 col-span-12">
      <div
        class="absolute z-40 top-6 pl-4 md:top-8 md:portrait:top-10 lg:top-6 left-0 right-0 lg:pl-10 xl:pl-[101.6px] xl:top-8 2xl:top-14 3xl:top-20"
      >
        <h2
          id="experience"
          class="font-mont font-medium text-2xl md:text-4xl md:portrait:text-4xl xl:text-4xl 2xl:text-4xl 3xl:text-6xl uppercase opacity-0 md:max-w-[80%] lg:max-w-none"
        />
      </div>

      <div
        v-if="verticalSlides"
        class="relative w-full h-screen overflow-visible"
      >
        <StoryblokComponent
          v-for="singleStory in verticalSlides"
          id="vertical-slide"
          :key="singleStory.content._uid"
          :blok="singleStory.content"
          class="absolute inset-0"
        />
      </div>
    </section>

    <section v-if="timelineSlides" id="career" class="col-start-1 col-span-12">
      <StoryblokComponent :blok="timelineSlides" />
    </section>

    <section
      class="col-start-1 col-span-12 bg-neutral-900 px-6 py-10 md:px-5 md:gap-6 md:gap-y-6 lg:gap-x-10 md:pb-6 lg:px-10 xl:px-[101.6px] md:pt-10 lg:pt-8 xl:pt-10 2xl:pt-16 3xl:pt-[88px]"
    >
      <h2 class="mb-16 text-5xl text-white font-mont uppercase">Progetti</h2>
      <ul class="grid grid-cols-12 gap-y-5">
        <ClientOnly>
          <li
            v-for="{ content, position } in projectCards"
            :key="content?.id"
            class="col-span-12 md:col-start-1 md:col-span-6"
          >
            <LazyMouseShow>
              <StoryblokComponent :blok="content" :position="position" />
            </LazyMouseShow>
          </li>
        </ClientOnly>
      </ul>
    </section>
    <section
      class="col-start-1 col-span-12 bg-white h-screen flex items-center"
    />
  </div>
</template>
