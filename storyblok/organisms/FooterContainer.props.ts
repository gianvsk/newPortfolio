import type { Link } from '../atoms/AtomsLink.props';

export type FooterProps = {
  blok: ContentType & {
    contents: Array<ContentType & { block: Array<Link>; label: string }>;
  };
};
