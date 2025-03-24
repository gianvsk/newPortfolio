<script setup lang="ts">
  import type { TimelineSvgProps } from './TimelineSvg.props';

  defineProps<TimelineSvgProps>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="45 35 460 30"
    width="520"
    class="shrink-0 text-gray-500"
    :class="bgColor"
  >
    <defs>
      <mask id="colorMask">
        <rect id="maskRect" x="0" y="0" width="0" height="100" fill="white" />
      </mask>
    </defs>

    <line
      x1="50"
      y1="50"
      x2="500"
      y2="50"
      stroke="currentColor"
      stroke-width="1"
    />
    <circle cx="50" cy="50" r="4" fill="currentColor" />
    <circle cx="275" cy="50" r="4" fill="currentColor" />
    <circle cx="500" cy="50" r="4" fill="currentColor" />

    <g mask="url(#colorMask)">
      <line
        x1="50"
        y1="50"
        x2="500"
        y2="50"
        :stroke="fillColor"
        stroke-width="1"
      />
      <circle cx="50" cy="50" r="4" :fill="fillColor" />
      <circle cx="275" cy="50" r="4" :fill="fillColor" />
      <circle cx="500" cy="50" r="4" :fill="fillColor" />
    </g>
  </svg>
</template>
