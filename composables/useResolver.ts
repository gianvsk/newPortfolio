import type { StoryblokRichTextNode } from '@storyblok/vue';
export const useResolver = () => {
  const getListResolver = (node: StoryblokRichTextNode<VNode>) => {
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
                  class:
                    'font-bold mr-1 min-w-[70px] md:min-w-[120px] md:portrait:min-w-[140px]',
                }
              : {
                  tag: 'span',
                  innerHTML: paragraph.text,
                };
          });

          return h(
            'p',
            {
              class:
                'inline-flex text-xs md:text-sm md:portrait:text-lg lg:text-md xl:text-lg 3xl:text-xl',
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

  const getParagraphOnlyResolver = (headingStyle: Record<string, string>) => {
    return {
      [BlockTypes.PARAGRAPH]: (node: StoryblokRichTextNode<VNode>) => {
        return h(
          'p',
          {
            class:
              'mb-2 md:portrait:mb-6 xl:mb-4 2xl:mb-10 text-xs md:text-sm md:portrait:text-lg lg:text-md xl:text-lg 3xl:text-xl',
          },
          [
            node.content?.map(paragraph =>
              h(
                'span',
                {
                  class: paragraph?.marks ? 'font-bold' : '',
                },
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
            class:
              headingStyle[currentHeadingClass as keyof typeof headingStyle],
          },
          node.content?.[0]?.text || ''
        );
      },
    };
  };

  const getDefaultResolver = (headingStyle: Record<string, string>) => {
    return {
      [BlockTypes.UL_LIST]: (node: StoryblokRichTextNode<VNode>) => {
        return getListResolver(node);
      },
      [BlockTypes.PARAGRAPH]: (node: StoryblokRichTextNode<VNode>) => {
        return h(
          'p',
          {
            class:
              'text-xs md:text-sm md:portrait:text-lg lg:text-md xl:text-lg 3xl:text-xl',
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
            class:
              headingStyle[currentHeadingClass as keyof typeof headingStyle],
          },
          node.content?.[0]?.text || ''
        );
      },
    };
  };

  return { getDefaultResolver, getParagraphOnlyResolver };
};
