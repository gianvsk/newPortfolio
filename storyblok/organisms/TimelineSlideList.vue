<script setup lang="ts">
  import type { TimelineSlideListProps } from '../../storyblok/organisms/TimelineSlideList.props';

  const props = defineProps<TimelineSlideListProps>();

  const timelineSlideStyle = {
    dark: {
      bg: 'bg-stone-900',
      title: 'text-white',
      description: 'text-zinc-200',
    },
    light: {
      bg: 'bg-white',
      title: 'text-stone-900',
      description: 'text-slate-800',
    },
  };

  const theme = computed(() =>
    props.theme === 'white' ? timelineSlideStyle.light : timelineSlideStyle.dark
  );

  const fillSvgColor = computed(() =>
    props?.theme === 'white' ? 'black' : 'white'
  );

  const { $gsap } = useNuxtApp();

  onMounted(() => {
    $gsap.matchMedia().add(
      {
        isMobile: '(max-width: 1023px)',
        isDesktop: '(min-width: 1024px)',
      },
      (context: gsap.Context) => {
        if (!context.conditions) return;

        const { isMobile } = context.conditions;

        const experienceSlides = $gsap.utils.toArray(
          '#career-section'
        ) as HTMLElement[];

        const multiplier = isMobile ? 3.5 : 3.25;

        $gsap.to('#career', {
          scrollTrigger: {
            trigger: '#career',
            start: isMobile ? 'top top' : 'top top',
            end: `top+=${window.innerHeight * experienceSlides.length * multiplier} bottom`,
            pin: true,
            scrub: true,
          },
          ease: 'none',
        });

        const slideAnimations = experienceSlides.map(el => {
          const tween = $gsap.to(el, {
            xPercent:
              -100 * experienceSlides.length -
              50 * (experienceSlides.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top top',
              end: `bottom+=${window.innerHeight * experienceSlides.length * 3} bottom`,
              scrub: true,
            },
          });

          const texts = el.querySelectorAll('#experience-text');
          $gsap.from(texts, {
            opacity: 0,
            y: -130,
            ease: 'elastic.out',
            duration: 2,
            stagger: 0.3,
            scrollTrigger: {
              trigger: el,
              containerAnimation: tween,
              start: 'left center+=30%',
              end: 'center right-=30%',
              toggleActions: 'play none reverse none',
            },
          });

          return tween;
        });

        const maskAnimation = $gsap.to('#maskRect', {
          attr: { width: 520 },
          scrollTrigger: {
            trigger: '#career-sections',
            start: `top left`,
            end: `bottom+=${window.innerHeight * experienceSlides.length * 3} bottom`,
            scrub: 1,
          },
          ease: 'none',
        });

        return () => {
          slideAnimations.forEach(anim => anim.kill());
          maskAnimation.kill();
          ScrollTrigger.getAll().forEach(st => st.kill());
        };
      }
    );
  });
</script>

<template>
  <div
    class="w-full flex flex-col items-start justify-center gap-10 h-full md:h-[50vh]"
    :class="theme.bg"
  >
    <TimelineSvg
      :fill-color="fillSvgColor"
      :bg-color="theme.bg"
      class="w-full md:w-1/2"
    />
    <div
      id="career-sections"
      class="flex flex-nowrap w-full overflow-visbile gap-[50%]"
    >
      <div
        v-for="blok in contents"
        id="career-section"
        :key="blok.id"
        class="shrink-0 w-full flex justify-between items-start gap-8 translate-x-full"
      >
        <StoryblokComponent :blok="blok.content" :theme="theme" />
      </div>
    </div>
  </div>
</template>
