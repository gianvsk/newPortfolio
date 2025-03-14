<script setup lang="ts">
  const state = ref(false);
  const createChild = (event: MouseEvent) => {
    const element = event.target as HTMLElement;

    if (
      event.target instanceof HTMLElement &&
      event.target.children.length < 2
    ) {
      state.value = true;
      console.log('element', element.children[0]);
      element.children[0].classList =
        'h-[300px] w-[300px] z-10 absolute bg-red-300';
    }
  };

  const setChildPosition = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;
    const element = event.target as HTMLElement;

    const rect = element.getBoundingClientRect();
    const relativeX = x - rect.left;
    const relativeY = y - rect.top;

    if (element.children[0]) {
      console.log('test', element.children[0]);
      requestAnimationFrame(() => {
        (element.children[0] as HTMLElement).style =
          'left: ' + (relativeX + 50) + 'px; top: ' + (relativeY - 15) + 'px';
      });
    }
  };

  const removeChild = () => {
    state.value = false;
  };
</script>
<template>
  <div class="w-5 h-5">
    <slot
      v-if="state"
      @mouseenter="createChild"
      @mousemove="setChildPosition"
      @mouseleave="removeChild"
    >
      <div class="w-[100px] h-[100px] bg-red-500" />
    </slot>
  </div>
</template>
