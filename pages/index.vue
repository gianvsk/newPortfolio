<script setup lang="ts">
  const story = await useAsyncStoryblok('homepage', {
    version: 'draft',
    resolve_relations: ['hero.contents', 'vertical-container.contents'],
  });

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

  const { $gsap } = useNuxtApp();

  onMounted(() => {
    /*     const containerHeight = (document.querySelector('#vertical-slider') as HTMLElement)?.offsetHeight; */

    $gsap.to('#navbar', {
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: `bottom+=${window.innerHeight / 4} 90%`,
        scrub: true,
      },
      background: 'black',
      color: 'white',
      borderColor: 'text-white/50',
    });

    const sphereTl = $gsap.timeline();

    sphereTl.to('#vertical-slider', {
      scrollTrigger: {
        trigger: '#vertical-slider',
        start: 'top top',
        end: `bottom+=${window.innerHeight * 9} bottom`,
        scrub: true,
        pin: true,
      },
    });

    sphereTl.to('#sphere-container', {
      scrollTrigger: {
        trigger: '#vertical-slider',
        start: 'top top',
        end: `bottom+=${window.innerHeight / 2} bottom`,
        scrub: true,
      },
      scale: 0.5,
      onComplete: () => {
        $gsap.set('#sphere-container', { display: 'none' });
      },
    });

    sphereTl.to('#sphere', {
      scrollTrigger: {
        trigger: '#sphere-container',
        start: 'top top',
        end: `bottom+=${window.innerHeight / 2} bottom`,
        scrub: true,
      },
      scale: 50,
      ease: 'power1.in',
    });

    const verticalSliderTl = $gsap.timeline();
    const verticalSlideElements = $gsap.utils.toArray('#vertical-slide');

    verticalSlideElements.forEach((el, i, arr) => {
      verticalSliderTl
        .from(el as Element, {
          scrollTrigger: {
            trigger: el as Element,
            start: `top+=${window.innerHeight * (i * 2)} top`,
            end: `top+=${window.innerHeight * (i * 2 + 2)} bottom`,
            scrub: true,
          },
          yPercent: 100,
        })
        .to(el as Element, {
          scrollTrigger: {
            trigger: el as Element,
            start: `top+=${window.innerHeight * (i * 2)} top`,
            end: `top+=${window.innerHeight * (i * 2 + 2)} bottom`,
            scrub: true,
          },
          color: $gsap.getProperty(
            (arr as Array<Element>)[arr.length - 1 - i],
            'background-color'
          ),
        });
    });

    verticalSlideElements.forEach((el, i, arr) => {
      verticalSliderTl.from('#experience', { opacity: 0 });
      verticalSliderTl.to('#experience', {
        scrollTrigger: {
          trigger: el as Element,
          start: `top+=${i > 0 ? window.innerHeight * (i * 2) : window.innerHeight * i} top`,
          end: `bottom+=${i > 0 ? window.innerHeight * (i * 2 + 0.5) : window.innerHeight * (i + 1)} 80%`,
          scrub: true,
          markers: true,
        },
        color: $gsap.getProperty(
          (arr as Array<Element>)[arr.length - 1 - i],
          'background-color'
        ),
        opacity: 1,
      });
    });

    // Horizontal scroll and animation for #testl sections
    const horizontalSliderTl = $gsap.timeline();
    const horizontalSlideElements = $gsap.utils.toArray('#testl');

    horizontalSliderTl.to('#horizontal-slider', {
      scrollTrigger: {
        trigger: '#horizontal-slider',
        start: 'top top',
        end: `top+=${window.innerWidth * 4} bottom`,
        scrub: true,
        pin: true,
      },
    });

    horizontalSlideElements.forEach((el, i) => {
      horizontalSliderTl.to(el as Element, {
        scrollTrigger: {
          trigger: el as Element,
          start: `top+=${(i - 1) * window.innerWidth} top`,
          end: `bottom+=${i * window.innerWidth} bottom`,
          scrub: true,
        },
        xPercent: 100 * -i,
      });
    });
  });
</script>

<template>
  <div class="col-span-12 grid grid-cols-12 bg-black">
    <section
      class="col-start-1 col-span-12 md:col-start-4 md:col-span-6 flex justify-center items-center h-[95vh]"
    >
      <template v-if="story">
        <StoryblokComponent
          v-for="singleStory in story.content.body[0].contents"
          :key="singleStory"
          :blok="singleStory.content"
          class="px-6 md:px-10 py-6 md:h-min-[90%]"
        />
      </template>
    </section>

    <section
      id="vertical-slider"
      class="col-start-1 col-span-12 h-screen relative bg-white pt-6 px-8 overflow-hidden"
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
      <!-- Horizontal scrolling section -->
      <div class="sticky z-40 top-0 md:top-20 left-0 py-2 right-0 pl-[71px]">
        <span id="experience" class="text-3xl">ESPERIENZE</span>
      </div>

      <StoryblokComponent
        v-for="(singleStory, index) in story.content.body[1].contents"
        :key="singleStory"
        :blok="singleStory.content"
        :class="`z-[${index + 1}]`"
      />
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
        id="testl"
        class="w-screen h-full bg-amber-300 flex items-center justify-center shrink-0"
      >
        <div class="bg-black px-8 py-5">
          <h4 class="text-white text-5xl">QUESTO E' UN TEST</h4>
        </div>
      </div>
      <div
        id="testl"
        class="w-screen h-full bg-blue-300 flex items-center justify-center shrink-0"
      >
        <div class="bg-black px-8 py-5">
          <h4 class="text-white text-5xl">QUESTO E' UN TEST</h4>
        </div>
      </div>
      <div
        id="testl"
        class="w-screen h-full bg-red-300 flex items-center justify-center shrink-0"
      >
        <div class="bg-black px-8 py-5">
          <h4 class="text-white text-5xl">QUESTO E' UN TEST</h4>
        </div>
      </div>
      <div
        id="testl"
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

