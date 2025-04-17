<script setup lang="ts">
  import type { FooterProps } from './FooterContainer.props';

  defineProps<FooterProps>();
</script>

<template>
  <footer
    id="contacts"
    class="py-10 px-4 mt-12 pb-12 text-stone-900 bg-white flex flex-col items-center xl:justify-center xl:h-[75vh] xl:mt-[10%]"
  >
    <div class="w-full flex flex-col xl:flex-row gap-8">
      <div
        v-for="blok in blok.contents"
        :key="blok.id"
        class="flex-1 flex flex-col items-center gap-2 md:gap-4 xl:gap-6"
      >
        <span class="font-mont text-lg md:text-xl xl:text-2xl 3xl:text-3xl">
          {{ blok?.label }}
        </span>
        <ul class="flex flex-col items-center gap-4 md:gap-2 xl:gap-4">
          <li
            v-for="link in blok.block"
            :key="link.id"
            class="w-full text-center px-2 py-1 shadow-[0_0_0_1px_black] hover:bg-neutral-900 hover:text-white"
          >
            <StoryblokComponent :blok="link" />
          </li>
        </ul>
      </div>
    </div>
    <span
      class="font-mt text-center mt-10 xl:mt-12 text-stone-900 text-md md:text-lg xl:text-xl 3xl:text-2xl"
    >
      &copy; {{ 2025 }} Gianvito Scandurra. Tutti i diritti riservati.
    </span>
  </footer>
</template>
