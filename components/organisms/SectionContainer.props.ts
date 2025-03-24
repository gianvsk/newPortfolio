export type SectionContainerProps = {
  noPadding?: boolean;
  containerHeader?: SectionContainerHeaderType;
};

export type SectionContainerHeaderType = {
  title: string;
  subtitle: string;
  theme: 'dark' | 'dark-neutral' | 'white';
};
