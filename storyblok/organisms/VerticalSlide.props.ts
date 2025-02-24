import type { StoryblokRichTextDocumentNode } from '@storyblok/richtext';

export type VerticalSlideProps = {
  blok: {
    title: string;
    subtitle: string;
    paragraph?: string;
    subparagraph: string;
    images?: any[];
    icons?: string[];
    bgColor: string;
    mainRichText?: StoryblokRichTextDocumentNode;
    secondaryRichText?: StoryblokRichTextDocumentNode;
    isSingleImage?: boolean;
    isIconsBlock?: boolean;
  };
};
