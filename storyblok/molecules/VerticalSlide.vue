<script setup lang="ts">
  import type { VerticalSlideProps } from './VerticalSlide.props';

  const props = defineProps<VerticalSlideProps>();

  const { getDefaultResolver, getParagraphOnlyResolver } = useResolver();

  const textStyle = {
    h3: 'text-lg md:my-4 md:portrait:text-3xl lg:text-xl xl:text-2xl 3xl:text-4xl font-bold mb-2 md:portrait:my-6 2xl:my-8',
    h4: 'text-md  md:portrait:text-xl lg:text-lg xl:text-xl 3xl:text-2xl font-bold mb-2 md:portrait:mb-4 xl:mb-4 2xl:mb-8',
    p: 'text-xs md:text-sm md:portrait:text-lg lg:text-md xl:text-lg 3xl:text-2xl',
  };

  const bgColor: Record<string, string> = {
    'neutral-900': 'bg-stone-900',
    white: 'bg-white',
  };

  const dataColor = computed(() =>
    props.blok.bgColor === 'white' ? '#1c1917' : '#FFF'
  );

  const dataColorClass = computed(() =>
    props.blok.bgColor === 'white' ? 'text-stone-900' : 'text-white'
  );

  const dataBgColor = computed(() =>
    props.blok.bgColor === 'white' ? '#FFF' : '#1c1917'
  );

  const currentResolver = computed(() =>
    props.blok.isResolverActive
      ? getDefaultResolver(textStyle)
      : getParagraphOnlyResolver(textStyle)
  );
</script>

<template>
  <div
    id="vertical-slide"
    v-editable="blok"
    class="flex flex-col py-5 md:py-0 md:pt-32 3xl:pt-0 justify-end md:justify-end h-full"
    :class="`${bgColor[props.blok.bgColor]} ${dataColorClass}`"
    :data-color="dataColor"
    :data-bg-color="dataBgColor"
  >
    <div class="w-full h-[90dvh] xl:h-[95%] 2xl:h-full xl:pt-5 overflow-hidden">
      <div
        class="px-4 w-full h-full flex flex-col justify-start xl:flex-row xl:gap-x-10 w md:portrait:flex-col md:portrait:gap-8 md:px-5 md:pb-6 lg:px-10 xl:px-[101.6px]"
        :class="{
          'flex-col-reverse md:flex-row-reverse portrait:flex-col-reverse md:portrait:justify-start':
            blok.isReverseColumns,
        }"
      >
        <h2
          class="font-mont font-semibold text-2xl xl:hidden md:text-4xl md:portrait:text-4xl xl:text-4xl 2xl:text-4xl 3xl:text-6xl uppercase md:max-w-[80%] lg:max-w-none text-black"
          :class="dataColorClass"
        >
          {{ blok.title }}
        </h2>
        <!-- Over 768px resolution, gsap will apply text color on the children elements, not the class -->
        <div v-if="!blok?.isFirstBlockHidden && blok.mainRichText">
          <StoryblokRichText
            :doc="blok.mainRichText"
            :resolvers="currentResolver"
          />
        </div>
        <!-- Over 768px resolution, gsap will apply text color on the children elements, not the class -->
        <div v-if="!blok?.isSecondBlockHidden">
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

          <StoryblokComponent
            v-else-if="blok.isIconsBlock && blok.icons"
            :blok="blok.icons?.[0]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
