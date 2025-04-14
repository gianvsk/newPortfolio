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
            /*             onEnter: elem => elem.animation?.restart(),
            onToggle: elem => elem.isActive && elem.animation?.restart(), */
            onEnterBack: () => ScrollTrigger.refresh(),
            /*             onEnter: eleme => eleme.animation?.restart(), */
            /*             onLeave: elem => elem.animation?.restart(), */
            snap: { snapTo: 1 / verticalSlideElements.length, duration: 2 },
          },
        });

        verticalSlideElements.map((el, i) => {
          const nextColor = el.getAttribute('data-color');

          $gsap.fromTo(
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

          $gsap.fromTo(
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
        });

        return () => {
          sliderContainerAnimation.kill();
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

    <StoryblokComponent
      v-for="singleStory in blok"
      :key="singleStory.content._uid"
      :blok="singleStory?.content"
      class="xl:absolute xl:inset-0"
    />
  </SectionContainer>
</template>
