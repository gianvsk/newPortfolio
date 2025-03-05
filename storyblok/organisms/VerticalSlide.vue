<script setup lang="ts">
  import type { StoryblokRichTextNode } from '@storyblok/vue';
  import type { VerticalSlideProps } from './VerticalSlide.props';

  const props = defineProps<VerticalSlideProps>();

  const headingStyle = {
    h3: 'text-lg lg:text-xl xl:text-2xl 3xl:text-4xl font-bold font-mont mb-3 xl:mb-4 2xl:mb-8',
    h4: 'text-md lg:text-lg xl:text-xl 3xl:text-2xl font-bold font-mont mb-3 xl:mb-4 2xl:mb-8',
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
                  class: 'font-bold mr-1 min-w-[80px] lg:min-w-[80px]',
                }
              : {
                  tag: 'span',
                  innerHTML: paragraph.text,
                };
          });

          return h(
            'p',
            {
              class: 'inline-flex text-xs md:text-sm lg:text-md 3xl:text-xl',
            },
            [
              innerHTML?.map(paragraph =>
                h(paragraph.tag, { ...paragraph, tag: '' })
              ),
            ]
          );
        }
      );

      return h('li', paragraphs);
    });

    return h(
      'ul',
      {
        class:
          'pl-5 list-disc flex flex-col gap-2 xl:gap-4 2xl:gap-6 mb-4 xl:mb-6 3xl:mb-12',
      },
      listItems
    );
  };

  const paragraphOnlyResolver = {
    [BlockTypes.PARAGRAPH]: (node: StoryblokRichTextNode<VNode>) => {
      return h(
        'p',
        {
          class:
            'mb-2 xl:mb-4 2xl:mb-10 text-xs md:text-sm lg:text-md 3xl:text-xl',
        },
        [
          node.content?.map(paragraph =>
            h(
              'span',
              { class: paragraph?.marks ? 'font-bold' : '' },
              paragraph.text
            )
          ),
        ]
      );
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
    [BlockTypes.PARAGRAPH]: (node: StoryblokRichTextNode<VNode>) => {
      return h('p', { class: 'text-xs md:text-sm lg:text-md 3xl:text-xl' }, [
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
    class="flex flex-col justify-end py-5 md:py-0"
    :class="`${bgColor[props.blok.bgColor]}`"
    :data-color="dataColor"
  >
    <div
      class="w-full h-[80dvh] md:h-[82.5%] lg:h-[85%] 2xl:h-4/5 overflow-scroll md:overflow-hidden"
    >
      <div
        class="gap-4 px-6 w-full h-full md:flex md:px-5 md:gap-6 md:gap-y-6 lg:gap-x-10 md:pb-6 lg:px-10 xl:px-[101.6px]"
        :class="{ 'flex-row-reverse': blok.isReverseColumns }"
      >
        <!-- Over 768px resolution, gsap will apply text color on the children elements, not the class -->
        <div class="md:flex-1">
          <StoryblokRichText
            v-if="blok.mainRichText"
            :doc="blok.mainRichText"
            :resolvers="currentResolver"
          />
        </div>
        <!-- Over 768px resolution, gsap will apply text color on the children elements, not the class -->
        <div class="md:flex-1">
          <!-- add :resolvers="resolvers" if need to, it was made to render Storyblok Accordions in this case -->
          <StoryblokRichText
            v-if="
              blok.secondaryRichText?.content &&
              !blok?.isSingleImage &&
              !blok?.isIconsBlock
            "
            :doc="blok.secondaryRichText"
            :resolvers="currentResolver"
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
