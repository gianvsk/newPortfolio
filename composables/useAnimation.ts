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

interface PageContent {
  _uid: string;
  body: BodyItem[];
  component: string;
  _editable?: string;
}

interface PageStory extends Story {
  content: PageContent;
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

export const useAnimation = () => {
  const { $gsap } = useNuxtApp();
  const homepageAnimations = (story: any) => {
    $gsap.to('#navbar', {
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: `bottom+=${window.innerHeight / 4} 90%`,
        scrub: true,
      },
      background: 'black',
      color: 'white',
      borderColor: 'text-white/50',
    });

    const sphereTl = $gsap.timeline();

    sphereTl.to('#vertical-slider', {
      scrollTrigger: {
        trigger: '#vertical-slider',
        start: 'top top',
        end: `bottom+=${window.innerHeight * 2} bottom`,
        scrub: true,
        pin: true,
      },
    });

    sphereTl.to('#sphere-container', {
      scrollTrigger: {
        trigger: '#vertical-slider',
        start: 'top top',
        end: `bottom+=${window.innerHeight * 2} bottom`,
        scrub: true,
      },
      scale: 0.5,
      onReverse: () => {
        $gsap.set('#sphere-container', { opacity: 1, scale: 1, zIndex: 1 });
      },
      onComplete: () => {
        $gsap.set('#sphere-container', { scale: 0 });
      },
    });

    sphereTl.to('#sphere', {
      scrollTrigger: {
        trigger: '#sphere-container',
        start: 'top top',
        end: `bottom+=${window.innerHeight * 2} bottom`,
        scrub: true,
      },
      scale: 50,
      ease: 'power1.in',
      onReverse: () => {
        $gsap.set('#sphere', { opacity: 1, scale: 1, zIndex: 1 });
      },
      onComplete: () => {
        $gsap.set('#sphere', { scale: 0 });
      },
    });

    const verticalSliderTl = $gsap.timeline();
    const verticalSlideElements: Array<Element> =
      $gsap.utils.toArray('#vertical-slide');

    verticalSliderTl.from('#vertical-slider-container', {
      scrollTrigger: {
        trigger: '#vertical-slider-container',
        start: `top top`,
        end: `bottom+=${window.innerHeight * (verticalSlideElements.length + 1)} bottom`,
        scrub: true,
        pin: true,
      },
    });

    verticalSlideElements.forEach((el, i, arr) => {
      verticalSliderTl.fromTo(
        el as Element,
        { yPercent: 100 },
        {
          scrollTrigger: {
            trigger: el as Element,
            start: `top+=${window.innerHeight * i} top`,
            end: `top+=${window.innerHeight * (i + 2)} bottom`,
            scrub: true,
            snap: {
              snapTo: 1 / 1,
              duration: 1,
            },
          },
          color: $gsap.getProperty(
            (arr as Array<Element>)[arr.length - 1 - i],
            'background-color'
          ),
          yPercent: 0,
        }
      );
    });

    verticalSlideElements.forEach((el, i, arr) => {
      verticalSliderTl
        .from('#experience', {
          color: $gsap.getProperty(el as Element, 'background-color'),
          text:
            i > 0
              ? story.content.body[1].contents?.[i - 1]?.content.title
              : story.content.body[1].contents?.[i].content.title,
        })
        .to('#experience', {
          scrollTrigger: {
            trigger: el as Element,
            start: `top+=${window.innerHeight * i} top`,
            end: `bottom+=${window.innerHeight * (i + 1)} bottom`,
            scrub: true,
            toggleActions: 'play none reverse none',
          },
          color: $gsap.getProperty(
            (arr as Array<Element>)[arr.length - 1 - i],
            'background-color'
          ),
          text: story.content.body[1].contents?.[i].content.title,
        });
    });

    const horizontalSliderTl = $gsap.timeline();
    const horizontalSlideElements = $gsap.utils.toArray('#testl');

    horizontalSliderTl.to('#horizontal-slider', {
      scrollTrigger: {
        trigger: '#horizontal-slider',
        start: 'top top',
        end: `top+=${window.innerWidth * 4} bottom`,
        scrub: true,
        pin: true,
        snap: 1 / horizontalSlideElements.length,
      },
    });

    horizontalSlideElements.forEach((el, i) => {
      horizontalSliderTl.to(el as Element, {
        scrollTrigger: {
          trigger: el as Element,
          start: `top+=${(i - 1) * window.innerWidth} top`,
          end: `bottom+=${i * window.innerWidth} bottom`,
          scrub: true,
        },
        xPercent: 100 * -i,
      });
    });
  };

  return { homepageAnimations };
};
