<script setup lang="ts">
  import type { SingleCardProps } from './SingleCard.props';

  defineProps<SingleCardProps>();
</script>

<template>
  <ClientOnly>
    <LazyMouseShow
      v-slot="{ state, createChild, setChildPosition, removeChild }"
    >
      <div
        class="relative px-5 py-4 bg-white lg:p-8 hover:bg-black hover:border hover:border-white group duration-500"
        @mouseenter="createChild"
        @mousemove="event => setChildPosition(event, blok.id)"
        @mouseleave="removeChild"
      >
        <div class="flex flex-col gap-8">
          <NuxtImg
            :src="blok.image.filename"
            :alt="blok.image.alt"
            loading="lazy"
            sizes="sm:100vw md:50vw lg:33vw"
            class="md:hidden object-cover object-left-top w-full"
          />
          <div class="flex flex-col h-full">
            <h3
              class="text-lg md:text-2xl uppercase font-medium font-mont group-hover:text-white"
            >
              {{ blok.title }}
            </h3>
            <p
              v-if="blok?.subtitle"
              class="text-sm text-gray-400 mb-3 font-mont"
            >
              {{ blok.subtitle }}
            </p>
            <p
              v-if="blok?.text"
              class="text-md group-hover:text-white self-end"
            >
              {{ blok.text }}
            </p>
          </div>
        </div>
        <div
          :id="blok.id"
          class="flex absolute pointer-events-none bg-neutral-300 z-50 h-[var(--container-height)] w-full animate-show-in"
          :class="{ hidden: !state }"
        >
          <NuxtImg
            :src="blok.image.filename"
            :alt="blok.image.alt"
            loading="lazy"
            provider="storyblok"
            sizes="sm:100vw md:50vw lg:33vw"
            class="animate-child-show-in object-cover object-left-top w-full"
          />
        </div>
      </div>
    </LazyMouseShow>
  </ClientOnly>
</template>

<style lang="scss">
  :root {
    --container-height: 200px;
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
      transform: scaleY(--container-height);
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
