import type { StoryblokRichTextDocumentNode } from '@storyblok/richtext';

export type VerticalSlideProps = {
  blok: {
    title: string;
    subtitle: string;
    paragraph?: string;
    subparagraph: string;
    image?: Image;
    icons?: any[];
    textColor: string;
    bgColor: string;
    mainRichText?: StoryblokRichTextDocumentNode;
    secondaryRichText?: StoryblokRichTextDocumentNode;
    isSingleImage?: boolean;
    isIconsBlock?: boolean;
    isReverseColumns?: boolean;
    isResolverActive?: boolean;
    isFirstBlockHidden?: boolean;
    isSecondBlockHidden?: boolean;
  };
};
