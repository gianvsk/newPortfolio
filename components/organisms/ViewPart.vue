<script setup lang="ts">
  const props = defineProps<{
    bloks: Array<Record<string, object>>;
  }>();

  watch(props.bloks!, () => console.log('bloks', props.bloks));
</script>

<template>
  <div v-if="bloks" v-editable="bloks">
    <h1 class="font-mont font-bold text-6xl">Ciao test</h1>
    <StoryblokComponent
      v-for="(story, index) in bloks"
      :key="index"
      :blok="story"
    />
  </div>
</template>
