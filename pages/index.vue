<script setup lang="ts">
  import type { SingleCardContentType } from '~/storyblok/organisms/CardList.props';
  import type { TimelineContentType } from '~/storyblok/organisms/TimelineSlideList.props';
  import type { SectionContainerHeaderType } from '~/components/organisms/SectionContainer.props';

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
    <VerticalSlideSection :blok="verticalSlides?.contents" />

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
