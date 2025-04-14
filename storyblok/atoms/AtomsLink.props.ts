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
  ariaLabel?: string;
  hideLabel: boolean;
  isBlur?: boolean;
  isActive?: boolean;
};
