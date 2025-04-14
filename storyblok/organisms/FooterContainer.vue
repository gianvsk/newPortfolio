<script setup lang="ts">
  import type { FooterProps } from './FooterContainer.props';

  defineProps<FooterProps>();
</script>

<template>
  <!-- <footer
    class="bg-stone-900 text-gray-600 py-10 px-5 mt-12 border-t border-gray-200"
  >
    <div
      class="container max-w-screen-xl mx-auto flex flex-col md:flex-row md:justify-between items-center md:items-start gap-8 text-center md:text-left"
    >
      <div class="flex-shrink-0">
        <h4 class="text-white font-bold mb-4">Connettiti con me</h4>
        <ul
          class="flex justify-center md:justify-start gap-4 list-none p-0 m-0"
        >
          <li>
            <a
              href="https://linkedin.com/in/tuo-profilo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              <i class="fab fa-linkedin text-2xl" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/tuo-username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              class="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              <i class="fab fa-github text-2xl" />
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-gray-900 font-bold mb-4">Contatti</h4>
        <p class="mb-1">Pronto per collaborare?</p>
        <p class="mb-1">
          <i class="fas fa-envelope mr-1" />
          <a
            href="mailto:tuamail@esempio.com"
            class="text-blue-600 hover:underline"
          >
            tuamail@esempio.com
          </a>
        </p>
        <p>
          <NuxtLink to="/contatti" class="text-blue-600 hover:underline">
            Modulo di contatto completo
          </NuxtLink>
        </p>
      </div>

      <div>
        <h4 class="text-gray-900 font-bold mb-4">Naviga</h4>
        <ul
          class="list-none p-0 m-0 flex flex-col items-center md:items-start gap-2"
        >
          <li>
            <NuxtLink
              to="/"
              class="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/portfolio"
              class="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              Portfolio
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/chi-sono"
              class="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              Chi Sono
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/contatti"
              class="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              Contatti
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>


  </footer> -->

  <footer
    class="py-10 px-4 mt-12 mb-12 text-white flex flex-col items-center xl:h-[50vh] xl:mt-[20%]"
  >
    <div class="w-full flex flex-col xl:flex-row gap-8 mt-auto">
      <div
        v-for="blok in blok.contents"
        :key="blok.id"
        class="flex-1 flex flex-col items-center gap-2"
      >
        <span class="font-mont text-lg md:text-xl xl:text-2xl 3xl:text-3xl">
          {{ blok?.label }}
        </span>
        <ul class="flex flex-col items-center">
          <li v-for="link in blok.block" :key="link.id" class="w-max">
            <StoryblokComponent :blok="link" />
          </li>
        </ul>
      </div>
    </div>
    <span
      class="font-mt text-center mt-10 xl:mt-12 text-white text-md md:text-lg xl:text-xl 3xl:text-2xl"
    >
      &copy; {{ 2025 }} Gianvito Scandurra. Tutti i diritti riservati.
    </span>
  </footer>
</template>
