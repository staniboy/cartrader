<template>
  <!-- TODO: Display "there is no messages if there is no messages" -->
  <div
    v-if="messages && messages.length < 1"
    class="text-4xl text-gray-400 flex items-center justify-center"
  >
    There is no messages :(
  </div>
  <!-- Modal -->
  <modal class="backdrop:bg-black" ref="confirmModal">
    <div class="flex flex-col gap-4">
      <div class="text-md">Are you sure you want to delete this message?</div>
      <div class="flex gap-2 justify-end">
        <app-button autofocus @click="hideModal">Cancel</app-button>
        <app-button @click="deleteMessage(messageId)">Delete</app-button>
      </div>
    </div>
  </modal>
  <!-- Modal End -->
  <Card
    v-for="message in messages"
    class="p-3 flex flex-col divide-y text-gray-800"
  >
    <div class="text-md font-medium flex items-center justify-between mb-3">
      <div>From: {{ message.name }}</div>
      <div
        class="text-sm cursor-pointer hover:text-red-600 text-gray-400"
        @click="showModal(message.id)"
      >
        Delete
      </div>
    </div>
    <div class="py-3">{{ message.message }}</div>
    <div class="flex flex-row gap-2 pt-3 font-medium text-gray-600">
      <div class="flex gap-2 items-center hover:text-blue-600">
        <Icon name="material-symbols:mail-rounded" />
        <a :href="`mailto: ${message.email}`" class="text-sm cursor-pointer">{{
          message.email
        }}</a>
      </div>
      <div class="flex gap-2 items-center hover:text-blue-600">
        <Icon name="material-symbols:call" />
        <a :href="`tel:${message.phone}`" class="text-sm cursor-pointer">{{
          message.phone
        }}</a>
      </div>
    </div>
  </Card>
</template>
<script setup>
const route = useRoute();
const { data: messages } = await useFetch(
  `/api/car/listings/${route.params.id}/message`,
  { method: "GET" }
);

const confirmModal = ref();
const messageId = ref();
const hideModal = () => confirmModal.value.hide();
const showModal = (id) => {
  messageId.value = id;
  confirmModal.value.show();
};

const deleteMessage = async (messageId) => {
  await $fetch(`/api/message/${messageId}`, { method: "DELETE" });
  messages.value = messages.value.filter((message) => message.id !== messageId);
  hideModal();
};
</script>
