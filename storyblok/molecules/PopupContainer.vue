<script setup lang="ts">
  const state = ref(false);

  const changeState = () => {
    state.value = !state.value;
  };
</script>

<template>
  <div class="relative z-[10]">
    <button
      class="h-10 w-10 bg-zinc-300 mt-5 rounded-full cursor-pointer relative group"
      @click="changeState"
    >
      <div
        class="absolute h-[80px] top-full -translate-x-[150px] pointer-events-none py-4 px-5 md:hidden md:group-hover:block"
        :class="{
          hidden: !state,
        }"
      >
        <span class="text-white text-md">Social</span>
        <ul class="flex items-center justify-start gap-10 mt-5">
          <li>
            <div class="bg-white h-5 w-5" />
          </li>
          <li>
            <div class="bg-white h-5 w-5" />
          </li>
          <li>
            <div class="bg-white h-5 w-5" />
          </li>
          <li>
            <div class="bg-white h-5 w-5" />
          </li>
          <li>
            <IconsGithub
              class="w-8 h-8 text-white"
              :font-controlled="false"
              filled
            />
          </li>
        </ul>
      </div>
    </button>
  </div>
</template>
