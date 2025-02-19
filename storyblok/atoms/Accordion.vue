<script setup lang="ts">
  import type { AccordionProps } from './Accordion.props';

  defineProps<AccordionProps>();

  const open = ref(false);

  const toggleAccordion = () => {
    open.value = !open.value;
  };
</script>

<template>
  <div class="w-full relative">
    <button
      class="w-full flex justify-between cursor-pointer py-4 px-5 bg-white shadow-zinc-900 border-neutral-900"
      @click="toggleAccordion"
    >
      <span>{{ blok.text }}</span>
    </button>
    <Transition name="accordion">
      <div v-if="open" class="relative top-full h-auto right-0 w-full">
        <div class="px-5 py-4">
          <span>{{ blok.subtext }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
  .accordion-enter-active,
  .accordion-leave-active {
    transition:
      max-height 1s ease,
      opacity 1s ease;
    max-height: 150px;
  }

  .accordion-enter-from,
  .accordion-leave-to {
    max-height: 0;
    opacity: 0;
  }
</style>
