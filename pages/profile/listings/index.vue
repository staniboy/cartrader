<template>
  <!-- Modal -->
  <modal class="backdrop:bg-black" ref="confirmModal">
    <div class="flex flex-col gap-4">
      <div class="text-md">Are you sure you want to delete this listing?</div>
      <div class="flex gap-2 justify-end">
        <app-button autofocus @click="hideModal">Cancel</app-button>
        <app-button @click="deleteListing(listingId)">Delete</app-button>
      </div>
    </div>
  </modal>
  <!-- Modal End -->
  <div class="flex items-center gap-4 justify-between py-4">
    <div class="text-4xl">My Listings</div>
    <app-button>
      <nuxt-link to="/profile/listings/create">Add</nuxt-link>
    </app-button>
  </div>
  <div class="flex flex-col gap-2">
    <ClientOnly>
      <Card v-for="listing in listings" class="h-[100px]">
        <div class="flex justify-between">
          <!-- Image -->
          <NuxtImg
            class="grow-0 h-[100px] object-cover"
            :src="`${config.public.supabase.url}/storage/v1/object/public/images/${listing.images[0]}`"
            @click="
              navigateTo(`/car/${listing.make} ${listing.model}/${listing.id}`)
            "
          />
          <!-- Content -->
          <div class="flex grow justify-between items-center p-6">
            <div>
              <!-- Title -->
              <div class="text-xl">
                {{ `${listing.make} ${listing.model}` }}
              </div>
              <!-- Price -->
              <div class="text-md">{{ `$${listing.price}` }}</div>
            </div>
            <div class="flex flex-col">
              <nuxt-link
                class="text-blue-400"
                :to="`/profile/listings/view/${listing.id}`"
                >Messages
              </nuxt-link>
              <p
                class="text-red-400 cursor-pointer"
                @click="showModal(listing.id)"
              >
                Delete
              </p>
            </div>
          </div>
        </div>
      </Card>
    </ClientOnly>
  </div>
</template>
<script setup>
// TODO: Add delete confirmation
const confirmModal = ref();
const listingId = ref();
const user = useSupabaseUser();
const config = useRuntimeConfig();
const { data: listings } = await useFetch(
  `/api/car/listings/user/${user.value.id}`,
  { method: "GET" }
);
const hideModal = () => confirmModal.value.hide();
const showModal = (id) => {
  listingId.value = id;
  confirmModal.value.show();
};

const deleteListing = async (id) => {
  await $fetch(`/api/car/listings/${id}`, { method: "DELETE" });
  listings.value = listings.value.filter((listing) => listing.id !== id);
  confirmModal.value.hide();
};
</script>
