<script setup lang="ts">
  import type { SingleCardContentType } from '~/storyblok/organisms/CardList.props';
  import type { TimelineContentType } from '~/storyblok/organisms/TimelineSlideList.props';
  import type { SectionContainerHeaderType } from '~/components/organisms/SectionContainer.props';
  import { useAnimation } from '~/composables/useAnimation';

  const story = await useAsyncStoryblok('homepage', {
    version: 'draft',
    resolve_relations: [
      'hero-section.contents',
      'hero-section.card',
      'hero-section.block',
      'vertical-container.contents',
      'timeline-slider.contents',
      'cards-container.contents',
    ],
  });

  console.log('story', story);

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

  const heroContent = computed(() =>
    story.value?.content.body.find(
      (story: ContentType) => story?.id === 'hero-container'
    )
  );

  const verticalSlides = computed(() =>
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
    <HeroSection :blok="heroContent" />
    <SphereContainer id="vertical-slider" />

    <SectionContainer
      v-if="verticalSlides?.contents"
      id="vertical-slider-container"
      no-padding
      class="h-screen bg-white"
    >
      <template #section-header>
        <div
          class="absolute z-40 top-0 py-3 pl-4 pr-10 md:top-14 md:portrait:top-10 lg:top-6 left-0 right-0 lg:pl-10 xl:pl-[101.6px] xl:top-8 2xl:top-14 3xl:top-20"
        >
          <h2
            id="experience"
            class="font-mont font-semibold text-3xl md:text-4xl md:portrait:text-4xl xl:text-4xl 2xl:text-4xl 3xl:text-6xl uppercase opacity-0 md:max-w-[80%] lg:max-w-none"
          />
        </div>
      </template>

      <StoryblokComponent
        v-for="singleStory in verticalSlides.contents"
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
      is-justify-start
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
  </div>
</template>
