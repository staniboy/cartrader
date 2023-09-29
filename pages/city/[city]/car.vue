<template>
  <NuxtErrorBoundary>
    <div class="flex flex-col lg:flex-row gap-5">
      <Sidebar class="basis-1/4 flex grow-0" />
      <NuxtPage class="basis-3/4" />
    </div>
    <template #error="{ error }">
      <div class="text-center mx-auto flex flex-col gap-4">
        <h1 class="text-4xl">Sorry something went wrong...</h1>
        <code>{{ error }}</code>
        <button
          class="text-white bg-blue-400 px-10 py-3 rounded"
          @click="error.value = null"
        >
          Go Back
        </button>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>
<script setup>
const { toTitleCase } = useUtils();
const route = useRoute();
const cityName = toTitleCase(route.params.city);
const make = route.params.make ? route.params.make : "Cars";

useHead({
  title: `${make} in ${cityName}`,
});
</script>
