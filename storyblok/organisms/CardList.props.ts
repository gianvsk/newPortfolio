import type { StoryblokRichTextDocumentNode } from '@storyblok/vue';

export type CardListProps = {
  contents: SingleCardContentType[];
};

export type SingleCardContentType = StoryblokContent & {
  content: {
    id: string;
    _uid: string;
    title: string;
    richText: StoryblokRichTextDocumentNode;
    text: string;
    image: Image;
  };
};
