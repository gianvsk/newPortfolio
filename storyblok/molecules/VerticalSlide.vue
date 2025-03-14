<script setup lang="ts">
  import type { VerticalSlideProps } from './VerticalSlide.props';

  const props = defineProps<VerticalSlideProps>();

  const { getDefaultResolver, getParagraphOnlyResolver } = useResolver();

  const headingStyle = {
    h3: 'text-lg lg:text-xl xl:text-2xl 3xl:text-4xl font-bold font-mont mb-3 xl:mb-4 2xl:mb-8',
    h4: 'text-md lg:text-lg xl:text-xl 3xl:text-2xl font-bold font-mont mb-3 xl:mb-4 2xl:mb-8',
  };

  const bgColor: Record<string, string> = {
    'neutral-900': 'bg-neutral-900',
    white: 'bg-white',
  };

  const dataColor = computed(() =>
    props.blok.bgColor === 'white' ? '#242424' : '#FFF'
  );

  const currentResolver = computed(() =>
    props.blok.isResolverActive
      ? getDefaultResolver(headingStyle)
      : getParagraphOnlyResolver(headingStyle)
  );
</script>

<template>
  <div
    v-editable="blok"
    class="flex flex-col justify-end py-5 md:py-0"
    :class="`${bgColor[props.blok.bgColor]}`"
    :data-color="dataColor"
  >
    <div
      class="w-full h-[80dvh] md:h-[82.5%] lg:h-[85%] 2xl:h-4/5 overflow-scroll md:overflow-hidden"
    >
      <div
        class="gap-4 px-6 w-full h-full md:flex md:px-5 md:gap-6 md:gap-y-6 lg:gap-x-10 md:pb-6 lg:px-10 xl:px-[101.6px]"
        :class="{ 'flex-row-reverse': blok.isReverseColumns }"
      >
        <!-- Over 768px resolution, gsap will apply text color on the children elements, not the class -->
        <div class="md:flex-1">
          <StoryblokRichText
            v-if="blok.mainRichText"
            :doc="blok.mainRichText"
            :resolvers="currentResolver"
          />
        </div>
        <!-- Over 768px resolution, gsap will apply text color on the children elements, not the class -->
        <div class="md:flex-1">
          <!-- add :resolvers="resolvers" if need to, it was made to render Storyblok Accordions in this case -->
          <StoryblokRichText
            v-if="
              blok.secondaryRichText?.content &&
              !blok?.isSingleImage &&
              !blok?.isIconsBlock
            "
            :doc="blok.secondaryRichText"
            :resolvers="currentResolver"
          />
          <NuxtImg
            v-else-if="blok?.isSingleImage && blok?.image"
            :src="blok.image?.filename"
            class="w-50% h-full object-cover"
            provider="storyblok"
          />
          <StoryblokComponent
            v-else-if="blok.isIconsBlock && blok.icons"
            :blok="blok.icons?.[0]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
