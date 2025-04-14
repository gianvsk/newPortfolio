<script setup lang="ts">
  const headerStory = await useAsyncStoryblok(
    '/components/header/header-links-container',
    {
      version: 'draft',
      resolve_relations: 'header-container.links',
    }
  );

  const footerStory = await useAsyncStoryblok(
    '/components/footer/footer-container',
    {
      version: 'draft',
      resolve_relations: 'footer-container.contents',
    }
  );
</script>

<template>
  <div class="w-screen flex flex-col overflow-hidden relative bg-stone-900">
    <div class="flex flex-col col-start-1 col-span-12">
      <header
        v-if="headerStory"
        class="fixed top-10 xl:top-[30px] left-1/2 -translate-x-1/2 z-[100] bg-black rounded-full"
      >
        <StoryblokComponent :blok="headerStory.content" />
      </header>
    </div>
    <slot />
    <StoryblokComponent :blok="footerStory.content" />
    <!-- <footer
      class="bg-gray-50 text-gray-600 py-10 px-5 mt-12 border-t border-gray-200"
    >
      <div
        class="container max-w-screen-xl mx-auto flex flex-col md:flex-row md:justify-between items-center md:items-start gap-8 text-center md:text-left"
      >
        <div class="flex-shrink-0">
          <h4 class="text-gray-900 font-bold mb-4">Connettiti con me</h4>
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

      <div class="text-center text-sm mt-8 pt-8 border-t border-gray-200">
        &copy; {{ 2025 }} Il Tuo Nome / Il Tuo Brand. Tutti i diritti riservati.
      </div>
    </footer> -->
  </div>
</template>

<style lang="scss" scoped>
  .hover-animation {
    &:hover {
      animation: rotation 2s forwards linear;
    }
  }

  @keyframes rotation {
    0% {
      transform: translate(50px, 50px);
    }
    100% {
      transform: translateY(300px);
    }
  }
</style>
