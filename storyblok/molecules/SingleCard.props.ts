import type { StoryblokRichTextDocumentNode } from '@storyblok/richtext';

export type SingleCardProps = {
  blok: {
    id: string;
    title: string;
    image: Image;
    richText: StoryblokRichTextDocumentNode;
  };
  position?: 'left' | 'right';
};
