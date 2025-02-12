export type LinkSchema = {
  blok: Link;
};

export type Link = {
  _uid: string;
  component: string;
  label: string;
  link: {
    cached_url: string;
    fieldtype: 'multilink';
    id: string;
    linktype: 'url';
    url: string;
  };
  _editable: string;
};
