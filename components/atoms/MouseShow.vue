<script setup lang="ts">
  const state = ref(false);
  const createChild = () => {
    if (window.innerWidth < 1280) return;
    state.value = true;
  };

  const setChildPosition = (event: MouseEvent, id: string) => {
    if (!state.value) return;
    const x = event.clientX;
    const y = event.clientY;
    const element = event.currentTarget as HTMLElement;

    const rect = element.getBoundingClientRect();
    const relativeLeft = x - rect.left;
    const relativeY = y - rect.top;

    const p = relativeLeft + 50;

    const childElement = document.getElementById(id) as HTMLElement;

    if (childElement) {
      requestAnimationFrame(() => {
        childElement.style = 'left: ' + p + 'px; top: ' + relativeY + 'px;';
      });
    }
  };

  const removeChild = () => {
    state.value = false;
  };

  defineExpose({
    state,
    createChild,
    setChildPosition,
    removeChild,
  });
</script>
<template>
  <slot
    :state="state"
    :create-child="createChild"
    :set-child-position="setChildPosition"
    :remove-child="removeChild"
  />
</template>
