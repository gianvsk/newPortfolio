<script setup lang="ts">
defineProps({
    blok: Object
})
</script>

<template>
<div v-if="blok" v-editable="blok">
    <h2 class="text-red-300">This is my container</h2>
    <h3 class="text-blue-300">{{ blok.title }}</h3>
    <h5 class="text-blue-600">{{ blok.subtitle }}</h5>
</div>
</template>