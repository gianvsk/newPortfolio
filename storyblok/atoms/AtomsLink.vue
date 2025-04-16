<script setup lang="ts">
  import type { LinkSchema } from './AtomsLink.props';
  const props = defineProps<LinkSchema>();

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
      ? 'text-white text-center md:text-lg font-light backdrop-blur-sm backdrop-opacity-90 backdrop-brightness-150 px-2 py-1 md:px-4 md:py-2 duration-300 hover:shadow-[0_0_0_1px_white] hover:bg-stone-900 xl:hover:scale-110'
      : 'relative z-[10] before:absolute before:z-[11] before:opacity-0 before:inset-0 before:rounded-full before:transition-all before:duration-300'
  );
</script>

<template>
  <NuxtLink
    :to="currentLink ?? '/'"
    :class="[
      currentClass,
      { 'flex gap-2 justify-between items-center': blok.label && blok.icon },
    ]"
    :aria-label="blok.ariaLabel ?? blok.label"
  >
    <span
      v-if="!blok.hideLabel"
      class="text-sm md:text-md xl:text-lg 3xl:text-2xl touch"
    >
      {{ blok.label }}
    </span>

    <component
      :is="formatIconName"
      v-if="blok.icon"
      class="h-6 w-6 md:w-7 md:h-7 3xl:w-10 xl:h-10"
      :font-controlled="false"
      filled
      :aria-hidden="blok.hideLabel && true"
    />
  </NuxtLink>
</template>

<style scoped lang="scss">
  .box-shadow-sm {
    &:before {
      box-shadow:
        0 0 3px rgba(255, 255, 255, 1),
        0 0 5px white;
    }
  }
</style>
