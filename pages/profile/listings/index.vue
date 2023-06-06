<template>
  <div class="flex justify-between items-center">
    <h1 class="text-6xl">My Listings</h1>
    <nuxt-link
      to="/profile/listings/create"
      class="flex py-2 px-4 bg-sky-600 hover:bg-sky-700 rounded-full justify-center items-center text-center text-xl text-white font-bold cursor-pointer"
      >Add</nuxt-link
    >
  </div>
  <div class="flex flex-col">
    <CarCard v-for="listing in listings" :car="listing">
      <nuxt-link
        class="text-blue-400"
        :to="`/profile/listings/view/${listing.id}`"
        >View</nuxt-link
      >
      <p class="text-red-400 cursor-pointer" @click="deleteListing(listing.id)">
        Delete
      </p>
    </CarCard>
  </div>
</template>
<script setup>
const user = useSupabaseUser();
const { data: listings } = await useFetch(
  `/api/car/listings/user/${user.value.id}`
);
const deleteListing = async (id) => {
  await $fetch(`/api/car/listings/${id}`, { method: "DELETE" });
  listings.value = listings.value.filter((listing) => listing.id !== id);
};
</script>
