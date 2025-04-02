<script setup lang="ts">
  const { $gsap } = useNuxtApp();

  onMounted(() => {
    const sphereTl = $gsap.timeline();

    sphereTl.to('#vertical-slider', {
      scrollTrigger: {
        trigger: '#vertical-slider',
        start: 'top top',
        end: `bottom+=${window.innerHeight * 0.5} bottom`,
        scrub: true,
        pin: true,
      },
    });

    sphereTl.to('#sphere-container', {
      scrollTrigger: {
        trigger: '#vertical-slider',
        start: 'top top',
        end: `bottom+=${window.innerHeight * 0.5} bottom`,
        scrub: true,
      },
      scale: 0.5,
      onReverse: () => {
        $gsap.set('#sphere-container', { opacity: 1, scale: 1, zIndex: 1 });
      },
      onComplete: () => {
        $gsap.set('#sphere-container', { scale: 0, zIndex: -10 });
      },
    });

    sphereTl.to('#sphere', {
      scrollTrigger: {
        trigger: '#sphere-container',
        start: 'top top',
        end: `bottom+=${window.innerHeight * 0.5} bottom`,
        scrub: true,
      },
      scale: 50,
      ease: 'power1.in',
      onReverse: () => {
        $gsap.set('#sphere', { opacity: 1, scale: 1, zIndex: 1 });
      },
      onComplete: () => {
        $gsap.set('#sphere', { scale: 0, zIndex: -10 });
      },
    });
  });
</script>

<template>
  <section
    class="col-start-1 col-span-12 h-screen relative bg-white pt-6 px-4 md:px-8"
  >
    <div
      id="sphere-container"
      class="absolute inset-0 flex w-full justify-center items-center z-50 bg-stone-950 overflow-hidden"
    >
      <div
        id="sphere"
        class="h-10 w-10 border border-transparent rounded-full bg-white"
      />
    </div>
  </section>
</template>
