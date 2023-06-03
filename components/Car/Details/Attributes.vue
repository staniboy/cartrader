<template>
  <div class="mt-5 border-b pb-5">
    <div class="flex text-lg mt-2" v-for="feature in features" :key="feature">
      <p class="rounded text-black mr-3">✓</p>
      <p>{{ feature }}</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  features: Array,
});
</script>
