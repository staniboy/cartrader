<template>
  <div class="flex flex-col lg:w-[800px] gap-2 w-full mt-10">
    <span
      v-if="statusMessage"
      class="text-md bg-sky-500 text-white font-bold rounded-md p-4"
      >{{ statusMessage }}</span
    >
    <Form @submit="handleSubmit">
      <div class="flex max-md:flex-col w-full gap-2">
        <!-- Name -->
        <div class="flex flex-col gap-2 basis-1/3">
          <Field
            as="input"
            type="text"
            name="name"
            class="border p-1"
            placeholder="Name"
            :rules="validation.fields.name"
          />
          <ErrorMessage
            as="span"
            name="name"
            class="text-red-700 text-sm font-bold"
          />
        </div>
        <!-- Email -->
        <div class="flex flex-col gap-2 basis-1/3">
          <Field
            as="input"
            type="text"
            name="email"
            class="border p-1"
            placeholder="Email"
            :rules="validation.fields.email"
          />
          <ErrorMessage
            as="span"
            name="email"
            class="text-red-700 text-sm font-bold"
          />
        </div>

        <!-- Phone -->
        <div class="flex flex-col gap-2 basis-1/3">
          <Field
            as="input"
            type="number"
            name="phone"
            class="border p-1"
            placeholder="Phone"
            :rules="validation.fields.phone"
          />
          <ErrorMessage
            as="span"
            name="phone"
            class="text-red-700 text-sm font-bold"
          />
        </div>
      </div>
      <!-- Message -->
      <div class="flex flex-col gap-2 w-full mt-4">
        <Field
          as="textarea"
          name="message"
          class="border p-1 w-full"
          placeholder="Type your message here"
          :rules="validation.fields.message"
        />
        <ErrorMessage
          as="span"
          name="message"
          class="text-red-700 text-sm font-bold"
        />
      </div>
      <app-button class="mt-2"> Submit </app-button>
    </Form>
  </div>
</template>
<script setup>
const { message: validation } = useValidation();
const statusMessage = ref();
const route = useRoute();
const handleSubmit = async (values, { resetForm }) => {
  await $fetch(`/api/car/listings/${route.params.id}/message`, {
    method: "post",
    body: {
      ...values,
    },
  })
    .catch((err) => {
      //TODO: Implement error catch
    })
    .then(() => {
      resetForm();
      statusMessage.value = "Message Sent!";
    });
};
</script>
