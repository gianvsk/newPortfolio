<script setup lang="ts">
  import type { LinkSchema } from './AtomsLink.props';
  defineProps<LinkSchema>();
</script>

<template>
  <NuxtLink :to="blok.link.url">
    {{ blok.label }}
  </NuxtLink>
</template>
