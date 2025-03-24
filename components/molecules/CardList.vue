<script setup lang="ts">
  import type { CardListProps } from './CardList.props';

  defineProps<CardListProps>();
</script>

<template>
  <ul class="grid grid-cols-12 gap-y-5 md:gap-y-16">
    <ClientOnly>
      <li
        v-for="blok in contents"
        :key="blok?.content.id"
        class="col-span-12 lg:col-start-1 lg:col-span-6"
      >
        <StoryblokComponent v-if="blok" :blok="blok.content" />
      </li>
    </ClientOnly>
  </ul>
</template>
