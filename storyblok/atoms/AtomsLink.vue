<script setup lang="ts">
  import type { LinkSchema } from './AtomsLink.props';
  const props = defineProps<LinkSchema>();

  console.log('props', props);

  const formatIconName = computed(
    () =>
      `Icons${props.blok.icon.at(0)?.toUpperCase() + props.blok.icon.slice(1)}`
  );

  const currentLink = computed(() =>
    props.blok.link.linktype === 'email'
      ? `mailto:${props.blok.link.url}`
      : props.blok.link.url
  );

  const currentClass = computed(() =>
    props.blok.isBlur
      ? 'text-white text-center md:text-lg font-light backdrop-blur-sm backdrop-opacity-90 backdrop-brightness-150 px-2 py-1 md:px-5 md:py-3 duration-300 hover:shadow-[0_0_0_1px_white] hover:bg-stone-900 hover:scale-110'
      : 'relative box-shadow-sm z-[10] before:absolute before:-z-[1] before:opacity-0 before:inset-0 hover:before:scale-125 before:bg-black before:rounded-full hover:before:opacity-100 before:transition-all before:duration-300'
  );
</script>

<template>
  <NuxtLink
    :to="currentLink ?? '/'"
    :class="[
      currentClass,
      { 'flex gap-2 justify-between': blok.label && blok.icon },
    ]"
    :aria-label="blok.ariaLabel ?? blok.label"
  >
    <span v-if="!blok.hideLabel" class="text-p">{{ blok.label }}</span>

    <component
      :is="formatIconName"
      v-if="blok.icon"
      class="h-8 w-8"
      :font-controlled="false"
      filled
      :aria-hidden="blok.hideLabel && true"
    />
  </NuxtLink>
</template>

<style lang="scss" scoped>
  .box-shadow-sm {
    &:before {
      box-shadow:
        0 0 3px rgba(255, 255, 255, 1),
        0 0 5px white;
    }
  }
</style>
