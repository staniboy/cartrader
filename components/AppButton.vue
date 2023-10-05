<template>
  <button
    :autofocus="props.autofocus"
    class="py-1 px-4 bg-sky-500 hover:bg-sky-600 rounded items-center text-center text-white cursor-pointer"
  >
    <slot></slot>
  </button>
</template>
<script setup>
const props = defineProps({
  autofocus: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
