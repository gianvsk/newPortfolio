export type LinksContainerProps = {
  blok: ContentType & {
    block: Array<
      ContentType & {
        label?: string;
        block: Array<{
          id: string;
          icon: string;
          label: string;
          link: Link;
          ariaLabel?: string;
          hideLabel?: boolean;
        }>;
      }
    >;
  };
};
