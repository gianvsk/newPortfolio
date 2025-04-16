<script setup lang="ts">
  import type { SectionContainerProps } from './SectionContainer.props';

  const props = defineProps<SectionContainerProps>();

  const bgColors = {
    dark: 'bg-black',
    'dark-neutral': 'bg-stone-900',
    white: 'bg-white',
  };

  const timelineSlideStyle = {
    dark: {
      bg: 'bg-stone-900',
      title: 'text-white',
      description: 'text-neutral-300',
    },
    light: {
      bg: 'bg-white',
      title: 'text-stone-900',
      description: 'text-slate-800',
    },
  };

  const theme = computed(() =>
    props.containerHeader?.theme === 'white'
      ? timelineSlideStyle.light
      : timelineSlideStyle.dark
  );

  const fillSvgColor = computed(() =>
    props.containerHeader?.theme === 'white' ? 'black' : 'white'
  );

  const currentBgColor = computed(() => {
    if (props.containerHeader?.theme)
      return bgColors[props?.containerHeader?.theme as keyof typeof bgColors];
    return 'bg-stone-900';
  });

  defineExpose({
    theme,
    fillSvgColor,
  });

  onMounted(() => {
    if (props.triggerId && window.innerWidth > 1279) {
      console.log('trigger', props.triggerId);
      const { $gsap } = useNuxtApp();

      $gsap.fromTo(
        `#${props.triggerId} #section-container-title, #section-container-subtitle`,
        { autoAlpha: 0, x: -500, wordSpacing: 50 },
        {
          scrollTrigger: {
            trigger: `#${props.triggerId}`,
            start: 'top center',
            end: 'top bottom-=10%',
            toggleActions: 'play none reverse none',
          },
          autoAlpha: 1,
          x: 0,
          ease: 'power2.inOut',
          wordSpacing: 1,
          duration: 1,
        }
      );
    }
  });
</script>

<template>
  <section
    class="col-start-1 col-span-12 relative flex flex-col"
    :class="[
      noPadding
        ? 'p-0'
        : 'px-6 py-10 md:px-10 lg:gap-x-10 lg:px-10 md:py-0 md:pt-32 xl:px-[101.6px] 3xl:pt-36',
      currentBgColor,
      isJustifyStart ? 'justify-start' : 'justify-center',
    ]"
  >
    <slot name="section-header">
      <div class="flex flex-col gap-8">
        <h2
          v-if="containerHeader?.title"
          id="section-container-title"
          class="font-mont font-medium text-2xl xl:text-4xl 3xl:text-6xl uppercase lg:max-w-none"
          :class="theme.title"
        >
          {{ containerHeader?.title }}
        </h2>
        <span
          v-if="containerHeader?.subtitle"
          id="section-container-subtitle"
          class="text-md font-mont font-medium text-md xl:text-2xl 3xl:text-3xl"
          :class="theme?.description"
        >
          {{ containerHeader?.subtitle }}
        </span>
      </div>
    </slot>
    <slot :theme="containerHeader?.theme" />
  </section>
</template>
