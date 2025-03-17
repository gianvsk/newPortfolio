<script setup lang="ts">
  const props = defineProps<{
    position?: 'left' | 'right';
  }>();

  const state = ref(false);
  const createChild = () => {
    state.value = true;
  };

  const setChildPosition = (event: MouseEvent, id: string) => {
    const x = event.clientX;
    const y = event.clientY;
    const element = event.currentTarget as HTMLElement;

    const rect = element.getBoundingClientRect();
    const relativeLeft = x - rect.left;
    const relativeRight = rect.right - x;
    const relativeY = y - rect.top;

    const childElement = document.getElementById(id);

    if (childElement) {
      requestAnimationFrame(() => {
        childElement.style =
          props.position === 'left'
            ? 'left: ' +
              (relativeLeft + 50) +
              'px; top: ' +
              (relativeY - 15) +
              'px'
            : 'right: ' +
              (relativeRight + 50) +
              'px; top: ' +
              (relativeY - 15) +
              'px';
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
