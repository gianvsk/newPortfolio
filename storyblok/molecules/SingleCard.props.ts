import type { StoryblokRichTextDocumentNode } from '@storyblok/richtext';

export type SingleCardProps = {
  blok: {
    id: string;
    _uid: string;
    title: string;
    subtitle?: string;
    text?: string;
    image: Image;
    richText: StoryblokRichTextDocumentNode;
  };
};
