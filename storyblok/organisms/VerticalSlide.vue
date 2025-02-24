<script setup lang="ts">
  import type { StoryblokRichTextNode } from '@storyblok/vue';
  import type { VerticalSlideProps } from './VerticalSlide.props';
  /*   import Accordion from '../atoms/Accordion.vue'; */

  const props = defineProps<VerticalSlideProps>();

  const resolver = {
    [BlockTypes.UL_LIST]: (node: StoryblokRichTextNode<VNode>) => {
      const content = node?.content || [];

      const listItems = content.map((item: StoryblokRichTextNode<VNode>) => {
        const itemContent = item?.content || [];

        const paragraphs = itemContent.map(
          (el: StoryblokRichTextNode<VNode>) => {
            const innerHTML =
              el?.content?.reduce((acc, paragraph) => {
                if (paragraph?.text) {
                  acc += paragraph.text;
                }
                return acc;
              }, '') || '';

            return h('p', { innerHTML, class: 'text-sm' });
          }
        );

        return h('li', paragraphs);
      });

      return h(
        'ul',
        { class: 'pl-5 list-disc flex flex-col gap-4' },
        listItems
      );
    },
  };

  const bgColor: Record<string, string> = {
    'neutral-900': 'bg-neutral-900',
    'red-600': 'bg-gray-900',
    'neutral-200': 'bg-neutral-200',
    white: 'bg-white',
  };
</script>

<template>
  <div
    id="vertical-slide"
    class="shrink-0 flex flex-col justify-end"
    :class="`${bgColor[props.blok.bgColor]}`"
  >
    <div class="w-full h-[90%] md:h-4/5">
      <div
        class="flex flex-col gap-4 md:grid md:grid-cols-2 md:grid-rows-2 gap-x-10 md:gap-y-6 w-full md:py-10 px-6 md:px-[101.6px] h-full"
      >
        <div
          class="rich-text md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-1"
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
        <div class="md:col-start-2 md:row-start-1 md:col-span-1 md:row-span-2">
          <!-- add :resolvers="resolvers" if need to, it was made to render Storyblok Accordions in this case -->
          <StoryblokRichText
            v-if="
              blok.secondaryRichText?.content &&
              !blok?.isSingleImage &&
              !blok?.isIconsBlock
            "
            :doc="blok.secondaryRichText"
            :resolvers="resolver"
            class="rich-text"
          />
          <NuxtImg
            v-else-if="blok?.isSingleImage && blok.images"
            :src="blok.images[0]?.filename"
            class="w-50% h-full object-cover"
            provider="storyblok"
          />
          <div v-else-if="blok.isIconsBlock && blok.icons">
            <pre>CIao{{ blok.icons }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
