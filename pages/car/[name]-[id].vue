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

// const { cars } = useCars();
// const car = computed(() =>
//   cars.find((car) => car.id === parseInt(route.params.id))
// );

// if (!car.value) {
//   throw createError({
//     statusCode: 404,
//     message: `Car with id of ${route.params.id} does not exist!`,
//   });
// }
</script>
