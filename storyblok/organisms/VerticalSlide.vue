<script setup lang="ts">
  import type { StoryblokRichTextNode } from '@storyblok/vue';
  import type { VerticalSlideProps } from './VerticalSlide.props';
  import Accordion from '../atoms/Accordion.vue';

  const props = defineProps<VerticalSlideProps>();

  const resolvers = {
    [BlockTypes.COMPONENT]: (node: StoryblokRichTextNode<VNode>) => {
      if (node?.attrs?.body) {
        return node.attrs.body.map(i => {
          return h(Accordion, {
            blok: {
              text: i.text,
              subtext: i.subtext,
            },
          });
        });
      } else {
        return null; // or return an empty VNode instance
      }
    },
  };

  const bgColor: Record<string, string> = {
    'neutral-900': 'bg-neutral-900',
    'red-600': 'bg-gray-900',
    'neutral-300': 'bg-neutral-300',
    white: 'bg-white',
  };
</script>

<template>
  <div
    id="vertical-slide"
    class="absolute inset-0 shrink-0 flex flex-col justify-end"
    :class="`${bgColor[props.blok.bgColor]}`"
  >
    <div class="w-full h-[90%] md:h-4/5">
      <div
        class="grid grid-cols-2 grid-rows-2 gap-x-16 gap-y-6 w-full py-10 px-[101.6px] h-full"
      >
        <div
          class="rich-text col-start-1 row-start-1 col-span-1 row-span-1 md:col-span-1 md:row-span-1"
        >
          <StoryblokRichText
            v-if="blok.mainRichText"
            :doc="blok.mainRichText"
            class="col-start-2 row-start-2 col-span-1 row-span-1"
          />
        </div>

        <div
          class="md:col-start-1 md:row-start-2 md:col-span-1 md:row-span-1 flex items-end"
        >
          <span>
            {{ blok.paragraph }}
          </span>
        </div>
        <div
          v-if="blok.secondaryRichText?.content"
          class="col-start-2 row-start-1 col-span-1 row-span-2"
        >
          <StoryblokRichText
            :doc="blok.secondaryRichText"
            :resolvers="resolvers"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .rich-text {
    :deep(h2) {
      font-size: 3rem;
    }
  }
</style>
