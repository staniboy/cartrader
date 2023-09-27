<template>
  <div class="mt-5">
    <p class="mb-10 text-md leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>
<script setup>
const props = defineProps({
  description: String,
});
</script>
