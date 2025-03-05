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
    const sphereTl = $gsap.timeline();

    sphereTl.to('#vertical-slider', {
      scrollTrigger: {
        trigger: '#vertical-slider',
        start: 'top top',
        end: `bottom+=${window.innerHeight} bottom`,
        scrub: true,
        pin: true,
      },
    });

    sphereTl.to('#sphere-container', {
      scrollTrigger: {
        trigger: '#vertical-slider',
        start: 'top top',
        end: `bottom+=${window.innerHeight * 0.5} bottom`,
        scrub: true,
      },
      scale: 0.5,
      onReverse: () => {
        $gsap.set('#sphere-container', { opacity: 1, scale: 1, zIndex: 1 });
      },
      onComplete: () => {
        $gsap.set('#sphere-container', { scale: 0, zIndex: -10 });
      },
    });

    sphereTl.to('#sphere', {
      scrollTrigger: {
        trigger: '#sphere-container',
        start: 'top top',
        end: `bottom+=${window.innerHeight * 0.5} bottom`,
        scrub: true,
      },
      scale: 50,
      ease: 'power1.in',
      onReverse: () => {
        $gsap.set('#sphere', { opacity: 1, scale: 1, zIndex: 1 });
      },
      onComplete: () => {
        $gsap.set('#sphere', { scale: 0, zIndex: -10 });
      },
    });
    if (window.innerWidth < 767) {
      const verticalSliderTl = $gsap.timeline();
      const verticalSlideElements: Array<Element> =
        $gsap.utils.toArray('#vertical-slide');

      const verticalAnimationEnd = verticalSlideElements
        .map(el => (el as HTMLElement).offsetHeight)
        .reduce((value, acc) => (acc < value ? (acc = value) : acc), 0);
      console.log(verticalAnimationEnd);

      verticalSliderTl.from('#vertical-slider-container', {
        scrollTrigger: {
          trigger: '#vertical-slider-container',
          start: `top top`,
          end: `bottom+=${verticalAnimationEnd * verticalSlideElements.length} bottom`,
          scrub: true,
          pin: true,
          markers: {
            startColor: 'blue',
            endColor: 'yellow',
          },
        },
      });

      verticalSlideElements.forEach((el, i) => {
        const nextColor = el.getAttribute('data-color');

        const elementHeight = (el as HTMLElement).offsetHeight;

        verticalSliderTl.fromTo(
          el as Element,
          {
            yPercent: 100,
            zIndex: i + 5,
          },
          {
            scrollTrigger: {
              trigger: el as Element,
              start: `top+=${elementHeight * (i - 1)} top`,
              end: `bottom+=${elementHeight * i} bottom`,
              scrub: true,
              markers: true,
            },
            yPercent: 0,
            color: nextColor ?? '',
            toggleActions: 'play none reverse none',
          }
        );

        verticalSliderTl.fromTo(
          '#experience',
          {
            text:
              i > 0
                ? story.content.body[1].contents?.[i - 1]?.content.title
                : story.content.body[1].contents?.[i].content.title,
          },
          {
            scrollTrigger: {
              trigger: el as Element,
              start: `top+=${elementHeight * (i - 1)} top`,
              end: `bottom+=${elementHeight * i} bottom`,
              scrub: true,
              toggleActions: 'play none reverse none',
            },
            color: nextColor ?? '',
            text: story.content.body[1].contents?.[i].content.title,
            opacity: 1,
          }
        );
      });
    } else {
      const slideHeight = $gsap.getProperty(
        '#vertical-slide',
        'height'
      ) as number;

      $gsap.to('#navbar', {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: `bottom 90%`,
          scrub: true,
        },
        background: 'black',
        color: 'white',
        borderColor: 'text-white/50',
      });

      const verticalSliderTl = $gsap.timeline();
      const verticalSlideElements: Array<Element> =
        $gsap.utils.toArray('#vertical-slide');

      console.log('slide', slideHeight);

      verticalSliderTl.from('#vertical-slider-container', {
        scrollTrigger: {
          trigger: '#vertical-slider-container',
          start: `top top`,
          end: `bottom+=${slideHeight * 5} bottom`,
          scrub: true,
          pin: true,
          markers: {
            startColor: 'blue',
            endColor: 'yellow',
          },
          snap: { snapTo: 1 / verticalSlideElements.length, duration: 2 },
        },
      });

      verticalSlideElements.forEach((el, i) => {
        const nextColor = el.getAttribute('data-color');

        verticalSliderTl.fromTo(
          el as Element,
          {
            yPercent: 100,
            zIndex: i + 5,
          },
          {
            scrollTrigger: {
              trigger: el as Element,
              start: `top+=${slideHeight * (i - 1)} top`,
              end: `bottom+=${slideHeight * i} bottom`,
              scrub: true,
              markers: true,
            },
            yPercent: 0,
            color: nextColor ?? '',
          }
        );

        verticalSliderTl.fromTo(
          '#experience',
          {
            text:
              i > 0
                ? story.content.body[1].contents?.[i - 1]?.content.title
                : story.content.body[1].contents?.[i].content.title,
          },
          {
            scrollTrigger: {
              trigger: el as Element,
              start: `top+=${slideHeight * (i - 1)} top`,
              end: `bottom+=${slideHeight * i} bottom`,
              scrub: true,
            },
            color: nextColor ?? '',
            text: story.content.body[1].contents?.[i].content.title,
            opacity: 1,
          }
        );
      });
    }

    const horizontalSliderTl = $gsap.timeline();
    const horizontalSlideElements = $gsap.utils.toArray('#horizontal-slide');

    // snap uses horizontalSlideElements.length - 1 because top slide start from top+= i * - 1, a slide behind

    horizontalSliderTl.to('#horizontal-slider', {
      scrollTrigger: {
        trigger: '#horizontal-slider',
        start: 'top top',
        end: `top+=${window.innerWidth * horizontalSlideElements.length} bottom`,
        scrub: true,
        pin: true,
        snap: 1 / (horizontalSlideElements.length - 1),
      },
      x: 15 * -horizontalSlideElements.length,
    });

    horizontalSlideElements.forEach((el, i) => {
      horizontalSliderTl.to(el as Element, {
        scrollTrigger: {
          trigger: el as Element,
          start: `top+=${(i - 1) * window.innerWidth} top`,
          end: `bottom+=${i * window.innerWidth} bottom`,
          scrub: true,
        },
        xPercent: 100 * -i + i * 2.5,
        y: i * 10,
        scale: 0.8,
      });
    });
  };

  return { homepageAnimations };
};
