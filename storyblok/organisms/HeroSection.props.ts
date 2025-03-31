export type HeroSectionProps = {
  blok: ContentType & {
    block: Array<
      ContentType & {
        block: Array<
          ContentType & {
            icon: string;
            link: Link;
            label: string;
            ariaLabel?: string;
            hideLabel?: boolean;
          }
        >;
      }
    >;
    contents: Array<
      ContentType & {
        block: Array<
          ContentType & {
            content: {
              label: string;
              ariaLabel: string;
              link: Link;
              hideLabel?: boolean;
              isBlur?: boolean;
              icon?: string;
            };
          }
        >;
      }
    >;
    card: Array<
      ContentType & {
        content: {
          id: string;
          title: string;
          subtitle: string;
          description: string;
          image: Image;
        };
      }
    >;
  };
};
