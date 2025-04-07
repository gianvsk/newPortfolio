<script setup lang="ts">
  import type { IconsBlockProps } from './AssetsContainer.props';

  defineProps<IconsBlockProps>();

  const { $gsap } = useNuxtApp();

  const animation = $gsap.timeline();

  onMounted(() => {
    animation.from('#iconText', {
      opacity: 0,
      y: -40,
      duration: 0.5,
      ease: 'power1.out',
    });
  });

  const setIconText = (asset: string) => {
    $gsap.set('#iconText', { text: asset });

    animation.restart();
  };
</script>

<template>
  <div class="flex flex-col gap-5 h-full">
    <span class="text-xl font-mont font-semibold">
      {{ blok.frontendText }}
    </span>
    <div class="h-7 flex justify-center mb-4">
      <span
        id="iconText"
        class="text-lg xl:text-2xl 2xl:text-3xl font-mont font-semibold uppercase"
      />
    </div>
    <div class="p-5 flex gap-4 xl:gap-10 flex-wrap">
      <div
        v-for="asset in blok.frontendIcons"
        :key="asset"
        class="relative"
        @mouseenter="() => setIconText(asset)"
        @mouseleave="() => setIconText('')"
      >
        <div
          class="p-2 w-10 h-10 xl:p-3 xl:w-16 xl:h-16 3xl:w-20 3xl:h-20 shadow-lg rounded-full z-50 bg-white hover:bg-black hover:scale-150 relative duration-500 before:duration-1000 before:absolute before:inset-0 hover:before:bg-white hover:before:scale-[0.95] before:rounded-full before:z-[-1]"
        >
          <component
            :is="`Icons${asset}`"
            class="w-full h-full relative"
            :font-controlled="false"
            filled
          />
        </div>
      </div>
    </div>
    <span class="text-xl font-mont font-semibold">
      {{ blok.servicesText }}
    </span>
    <div class="p-5 flex gap-4 xl:gap-10 flex-wrap">
      <div
        v-for="asset in blok.servicesIcons"
        :key="asset"
        class="p-2 w-10 h-10 xl:p-3 xl:w-16 xl:h-16 3xl:w-20 3xl:h-20 shadow-lg rounded-full z-50 bg-white hover:bg-black hover:scale-150 relative duration-500 before:duration-1000 before:absolute before:inset-0 hover:before:bg-white hover:before:scale-[0.95] before:rounded-full before:z-[-1]"
        @mouseenter="() => setIconText(asset)"
        @mouseleave="() => setIconText('')"
      >
        <component
          :is="`Icons${asset}`"
          class="w-full h-full relative"
          :font-controlled="false"
          filled
        />
      </div>
    </div>
  </div>
</template>
