<template>
  <!-- TODO: Display "there is no new messages if there is no messages" -->
  <GenericCard v-for="message in messages">
    <template v-slot:title>{{ message.name }}</template>
    <template v-slot:content> {{ message.message }} </template>
    <template v-slot:footer>
      <div class="flex flex-row gap-4">
        <!-- TODO: Make links interactive -->
        <p class="text-green-700 text-sm cursor-pointer">{{ message.email }}</p>
        <p class="text-blue-700 text-sm cursor-pointer">{{ message.phone }}</p>
      </div>
    </template>
  </GenericCard>
</template>
<script setup>
const route = useRoute();
const { data: messages } = useFetch(
  `/api/car/listings/${route.params.id}/message`
);
</script>
