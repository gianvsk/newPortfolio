export type SectionContainerProps = {
  noPadding?: boolean;
  isJustifyStart?: boolean;
  containerHeader?: SectionContainerHeaderType;
};

export type SectionContainerHeaderType = {
  title: string;
  subtitle: string;
  theme: 'dark' | 'dark-neutral' | 'white';
};
