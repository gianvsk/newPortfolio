import type { StoryblokRichTextDocumentNode } from '@storyblok/richtext';

export type VerticalSlideProps = {
  blok: {
    title: string;
    subtitle: string;
    paragraph?: string;
    subparagraph: string;
    image?: any;
    icons?: any[];
    bgColor: string;
    mainRichText?: StoryblokRichTextDocumentNode;
    secondaryRichText?: StoryblokRichTextDocumentNode;
    isSingleImage?: boolean;
    isIconsBlock?: boolean;
  };
};
