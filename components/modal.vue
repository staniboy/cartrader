<template>
  <dialog open class="bg-inherit w-full h-full">
    <card class="p-4"
      ><div class="flex gap-2">{{ title }}</div>
      <div><slot></slot></div
    ></card>
  </dialog>
</template>
<script setup>
const props = defineProps({
  title: String,
});
</script>
<style scoped></style>
