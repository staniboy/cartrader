<template>
  <dialog
    ref="dialog"
    class="bg-inherit backdrop:bg-gray-50 backdrop:opacity-50"
  >
    <card class="p-4">
      <slot></slot>
    </card>
  </dialog>
</template>
<script setup>
const dialog = ref();

function show() {
  dialog.value.showModal();
}

function hide() {
  dialog.value.close();
}

defineExpose({
  show,
  hide,
});
</script>
<style scoped></style>
