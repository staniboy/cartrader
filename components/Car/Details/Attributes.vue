<template>
  <div class="mt-5 border-b pb-5">
    <!-- TODO: Add "no features listed" -->
    <div class="flex text-md mt-2" v-for="feature in features" :key="feature">
      <p class="rounded mr-3">✓</p>
      <p>{{ feature }}</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  features: Array,
});
</script>
