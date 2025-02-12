<script setup lang="ts">
  const { slug } = useRoute().params;

  const story = await useAsyncStoryblok(
    /* slug && !(Array.isArray(slug)) ? slug : 'home' */
    'new-test',
    { version: 'draft' }
  );
</script>

<template>
  <div>
    <div v-if="story.content.body" class="text-red-500">This is a testttt</div>
    <StoryblokComponent
      v-for="singleStory in story.content.body"
      :key="singleStory"
      :blok="singleStory"
    />
    <h1>This is a test of the page</h1>
  </div>
</template>

