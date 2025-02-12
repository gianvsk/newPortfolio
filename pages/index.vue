<script setup lang="ts">
  const story = await useAsyncStoryblok('homepage', {
    version: 'draft',
    resolve_relations: ['hero.contents', 'vertical-container.contents'],
  });

  console.log({ story });

  const { $gsap } = useNuxtApp();

  onMounted(() => {
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

    // Generalized scroll animation for #testp elements
    const verticalSliderTl = $gsap.timeline();
    const verticalSlideElements = $gsap.utils.toArray('#testp');

    verticalSlideElements.forEach((el, i) => {
      verticalSliderTl.from(el as Element, {
        scrollTrigger: {
          trigger: el as Element,
          start: `top+=${window.innerHeight * (i * 2)} bottom`,
          end: `top+=${window.innerHeight * (i * 2 + 2)} bottom`,
          scrub: true,
        },
        yPercent: 100,
      });
    });

    verticalSlideElements.forEach((el, i, arr) => {
      $gsap.from('#experience', { opacity: 0 });
      $gsap.to('#experience', {
        scrollTrigger: {
          trigger: el as Element,
          start: `top+=${i > 0 ? window.innerHeight * (i * 2.1) : window.innerHeight * i} 20%`,
          end: `bottom+=${i > 0 ? window.innerHeight * (i * 2 + 1) : window.innerHeight * (i + 1)} bottom`,
          scrub: true,
          markers: true,
        },
        color: $gsap.getProperty(
          (arr as Array<Element>)[arr.length - 1 - i].firstElementChild,
          'background-color'
        ),
        opacity: 1,
      });
    });

    // Horizontal scroll and animation for #testl sections
    const horizontalSliderTl = $gsap.timeline();
    const horizontalSlideElements = $gsap.utils.toArray('#testl');

    horizontalSliderTl.to('#testk', {
      scrollTrigger: {
        trigger: '#testk',
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
          markers: true,
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
        <!--         <StoryblokComponent
          v-for="(singleStory, index) in story.content.body"
          :key="singleStory"
          :blok="singleStory.contents[index].content"
          class="px-6 md:px-10 py-6 md:h-min-[90%]"
        /> -->
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
      <div class="sticky z-40 top-0 md:top-20 left-0 py-2 right-0">
        <span id="experience" class="text-3xl">ESPERIENZE</span>
      </div>
      <div id="testp" class="absolute inset-0 shrink-0">
        <div class="bg-white w-full h-full px-8 py-5 flex flex-col justify-end">
          <div class="h-[80%] flex flex-col justify-between">
            <span class="text-black shrink-0">Questa è una prova</span>
            <span class="text-black shrink-0">Questa un'altra</span>
          </div>
        </div>
      </div>
      <div id="testp" class="absolute inset-0 shrink-0">
        <div
          class="bg-gray-300 w-full h-full px-8 py-5 flex flex-col justify-end"
        >
          <div class="h-[80%] flex flex-col justify-between">
            <span class="text-black shrink-0">Questa è una prova</span>
            <span class="text-black shrink-0">Questa un'altra</span>
          </div>
        </div>
      </div>
      <div id="testp" class="absolute inset-0 shrink-0">
        <div
          class="bg-neutral-700 w-full h-full px-8 py-5 flex flex-col justify-end"
        >
          <div class="h-[80%] flex flex-col justify-between">
            <span class="text-white shrink-0">Questa è una prova</span>
            <span class="text-white shrink-0">Questa un'altra</span>
          </div>
        </div>
      </div>
      <div id="testp" class="absolute inset-0 shrink-0">
        <div
          class="bg-neutral-900 w-full h-full px-8 py-5 flex flex-col justify-end"
        >
          <div class="h-[80%] flex flex-col justify-between">
            <span class="text-white shrink-0">Questa è una prova</span>
            <span class="text-white shrink-0">Questa un'altra</span>
          </div>
        </div>
      </div>
    </section>
    <section
      class="col-start-1 col-span-12 bg-black h-screen flex items-center"
    >
      <div class="text-5xl text-white">CIAO</div>
    </section>
    <section
      id="testk"
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

