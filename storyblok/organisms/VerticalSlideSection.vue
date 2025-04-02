<script setup lang="ts">
  import type { VerticalSlideSectionProps } from './VerticalSlideSection.props';

  const props = defineProps<VerticalSlideSectionProps>();

  const { $gsap } = useNuxtApp();

  onMounted(() => {
    const verticalSliderTl = $gsap.timeline();

    const verticalSlideElements: Array<Element> =
      $gsap.utils.toArray('#vertical-slide');

    const slideHeight = $gsap.getProperty(
      '#vertical-slide',
      'height'
    ) as number;

    const sliderContainerAnimation = verticalSliderTl.from(
      '#vertical-slider-container',
      {
        scrollTrigger: {
          trigger: '#vertical-slider-container',
          start: `top top`,
          end: `bottom+=${slideHeight * verticalSlideElements.length} bottom`,
          scrub: true,
          pin: true,
          snap: { snapTo: 1 / verticalSlideElements.length, duration: 2 },
        },
      }
    );

    const slidesAnimation = verticalSlideElements.map((el, i) => {
      const nextColor = el.getAttribute('data-color');

      const verticalSlideAnimation = verticalSliderTl.fromTo(
        el as Element,
        {
          yPercent: 100,
          zIndex: i + 5,
        },
        {
          scrollTrigger: {
            trigger: el as Element,
            start: `top+=${slideHeight * (i - 1)} top`,
            end: `bottom+=${slideHeight * i} bottom`,
            scrub: true,
          },
          yPercent: 0,
          color: nextColor ?? '',
        }
      );

      const experienceAnimation = verticalSliderTl.fromTo(
        '#experience',
        {
          text:
            i > 0
              ? props.blok?.[i - 1]?.content.title
              : props.blok?.[i]?.content.title,
        },
        {
          scrollTrigger: {
            trigger: el as Element,
            start: `top+=${slideHeight * (i - 1)} top`,
            end: `bottom+=${slideHeight * i} bottom`,
            scrub: true,
          },
          color: nextColor ?? '',
          text: props.blok?.[i]?.content.title,
          opacity: 1,
        }
      );
      return { verticalSlideAnimation, experienceAnimation };
    });
    return () => {
      sliderContainerAnimation.kill();
      slidesAnimation.forEach(anim => {
        anim.experienceAnimation.kill();
        anim.verticalSlideAnimation.kill();
      });
    };
  });
</script>

<template>
  <SectionContainer
    id="vertical-slider-container"
    no-padding
    class="h-screen bg-white relative"
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
      v-for="singleStory in blok"
      :key="singleStory.content._uid"
      :blok="singleStory?.content"
      class="absolute inset-0"
    />
  </SectionContainer>
</template>
