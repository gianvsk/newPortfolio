<script setup lang="ts">
  import { useAnimation } from '~/composables/useAnimation';

  const story = await useAsyncStoryblok('homepage', {
    version: 'draft',
    resolve_relations: ['hero.contents', 'vertical-container.contents'],
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

  const verticalSlides = computed(
    () => story.value?.content.body[1].contents ?? []
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
      class="col-start-1 col-span-12 h-screen relative bg-white pt-6 px-4 md:px-8 overflow-hidden"
    >
      <div
        id="sphere-container"
        class="absolute inset-0 flex w-full justify-center items-center h-screen z-50 bg-black overflow-hidden"
      >
        <div
          id="sphere"
          class="h-10 w-10 border border-transparent rounded-full bg-white"
        />
      </div>
    </section>

    <section id="vertical-slider-container" class="col-start-1 col-span-12">
      <div
        class="absolute z-40 top-6 pl-6 md:top-12 left-0 py-2 right-0 md:pl-[68.5px]"
      >
        <h2 id="experience" class="text-4xl uppercase" />
      </div>

      <div class="relative w-full h-screen bg-white">
        <StoryblokComponent
          v-for="(singleStory, index) in verticalSlides"
          :key="singleStory"
          :blok="singleStory.content"
          class="absolute inset-0"
          :class="`z-[${verticalSlides.length - index}]`"
        />
      </div>
    </section>
    <section
      class="col-start-1 col-span-12 bg-black h-screen flex items-center"
    >
      <div class="text-5xl text-white">CIAO</div>
    </section>
    <section
      id="horizontal-slider"
      class="col-start-1 col-span-12 h-screen overflow-x-scroll flex flex-nowrap bg-black"
    >
      <!-- Horizontal scrolling section -->
      <div
        id="horizontal-slide"
        class="w-screen h-full bg-amber-300 flex items-center justify-center shrink-0"
      >
        <div class="bg-black px-8 py-5">
          <h4 class="text-white text-5xl">QUESTO E' UN TEST</h4>
        </div>
      </div>
      <div
        id="horizontal-slide"
        class="w-screen h-full bg-blue-300 flex items-center justify-center shrink-0"
      >
        <div class="bg-black px-8 py-5">
          <h4 class="text-white text-5xl">QUESTO E' UN TEST</h4>
        </div>
      </div>
      <div
        id="horizontal-slide"
        class="w-screen h-full bg-red-300 flex items-center justify-center shrink-0"
      >
        <div class="bg-black px-8 py-5">
          <h4 class="text-white text-5xl">QUESTO E' UN TEST</h4>
        </div>
      </div>
      <div
        id="horizontal-slide"
        class="w-screen h-full bg-amber-300 flex items-center justify-center shrink-0"
      >
        <div class="bg-black px-8 py-5">
          <h4 class="text-white text-5xl">QUESTO E' UN TEST</h4>
        </div>
      </div>
    </section>
    <section
      class="col-start-1 col-span-12 bg-white h-screen flex items-center"
    >
      <div class="text-5xl text-black">CIAO</div>
    </section>
  </div>
</template>

