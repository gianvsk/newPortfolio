import { CSSRulePlugin } from 'gsap/all';
import type { ISbStoryData } from '@storyblok/vue';

export const useAnimation = () => {
  const { $gsap } = useNuxtApp();
  $gsap.registerPlugin(CSSRulePlugin);

  const homepageAnimations = (story: ISbStoryData) => {
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

      verticalSliderTl.from('#vertical-slider-container', {
        scrollTrigger: {
          trigger: '#vertical-slider-container',
          start: `top top`,
          end: `bottom+=${verticalAnimationEnd * verticalSlideElements.length} bottom`,
          scrub: true,
          pin: true,
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

      verticalSliderTl.from('#vertical-slider-container', {
        scrollTrigger: {
          trigger: '#vertical-slider-container',
          start: `top top`,
          end: `bottom+=${slideHeight * 5} bottom`,
          scrub: true,
          pin: true,
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

    const experienceSlides = <Array<HTMLElement>>(
      $gsap.utils.toArray('#career-section')
    );

    const experienceSlideWidth = $gsap.getProperty(
      '#career-section',
      'width'
    ) as number;

    $gsap.to('#career', {
      scrollTrigger: {
        trigger: '#career',
        start: 'top top',
        end: `top+=${experienceSlideWidth * experienceSlides.length * 3.2} bottom`,
        pin: true,
        scrub: true,
      },
      ease: 'none',
    });

    // xPercent = 100vw * (slidesNumber) - slidesGap * (slidesNumber - 1)
    // (sliderNumber - 1) because, example: between 3 slides, gap will be shown only 2 times, not 3

    experienceSlides.forEach(el => {
      const experienceTween = $gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: `top top`,
          end: `bottom+=${experienceSlideWidth * experienceSlides.length * 3} bottom`,
          scrub: true,
          markers: true,
        },
        ease: 'none',
        scrub: 3,
        xPercent:
          -100 * experienceSlides.length - 50 * (experienceSlides.length - 1),
      });

      const texts = el.querySelectorAll('#experience-text');

      $gsap.from(texts, {
        opacity: 0,
        y: -130,
        ease: 'elastic.out',
        duration: 2,
        stagger: 0.3,
        scrollTrigger: {
          trigger: el,
          containerAnimation: experienceTween,
          start: 'left center+=30%',
          end: 'center right-=30%',
          toggleActions: 'play none reverse none',
        },
      });
    });

    $gsap.to('#maskRect', {
      attr: { width: 520 },
      scrollTrigger: {
        trigger: '#career-sections',
        start: `top left`,
        end: `bottom+=${experienceSlideWidth * experienceSlides.length * 3} bottom`,
        scrub: 1,
      },
      ease: 'none',
    });

    /*     const horizontalSliderTl = $gsap.timeline();
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
    }); */
  };

  return { homepageAnimations };
};
