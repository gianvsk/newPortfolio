export type LinkSchema = {
  blok: Link;
};

export type Link = ContentType & {
  label: string;
  link: {
    cached_url: string;
    fieldtype: 'multilink';
    id: string;
    linktype: 'url' | 'email';
    url: string;
  };
  icon: string;
  hideLabel: boolean;
  isBlur?: boolean;
  ariaLabel?: string;
  isActive?: boolean;
};
