<template>
  <div
    class="w-full h-[68px] p-4 flex items-center justify-between gap-2 text-md"
  >
    <div class="text-md">{{ props.title }}</div>
    <div class="text-blue-500 capitalize cursor-pointer truncate">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: String,
});
</script>
