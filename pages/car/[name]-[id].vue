<template>
  <div>
    <CarDetailsHero :car="car" />
    <CarDetailsAttributes :features="car.features" />
    <CarDetailsDescription :description="car.description" />
    <LazyCarDetailsContactForm />
  </div>
</template>
<script setup>
const { toTitleCase } = useUtils();
const route = useRoute();

useHead({
  title: toTitleCase(route.params.name),
});

const { data: car } = await useFetchCar(route.params.id);
</script>
