<script setup lang="ts">
const props = defineProps({
    blok: Object
})

watch(props.blok!, () => console.log('blok', props.blok), { immediate: true })
</script>

<template>
<div v-if="blok" v-editable="blok" class="px-4">
    <h1 class="text-red-300">ciao</h1>
</div>
</template>