<script setup lang="ts">
  import type { SingleCardContentType } from '~/components/molecules/CardList.props';
  import type { TimelineContentType } from '~/components/molecules/TimelineSlideList.props';
  import type { SectionContainerHeaderType } from '~/components/organisms/SectionContainer.props';
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
    title: story.value.content?.metaTitle ?? 'GS Portfolio Homepage',
    meta: [
      {
        name: 'description',
        content:
          story.value.content?.metaDescription ??
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

  const transformData = (story: BodyItem) => {
    const { contents, title, subtitle, theme } = story;

    return {
      contents: contents || [],
      containerData: {
        title: title || '',
        subtitle: subtitle || '',
        theme: theme || 'dark',
      } as SectionContainerHeaderType,
    };
  };

  const heroSingleContent = computed(
    () =>
      story.value?.content.body.find(
        (story: ContentType) => story?.id === 'hero-container'
      ).contents[0].content
  );

  const verticalSlidesContents = computed(() =>
    story.value?.content.body.find(
      (story: ContentType) => story?.id === 'vertical-slider-container'
    )
  );

  const timelineSlides = computed(() => {
    const storyContent = story.value?.content.body.find(
      (story: ContentType) => story?.id === 'timeline-slides-container'
    );
    const { contents, containerData } = transformData(storyContent);
    return {
      contents: contents as TimelineContentType[],
      containerData,
    };
  });

  const projectCards = computed(() => {
    const storyContent = story.value?.content.body.find(
      (story: ContentType) => story?.id === 'project-cards-container'
    );
    const { contents, containerData } = transformData(storyContent);
    return {
      contents: contents as SingleCardContentType[],
      containerData,
    };
  });
</script>

<template>
  <div class="grid grid-cols-12">
    <SectionContainer
      class="col-start-1 col-span-12 flex bg-black justify-center items-center h-[95vh]"
      :container-header="heroSingleContent"
    >
      <template #section-header>
        <div />
      </template>
      <StoryblokComponent :blok="heroSingleContent" />
    </SectionContainer>

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

    <SectionContainer
      v-if="verticalSlidesContents"
      id="vertical-slider-container"
      no-padding
      class="h-screen bg-white"
    >
      <template #section-header>
        <div
          class="absolute z-40 top-6 pl-4 md:top-8 md:portrait:top-10 lg:top-6 left-0 right-0 lg:pl-10 xl:pl-[101.6px] xl:top-8 2xl:top-14 3xl:top-20"
        >
          <h2
            id="experience"
            class="font-mont font-semibold text-2xl md:text-4xl md:portrait:text-4xl xl:text-4xl 2xl:text-4xl 3xl:text-6xl uppercase opacity-0 md:max-w-[80%] lg:max-w-none"
          />
        </div>
      </template>

      <StoryblokComponent
        v-for="singleStory in verticalSlidesContents.contents"
        :key="singleStory.content._uid"
        :blok="singleStory.content"
        class="absolute inset-0"
      />
    </SectionContainer>

    <SectionContainer
      v-if="timelineSlides"
      id="career"
      class="overflow-visible h-screen"
      :container-header="timelineSlides.containerData"
    >
      <TimelineSlideList
        :contents="timelineSlides.contents"
        :theme="timelineSlides.containerData.theme"
      />
    </SectionContainer>

    <SectionContainer
      v-if="projectCards"
      id="projects"
      :container-header="projectCards.containerData"
    >
      <CardList :contents="projectCards.contents" class="mt-8" />
    </SectionContainer>

    <SectionContainer
      id="contacts"
      class="h-screen flex justify-center items-center bg-white"
    >
      <div class="h-10 w-10 rounded-full bg-neutral-900" />
    </SectionContainer>
  </div>
</template>
