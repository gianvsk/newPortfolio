export type TimelineSlideListProps = {
  theme: 'dark' | 'dark-neutral' | 'white';
  contents: TimelineContentType[];
};

export type TimelineContentType = StoryblokContent & {
  content: {
    component: string;
    title: string;
    subtitle: string;
    description: string;
    _editable: string;
  };
};
