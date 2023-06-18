<template>
  <CarList v-show="cars && cars.length" :cars="cars" />
  <div v-show="!cars || !cars.length" class="text-sm">No cars were found</div>
</template>
<script setup>
const route = useRoute();
const maxPrice = computed(() => route.query.maxPrice);
const minPrice = computed(() => route.query.minPrice);
const { data: cars, refresh } = await useFetchCars(route.params.city, {
  minPrice,
  maxPrice,
  make: route.params.make,
});

watch(
  () => route.query,
  () => refresh()
);
</script>
