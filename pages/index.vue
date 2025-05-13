<script setup lang="ts">
  import type { SingleCardContentType } from '~/storyblok/organisms/CardList.props';
  import type { TimelineContentType } from '~/storyblok/organisms/TimelineSlideList.props';
  import type { SectionContainerHeaderType } from '~/components/organisms/SectionContainer.props';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  const story = await useAsyncStoryblok('homepage', {
    version: 'published',
    resolve_relations: [
      'hero-section.contents',
      'hero-section.card',
      'hero-section.block',
      'vertical-container.contents',
      'timeline-slider.contents',
      'cards-container.contents',
    ],
  });

  const path = useRoute().fullPath;

  useHead({
    title:
      story.value?.content?.metaTitle ??
      'Gianvito Scandurra Portfolio Homepage',
    meta: [
      {
        name: 'description',
        content:
          story.value?.content?.metaDescription ??
          'This is Gianvito Scandurra new portfolio homepage. You will find all the infos about the author, skills and projects.',
      },
      {
        property: 'og:title',
        content:
          story.value?.content?.metaTitle ??
          'Gianvito Scandurra Portfolio Homepage',
      },
      { property: 'og:image', content: `${path}/logoDev.png` },
      {
        name: 'google-site-verification',
        content: process.env.GOOGLE_SITE_VERIFICATION,
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
    story.value?.content?.body?.find(
      (story: ContentType) => story?.id === 'hero-container'
    )
  );

  const verticalSlides = computed(() =>
    story.value?.content?.body?.find(
      (story: ContentType) => story?.id === 'vertical-slider-container'
    )
  );

  const timelineSlides = computed(() => {
    const storyContent = story.value?.content?.body?.find(
      (story: ContentType) => story?.id === 'timeline-slides-container'
    );
    const { contents, containerData } = transformData(storyContent);
    return {
      contents: contents as TimelineContentType[],
      containerData,
    };
  });

  const projectCards = computed(() => {
    const storyContent = story.value?.content?.body?.find(
      (story: ContentType) => story?.id === 'project-cards-container'
    );
    const { contents, containerData } = transformData(storyContent);
    return {
      contents: contents as SingleCardContentType[],
      containerData,
    };
  });

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(trigger => {
      trigger.kill(true);
    });
  });
</script>

<template>
  <div v-if="story?.content" class="grid grid-cols-12 bg-stone-900">
    <HeroSection :blok="heroContent" />
    <SphereContainer id="vertical-slider" />
    <VerticalSlideSection :blok="verticalSlides?.contents" />

    <SectionContainer
      v-if="timelineSlides"
      id="career"
      class="h-[100vh] xl:h-screen overflow-hidden"
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
      class="overflow-visible"
      :container-header="projectCards.containerData"
    >
      <CardList :contents="projectCards.contents" class="mt-8" />
    </SectionContainer>
  </div>
</template>
