declare global {
  type StoryblokContent = {
    alternates: any[];
    content: ContentType;
    created_at: string;
    default_full_slug: string | null;
    first_published_at: string | null;
    full_slug: string;
    group_id: string;
    id: number | string;
    is_startpage: boolean;
    lang: string;
    meta_data: null | Record<string, unknown>;
    name: string;
    parent_id: number;
    path: string;
    position: number;
    published_at: string | null;
    release_id: null | number;
    slug: string;
    sort_by_date: null | boolean;
    tag_list: string[];
    translated_slugs: null | Record<string, unknown>;
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
    id?: string;
  };

  interface Link {
    id: string;
    url: string;
    linktype: string;
    fieldtype: string;
    cached_url: string;
  }

  interface Image {
    id: number;
    alt: string;
    name: string;
    focus: string;
    title: string;
    source: string;
    filename: string;
    copyright: string;
    fieldtype: string;
    meta_data: {
      alt: string;
      title: string;
      source: string;
      copyright: string;
    };
    is_external_url: boolean;
  }

  interface RichTextContent {
    type: string;
    content?: Array<{
      type: string;
      text?: string;
      marks?: Array<{ type: string }>;
      content?: Array<{ type: string; text: string }>;
    }>;
  }

  interface Content {
    _uid: string;
    icon?: string;
    link?: Link;
    label?: string;
    component: string;
    _editable?: string;
    image?: Image;
    theme?: boolean;
    title?: string;
    subtitle?: string;
    description?: string;
    icons?: string[];
    bgColor?: string;
    paragraph?: string;
    mainRichText?: RichTextContent;
    subparagraph?: string;
    isSingleImage?: boolean;
    secondaryRichText?: RichTextContent;
  }

  interface Story {
    name: string;
    created_at: string;
    published_at: string | null;
    updated_at: string;
    id: number;
    uuid: string;
    content: Content;
    slug: string;
    full_slug: string;
    sort_by_date: null;
    position: number;
    tag_list: string[];
    is_startpage: boolean;
    parent_id: number | null;
    meta_data: null;
    group_id: string;
    first_published_at: string | null;
    release_id: null;
    lang: string;
    path: string | null;
    alternates: any[];
    default_full_slug: null;
    translated_slugs: null;
    _stopResolving?: boolean;
  }

  interface BodyItem {
    _uid: string;
    contents?: Story[];
    component: string;
    _editable?: string;
  }

  interface StoryContent {
    _uid: string;
    body: BodyItem[];
    component: string;
    _editable?: string;
  }

  interface PageStoryContent extends Story {
    content: StoryContent;
  }

  interface ObjectType {
    [key: string]: PageStory;
  }

  interface StoryblokStory {
    _object: ObjectType;
    _key: string;
    __v_isRef: boolean;
    _value: PageStory;
  }
}

export {};
