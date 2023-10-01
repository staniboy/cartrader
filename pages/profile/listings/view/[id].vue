<template>
  <!-- TODO: Display "there is no messages if there is no messages" -->
  <Card v-for="message in messages" class="p-4 flex flex-col gap-4">
    <div class="text-xl">{{ message.name }}</div>
    <div>{{ message.message }}</div>

    <div class="flex flex-row gap-4">
      <a
        :href="`mailto: ${message.email}`"
        class="text-green-700 text-sm cursor-pointer"
        >{{ message.email }}</a
      >
      <a
        :href="`tel:${message.phone}`"
        class="text-blue-700 text-sm cursor-pointer"
        >{{ message.phone }}</a
      >
    </div>
  </Card>
</template>
<script setup>
const route = useRoute();
const { data: messages } = useFetch(
  `/api/car/listings/${route.params.id}/message`
);
</script>
