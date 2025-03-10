export type TimelineSliderProps = {
  blok: {
    title: string;
    contents: TimelineContent[];
  } & ContentType;
};

type TimelineContent = StoryblokContent & {
  content: {
    component: string;
    title: string;
    subtitle: string;
    description: string;
    _editable: string;
  };
};
