<script setup lang="ts">
  import type { HeaderContainerProps } from './HeaderContainer.props';

  const modal = ref(false);

  const toggleOrCloseModal = (value?: 'toggle') => {
    modal.value = value === 'toggle' ? !modal.value : false;
  };

  defineProps<HeaderContainerProps>();
</script>

<template>
  <nav id="navbar">
    <ul
      class="hidden xl:flex items-center justify-center h-[32px] 3xl:h-[54px] bg-stone-900 rounded-full shadow-[0_0_0_1px_white] overflow-hidden"
    >
      <li
        v-for="link in blok.links"
        :key="link.content.link._uid"
        class="text-white h-full hover:bg-white group"
      >
        <StoryblokComponent
          :blok="link.content"
          class="px-6 h-full flex items-center group-hover:text-black duration-500 font-mont font-light text-md xl:text-lg 3xl:text-xl"
        />
      </li>
    </ul>

    <div class="fixed right-5 top-6 xl:hidden items-center justify-end">
      <button
        class="z-50"
        aria-label="navigation-menu"
        :disabled="modal"
        @click="toggleOrCloseModal('toggle')"
      >
        <IconsBurgherMenu class="w-8 h-8 text-white" :font-controlled="false" />
      </button>
    </div>

    <div
      v-if="modal"
      id="modal"
      class="fixed top-0 left-0 h-screen w-screen z-[9999] flex"
    >
      <div
        id="modal-overlay"
        class="relative bg-neutral-900 backdrop-blur-md transition-all w-4/5 max-w-xs h-full p-6 shadow-2xl flex flex-col justify-between"
        :class="[modal ? 'opacity-100' : 'opacity-0']"
      >
        <div class="flex flex-col gap-8 pt-4" @click="toggleOrCloseModal()">
          <StoryblokComponent
            v-for="link in blok.links"
            v-show="modal"
            :key="link.content.link._uid"
            :blok="link.content"
            class="text-white w-min"
          />
        </div>

        <button
          class="absolute top-4 right-4 border border-white rounded-full p-2 hover:rotate-90 duration-300"
          @click.stop="toggleOrCloseModal('toggle')"
        >
          <IconsClose class="w-5 h-5 text-white" :font-controlled="false" />
        </button>
      </div>

      <div
        class="flex-1 bg-neutral-900 opacity-40"
        @click.self="toggleOrCloseModal()"
      />
    </div>
  </nav>
</template>
