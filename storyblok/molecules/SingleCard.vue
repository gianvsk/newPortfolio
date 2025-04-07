<script setup lang="ts">
  import type { SingleCardProps } from './SingleCard.props';

  defineProps<SingleCardProps>();

  const cursorState = ref(false);

  const changeCursor = (callback: () => void) => {
    const cursor = document.querySelector<HTMLElement>('.custom-cursor');
    if (cursor) {
      cursor.style.opacity = '1';
      cursorState.value = true;
      callback();
    } else cursorState.value = false;
  };

  const updateCursorPosition = (
    e: MouseEvent,
    callback: (e: MouseEvent, id: string) => void,
    id: string
  ) => {
    if (!cursorState.value) return;
    const cursor = document.querySelector<HTMLElement>('.custom-cursor');
    cursor!.style.left = `${e.clientX}px`;
    cursor!.style.top = `${e.clientY}px`;
    callback(e, id);
  };

  const removeCursor = (callback: () => void) => {
    if (!cursorState.value) return;
    const cursor = document.querySelector<HTMLElement>('.custom-cursor');
    cursor!.style.opacity = '0';
    callback();
  };

  onMounted(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
  });
</script>

<template>
  <NuxtLink to="/">
    <LazyMouseShow
      v-slot="{ state, createChild, setChildPosition, removeChild }"
    >
      <article
        class="relative px-5 py-4 h-full md:min-h-[300px] bg-white lg:p-8 hover:bg-black border border-transparent hover:border-white group duration-500 xl:cursor-none"
        @mouseenter="changeCursor(createChild)"
        @mousemove="updateCursorPosition($event, setChildPosition, blok.id)"
        @mouseleave="removeCursor(removeChild)"
      >
        <div class="flex flex-col gap-8 md:h-full">
          <NuxtImg
            :src="blok.image.filename"
            :alt="blok.image.alt"
            loading="lazy"
            sizes="sm:100vw md:50vw lg:33vw"
            class="lg:hidden object-cover object-left-top w-full md:max-h-[400px] lg:max-h-none"
          />
          <div class="flex flex-col md:h-full">
            <h3
              class="text-lg md:text-2xl lg:text-3xl uppercase font-medium font-mont group-hover:text-white"
            >
              {{ blok.title }}
            </h3>
            <p
              v-if="blok?.subtitle"
              class="text-sm md:text-xl group-hover:text-white mb-6 font-mont mt-2"
            >
              {{ blok.subtitle }}
            </p>
            <p
              v-if="blok?.text"
              class="text-md md:text-xl group-hover:text-white font-mont mt-auto"
            >
              {{ blok.text }}
            </p>
          </div>
        </div>
        <div
          :id="blok.id"
          class="flex absolute pointer-events-none z-50 w-full h-full animate-show-in"
          :class="{ hidden: !state }"
        >
          <NuxtImg
            :src="blok.image.filename"
            :alt="blok.image.alt"
            loading="lazy"
            provider="storyblok"
            sizes="sm:100vw md:50vw"
            class="animate-child-show-in bg-white w-full h-full"
          />
        </div>
      </article>
    </LazyMouseShow>
  </NuxtLink>
</template>

<style lang="scss">
  :root {
    --container-height: 200px;
  }

  .custom-cursor {
    position: fixed;
    width: 15px;
    height: 15px;
    cursor: none;
    background-color: white;
    border-radius: 50%;
    pointer-events: none;
  }

  @screen md {
    :root {
      --container-height: 250px;
    }

    .animate-show-in {
      animation: show-in 1.5s ease-in-out forwards;
    }

    .animate-child-show-in {
      animation: child-show-in 1.5s ease-in forwards;
    }
  }

  @screen lg {
    :root {
      --container-height: 350px;
    }
  }

  @screen xl {
    :root {
      --container-height: 450px;
    }
  }

  @screen 2xl {
    :root {
      --container-height: 350px;
    }
  }

  @screen 3xl {
    :root {
      --container-height: 600px;
    }
  }

  @keyframes show-in {
    0% {
      height: 20px;
      width: 20px;
      border-radius: 100%;
      opacity: 0;
      mix-blend-mode: difference;
    }
    10% {
      width: 20px;
      opacity: 1;
      border-radius: 100%;
    }
    40% {
      width: 20px;
      transform: translateX(25dvw);
      border-radius: 0;
      background-color: white;
    }
    75% {
      transform: scaleX(100%);
      height: 20px;
      mix-blend-mode: difference;
      background-color: white;
    }
    85% {
      mix-blend-mode: normal;
    }
    100% {
      transform: scaleY(100%);
    }
  }

  @keyframes child-show-in {
    0%,
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
