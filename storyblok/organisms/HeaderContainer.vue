<script setup lang="ts">
  import type { HeaderContainerProps } from './HeaderContainer.props';

  const modal = ref(false);

  const openModal = () => (modal.value = !modal.value);

  const closeModal = () => {
    const element = document.getElementById('modal') as HTMLElement;
    if (element) {
      element.classList.remove('animate-show-up');
      element.classList.add('animate-show-down');
      setTimeout(() => {
        modal.value = !modal.value;
      }, 300);
    }
  };

  const closeModalOnClickOutside = (event: MouseEvent) => {
    const element = document.querySelector('#modal-overlay');
    if (!element?.contains(event.target as Node)) {
      closeModal();
    }
  };

  defineProps<HeaderContainerProps>();
</script>

<template>
  <header
    id="navbar"
    class="hidden md:block w-max h-min border border-transparent box-shadow-light rounded-full px-3 py-8"
  >
    <ul class="gap-12 hidden md:flex md:flex-col md:items-center md:flex-">
      <li
        v-for="link in blok.links"
        :key="link.content.link._uid"
        class="text-white"
      >
        <StoryblokComponent :blok="{ ...link.content, showOnlyIcon: true }" />
      </li>
    </ul>
    <!-- mobile menu hidden at the moment, use flex when edit this -->
    <div class="hidden gap-8 items-center justify-between z-[9999]">
      <div />
      <button
        class="flex relative before:border-2 before:border-white px-[2px] before:rounded-md before:content-[''] before:absolute before:inset-0 before:opacity-0 before:duration-300 hover:before:opacity-100 cursor-pointer"
        aria-label="navigation-menu"
        @click="openModal"
      >
        <IconsBurgherMenu class="w-8 h-8 text-white" :font-controlled="false" />
      </button>
    </div>
    <div
      v-if="modal"
      id="modal"
      class="fixed inset-0 animate-show-up"
      @click="closeModalOnClickOutside"
    >
      <div
        id="modal-overlay"
        class="absolute inset-0 h-full py-6 px-10 w-3/4 bg-black z-[9999999]"
      >
        <div class="flex justify-between items-start w-full">
          <div class="flex flex-col gap-8 h-min">
            <StoryblokComponent
              v-for="link in blok.links"
              :key="link.content.link._uid"
              :blok="link.content"
              class="text-gray-400 font-mont text-3xl w-min hover:text-white hover:scale-125 hover:duration-300 relative before:content-[''] before:bg-amber-300 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[2px] before:w-0 hover:before:w-full before:duration-300"
            />
          </div>
          <button
            class="border-2 rounded-full border-gray-400 p-1 hover:border-white hover:animate-small-rotation cursor-pointer"
            aria-label="close-navigation-menu"
            @click="closeModal"
          >
            <IconsClose
              class="w-6 h-6 text-gray-400 hover:text-white"
              :font-controlled="false"
            />
          </button>
        </div>
      </div>
      <div
        class="absolute top-0 left-0 w-screen h-screen z-10 bg-black opacity-50"
      />
    </div>
  </header>
</template>

<style scoped lang="scss">
  .box-shadow-light {
    box-shadow: 0 0 3px rgba(255, 255, 255, 1);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
  }
</style>
