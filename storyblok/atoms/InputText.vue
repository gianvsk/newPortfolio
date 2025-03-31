<script setup lang="ts">
  defineProps<{
    blok: {
      id: string;
      label: string;
      placeholder: string;
      type: 'text' | 'email' | 'textarea';
    };
  }>();
</script>

<template>
  <FormKit
    :id="blok.id"
    :name="blok.id"
    :type="blok.type"
    :placeholder="blok.placeholder"
    :label="blok.label"
    :classes="{
      outer: blok.type === 'textarea' ? 'resize-none relative' : 'relative',
      inner: 'mt-1',
      input:
        blok.type === 'textarea'
          ? 'resize-none min-h-[120px] w-full h-full border border-neutral-900 p-2 w-full text-xl'
          : 'border border-neutral-900 p-2 w-full text-xl',
      messages: 'text-red-400 mt-2 absolute left-0 right-0 top-full',
      label: 'text-2xl text-neutral-900',
    }"
    validation="required"
    autocomplete="off"
    aria-required="true"
  />
</template>
