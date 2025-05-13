<script setup lang="ts">
  import type { VerticalSlideSectionProps } from './VerticalSlideSection.props';

  const props = defineProps<VerticalSlideSectionProps>();

  const { $gsap } = useNuxtApp();

  onMounted(() => {
    $gsap.matchMedia().add(
      {
        isMobile: '(max-width: 1279px)',
        isDesktop: '(min-width: 1280px)',
      },
      (context: gsap.Context) => {
        if (!context.conditions) return;

        const { isMobile } = context.conditions;
        if (isMobile) return;

        const verticalSlideElements: Array<Element> =
          $gsap.utils.toArray('#vertical-slide');

        const slideHeight = $gsap.getProperty(
          '#vertical-slide',
          'height'
        ) as number;

        const sliderContainerAnimation = $gsap.from('#about', {
          scrollTrigger: {
            trigger: '#about',
            start: `top top`,
            end: `bottom+=${slideHeight * verticalSlideElements.length} bottom`,
            scrub: true,
            pin: true,
            // 0.001 has been added to have a more precise snap, in order to trigger
            // the #experience element animation onEnterBack
            snap: {
              snapTo: 1 / verticalSlideElements.length - 0.001,
              duration: 2,
            },
          },
        });

        const verticalSlideAnimations = verticalSlideElements.map((el, i) => {
          const nextColor = el.getAttribute('data-color');

          const verticalSlideAnimation = $gsap.fromTo(
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

          const titleAnimation = $gsap.fromTo(
            '#experience',
            {
              text:
                i > 0
                  ? props.blok?.[i - 1]?.content.title
                  : props.blok?.[i]?.content.title,
              wordSpacing: 200,
              x: 400,
            },
            {
              scrollTrigger: {
                trigger: el as Element,
                start: `top+=${slideHeight * (i - 1)} top`,
                end: `bottom+=${slideHeight * i} bottom`,
                scrub: true,

                onEnterBack: () => {
                  $gsap.fromTo(
                    '#experience',
                    { x: 400, wordSpacing: 200 },
                    {
                      x: 0,
                      wordSpacing: 1,
                      duration: 1.5,
                      ease: 'power2.out',
                    }
                  );
                },
              },
              color: nextColor ?? '',
              text: props.blok?.[i]?.content.title,
              wordSpacing: 1,
              opacity: 1,
              x: 0,
            }
          );
          return [verticalSlideAnimation, titleAnimation];
        });

        return () => {
          sliderContainerAnimation.kill();
          verticalSlideAnimations.forEach(anim =>
            anim.forEach(animation => animation.kill())
          );
        };
      }
    );
  });
</script>

<template>
  <SectionContainer id="about" no-padding class="xl:h-screen bg-white relative">
    <template #section-header>
      <div
        class="hidden xl:block absolute z-40 top-10 pl-4 pr-10 left-0 right-0 xl:top-28 3xl:top-36 lg:pl-10 xl:pl-[101.6px]"
      >
        <h2
          id="experience"
          class="hidden lg:font-mont lg:font-semibold text-3xl md:text-4xl md:portrait:text-4xl xl:text-4xl 2xl:text-4xl 3xl:text-6xl lg:uppercase lg:block lg:opacity-0 lg:md:max-w-[80%] lg:max-w-none"
        />
      </div>
    </template>

    <template v-for="singleStory in blok">
      <StoryblokComponent
        v-if="singleStory?.content"
        :key="singleStory.content?._uid"
        :blok="singleStory.content"
        class="h-screen xl:h-full xl:absolute xl:inset-0"
      />
    </template>
  </SectionContainer>
</template>
