<script setup lang="ts">
  import type { StoryblokRichTextNode } from '@storyblok/vue';
  import type { VerticalSlideProps } from './VerticalSlide.props';

  const props = defineProps<VerticalSlideProps>();

  const headingStyle = {
    h3: 'text-lg md:text-2xl font-bold font-mont mb-4',
    h4: 'text-md md:text-lg font-bold font-mont mb-4',
  };

  const setListResolver = (node: StoryblokRichTextNode<VNode>) => {
    const content = node.content;

    const listItems = content?.map((item: StoryblokRichTextNode<VNode>) => {
      const itemContent = item.content || [];

      const paragraphs = itemContent?.map(
        (el: StoryblokRichTextNode<VNode>) => {
          const innerHTML = el.content?.map(paragraph => {
            return paragraph?.marks
              ? {
                  tag: 'span',
                  innerHTML: paragraph.text,
                  class: 'text-sm font-bold mr-1 min-w-[100px]',
                }
              : {
                  tag: 'span',
                  innerHTML: paragraph.text,
                  class: 'text-sm',
                };
          });

          return h('p', { class: 'inline-flex' }, [
            innerHTML?.map(paragraph =>
              h(paragraph.tag, { ...paragraph, tag: '' })
            ),
          ]);
        }
      );

      return h('li', paragraphs);
    });

    return h(
      'ul',
      { class: 'pl-5 list-disc flex flex-col gap-4 mb-8' },
      listItems
    );
  };

  const paragraphOnlyResolver = {
    [BlockTypes.PARAGRAPH]: (node: StoryblokRichTextNode<VNode>) => {
      return h('p', { class: 'mb-4 text-sm' }, [
        node.content?.map(paragraph =>
          h(
            'span',
            { class: paragraph?.marks ? 'font-bold' : '' },
            paragraph.text
          )
        ),
      ]);
    },
    [BlockTypes.HEADING]: (node: StoryblokRichTextNode<VNode>) => {
      const currentHeadingClass = `h${node.attrs?.level.toString()}`;

      return h(
        `h${node.attrs?.level}`,
        {
          class: headingStyle[currentHeadingClass as keyof typeof headingStyle],
        },
        node.content?.[0]?.text || ''
      );
    },
  };

  const resolver = {
    [BlockTypes.UL_LIST]: (node: StoryblokRichTextNode<VNode>) => {
      return setListResolver(node);
    },
    [BlockTypes.HEADING]: (node: StoryblokRichTextNode<VNode>) => {
      const currentHeadingClass = `h${node.attrs?.level.toString()}`;

      return h(
        `h${node.attrs?.level}`,
        {
          class: headingStyle[currentHeadingClass as keyof typeof headingStyle],
        },
        node.content?.[0]?.text || ''
      );
    },
  };

  const bgColor: Record<string, string> = {
    'neutral-900': 'bg-neutral-900',
    white: 'bg-white',
  };

  const dataColor = computed(() =>
    props.blok.bgColor === 'white' ? '#242424' : '#FFF'
  );

  const currentResolver = computed(() =>
    props.blok.isResolverActive ? resolver : paragraphOnlyResolver
  );
</script>

<template>
  <div
    id="vertical-slide"
    v-editable="blok"
    class="shrink-0 flex flex-col justify-end"
    :class="`${bgColor[props.blok.bgColor]}`"
    :data-color="dataColor"
  >
    <div class="w-full h-[95%] md:h-[85%]">
      <div
        class="flex flex-col gap-4 md:grid md:grid-cols-2 md:grid-rows-2 gap-x-10 md:gap-y-6 w-full md:py-10 px-6 md:px-[101.6px] h-full overflow-hidden"
      >
        <div
          class="rich-text md:row-start-1 md:col-span-1 md:row-span-1"
          :class="[blok.isReverseColumns ? 'md:col-start-2' : 'md:col-start-1']"
        >
          <StoryblokRichText
            v-if="blok.mainRichText"
            :doc="blok.mainRichText"
            :resolvers="currentResolver"
            class="col-span-1 row-span-1"
            :class="[
              blok.isReverseColumns
                ? 'col-start-1 md:row-start-1'
                : 'col-start-2 md:row-start-2',
            ]"
          />
        </div>
        <div
          class="md:row-start-1 md:col-span-1 md:row-span-2"
          :class="[blok.isReverseColumns ? 'md:col-start-1' : 'md:col-start-2']"
        >
          <!-- add :resolvers="resolvers" if need to, it was made to render Storyblok Accordions in this case -->
          <StoryblokRichText
            v-if="
              blok.secondaryRichText?.content &&
              !blok?.isSingleImage &&
              !blok?.isIconsBlock
            "
            :doc="blok.secondaryRichText"
            :resolvers="currentResolver"
            class="rich-text"
          />
          <NuxtImg
            v-else-if="blok?.isSingleImage && blok?.image"
            :src="blok.image?.filename"
            class="w-50% h-full object-cover"
            provider="storyblok"
          />
          <StoryblokComponent
            v-else-if="blok.isIconsBlock && blok.icons"
            :blok="blok.icons?.[0]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
