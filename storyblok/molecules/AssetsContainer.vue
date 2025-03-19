<script setup lang="ts">
  import type { IconsBlockProps } from './AssetsContainer.props';

  defineProps<IconsBlockProps>();

  const { $gsap } = useNuxtApp();

  const animation = $gsap.timeline();

  onMounted(() => {
    animation.from('#iconText', {
      opacity: 0,
      x: -40,
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
    <div class="h-7 flex justify-center">
      <span id="iconText" class="text-lg font-mont font-semibold uppercase" />
    </div>
    <div class="p-5 flex gap-4 xl:gap-10 flex-wrap">
      <div
        v-for="asset in blok.frontendIcons"
        :key="asset"
        class="relative group"
        @mouseenter="() => setIconText(asset)"
        @mouseleave="() => setIconText('')"
      >
        <div
          class="p-2 w-10 h-10 xl:p-3 xl:h-16 xl:w-16 relative shadow-lg rounded-full duration-300 group-hover:scale-125"
        >
          <component
            :is="`Icons${asset}`"
            class="w-full h-full relative z-[10]"
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
        class="p-2 w-10 h-10 xl:p-3 xl:w-16 xl:h-16 shadow-lg rounded-full relative group hover:scale-125"
        @mouseenter="() => setIconText(asset)"
        @mouseleave="() => setIconText('')"
      >
        <component
          :is="`Icons${asset}`"
          class="w-full h-full relative z-[10]"
          :font-controlled="false"
          filled
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .nuxt-icon {
  }
</style>
