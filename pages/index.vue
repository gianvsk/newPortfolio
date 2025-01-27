<script setup lang="ts">
  const story = await useStoryblok('home', { version: 'draft' });
  console.log({ story });

  const contents = computed(() => ({ bloks: story.value?.content.body }));
</script>

<template>
  <div class="col-span-12 grid grid-cols-12">
    <ViewPart
      v-if="story"
      v-bind="contents"
      class="col-start-4 col-span-6 px-10 py-6 bg-emerald-400 h-min mt-[56px]"
    />
  </div>
</template>

