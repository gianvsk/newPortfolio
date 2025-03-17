<script setup lang="ts">
  import type { SingleCardProps } from './SingleCard.props';

  defineProps<SingleCardProps>();
</script>

<template>
  <ClientOnly>
    <LazyMouseShow
      v-slot="{ state, createChild, setChildPosition, removeChild }"
      :position="position"
    >
      <div
        class="relative h-full p-8 shadow-md"
        @mouseenter="createChild"
        @mousemove="event => setChildPosition(event, blok.id)"
        @mouseleave="removeChild"
      >
        <div class="flex flex-col gap-8 h-full">
          <h3 class="text-2xl font-mont uppercase font-semibold">
            {{ blok.title }}
          </h3>
          <NuxtImg
            :src="blok.image.filename"
            :alt="blok.image.alt"
            loading="lazy"
          />
        </div>
        <div
          :id="blok.id"
          class="absolute w-[500px] aspect-video bg-white z-50 flex p-8"
          :class="{ hidden: !state }"
        >
          <StoryblokRichText :doc="blok.richText" />
        </div>
      </div>
    </LazyMouseShow>
  </ClientOnly>
</template>
