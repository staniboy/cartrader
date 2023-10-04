<template>
  <dialog ref="dialog" class="bg-inherit">
    <card class="p-4">
      <div>
        <div class="p-4"><slot></slot></div>

        <div><Button @click="hide">Delete</Button></div>
      </div>
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
