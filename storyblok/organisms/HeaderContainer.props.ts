import type { Link } from '../atoms/AtomsLink.props';

export type HeaderContainerProps = {
  blok: StoryblokContent & {
    links: Array<ContentType & { content: { link: Link } }>;
  };
};
