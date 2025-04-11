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
  <div class="grid grid-cols-12 bg-stone-900">
    <HeroSection :blok="heroContent" />
    <SphereContainer id="vertical-slider" />
    <VerticalSlideSection :blok="verticalSlides?.contents" />

    <SectionContainer
      v-if="timelineSlides"
      id="career"
      class="h-screen overflow-hidden"
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

    <footer class="flex col-span-12 h-[50vh] bg-stone-900">
      <div
        class="flex flex-col items-center justify-center w-full bg-stone-900 text-white"
      >
        <p class="text-sm">© 2025 Gianvito Scandurra</p>
        <p class="text-sm">All rights reserved</p>
        <p class="text-sm">Made with ❤️ in Italy</p>
      </div>
      <div class="w-full flex items-center justify-center">
        <ul class="flex-col gap-4 bg-stone-900">
          <li>
            <a class="text-white">Linkedin</a>
          </li>
          <li>
            <a class="text-white">Github</a>
          </li>
          <li>
            <a class="text-white">Instagram</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>
