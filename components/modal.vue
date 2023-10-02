<template>
  <dialog open class="bg-inherit">
    <card class="p-4"><slot></slot></card>
  </dialog>
</template>
<script setup>
const props = defineProps({
  title: String,
  content: String,
});
</script>
<style lang="css">
dialog::backdrop {
  background-color: black;
}
</style>
