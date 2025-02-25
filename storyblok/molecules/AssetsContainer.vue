<script setup lang="ts">
  import type { IconsBlockProps } from './AssetsContainer.props';

  defineProps<IconsBlockProps>();
</script>

<template>
  <div class="flex flex-col gap-5 h-full">
    <span class="text-center text-xl font-mont font-semibold">
      {{ blok.frontendText }}
    </span>
    <div class="p-5 flex gap-4 flex-wrap">
      <div
        v-for="asset in blok.frontendIcons"
        :key="asset"
        class="relative group"
      >
        <button
          class="p-3 relative shadow-lg rounded-full duration-300 group-hover:scale-125"
        >
          <component
            :is="`Icons${asset}`"
            class="h-8 w-8 relative z-[10]"
            :font-controlled="false"
            filled
          />
        </button>
        <div
          class="absolute top-0 min-w-full w-max h-8 flex justify-center rounded-sm items-center bg-neutral-900 transition-all duration-200 group-hover:-translate-y-10 p-2 opacity-0 group-hover:opacity-100 group-hover:shadow-lg group-hover:z-[15] z-[9]"
        >
          <span class="text-white font-medium text-sm">{{ asset }}</span>
        </div>
      </div>
    </div>
    <span class="text-center text-xl font-mont font-semibold">
      {{ blok.servicesText }}
    </span>
    <div class="p-5 flex gap-4 flex-wrap">
      <button
        v-for="asset in blok.servicesIcons"
        :key="asset"
        class="p-3 shadow-lg rounded-full relative group hover:scale-125"
      >
        <div
          class="absolute inset-0 transition-transform group-hover:-translate-y-10 p-2 opacity-0 group-hover:opacity-100 group-hover:z-[15] z-[9]"
        >
          <span>{{ asset }}</span>
        </div>
        <component
          :is="`Icons${asset}`"
          class="h-8 w-8 relative z-[10]"
          :font-controlled="false"
          filled
        />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .nuxt-icon {
  }
</style>
