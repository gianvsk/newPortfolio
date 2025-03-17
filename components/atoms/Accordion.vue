<script setup lang="ts">
  import type { AccordionProps } from './Accordion.props';

  defineProps<AccordionProps>();

  const open = ref(false);

  const toggleAccordion = () => {
    open.value = !open.value;
  };
</script>

<template>
  <div class="w-full h-full relative">
    <div
      class="w-full flex justify-between px-5 shadow-zinc-900"
      :class="[size === 'sm' ? 'pb-2' : 'py-4']"
    >
      <span>{{ text }}</span>
      <button
        class="md:hidden w-6 h-6 duration-300 transition-all shrink-0"
        :class="{
          '-rotate-180': open,
        }"
        @click="toggleAccordion"
      >
        <IconsArrowDown class="w-full h-full" :font-controlled="false" />
      </button>
    </div>
    <Transition name="accordion">
      <div
        v-if="open"
        class="absolute top-[calc(100%+1px)] h-auto right-0 w-full border-t border-white px-5"
        :class="[size === 'sm' ? 'pt-2' : 'py-4']"
      >
        <span>{{ subtext }}</span>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
  .accordion-enter-active,
  .accordion-leave-active {
    transition:
      max-height 0.3s ease,
      opacity 0.3s ease;
    max-height: 150px;
  }

  .accordion-enter-from,
  .accordion-leave-to {
    max-height: 0;
    opacity: 0;
  }
</style>
