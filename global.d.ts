declare global {
  type StoryblokContent = {
    alternates: any[];
    content: ContentType;
    created_at: string;
    default_full_slug: string | null;
    first_published_at: string | null;
    full_slug: string;
    group_id: string;
    id: number;
    is_startpage: boolean;
    lang: string;
    meta_data: null | Record<string, unknown>; // You might want to define this more specifically if you know the structure
    name: string;
    parent_id: number;
    path: string;
    position: number;
    published_at: string | null;
    release_id: null | number;
    slug: string;
    sort_by_date: null | boolean;
    tag_list: string[];
    translated_slugs: null | Record<string, unknown>; // You might want to define this more specifically if you know the structure
    updated_at: string;
    uuid: string;
  };

  type StoryblokContentList = Omit<StoryblokContent, 'content'> & {
    contents: StoryblokContent[];
  };

  type ContentType = {
    _uid: string;
    component: string;
    _editable: string;
  };
}

export {};
