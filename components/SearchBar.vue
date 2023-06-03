<template>
  <div
    class="w-4/5 font-sans text-lg rounded-full flex justify-between overflow-hidden drop-shadow-md mx-auto h-11"
  >
    <input
      type="text"
      class="py-3 px-5 w-full focus:outline-none rounded-s-full"
      :class="cityError ? 'border-red-500 border' : ''"
      placeholder="Search by city..."
      v-model="city"
    />
    <button
      class="bg-sky-600 hover:bg-sky-700 px-10 text-white font-bold"
      @click="handleSearch"
    >
      Search
    </button>
  </div>
</template>
<script setup>
const city = ref("");
const cityError = ref(false);
const handleSearch = () => {
  if (!city.value) {
    cityError.value = true;
    return;
  }
  navigateTo(`/city/${city.value}/car`);
};
</script>
