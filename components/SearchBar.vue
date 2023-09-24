<template>
  <Form
    v-slot="{ errors }"
    @submit="onSubmit"
    class="w-full font-sans text-lg rounded-full flex justify-between overflow-hidden drop-shadow-md mx-auto h-11"
  >
    <Field
      name="search"
      as="input"
      type="text"
      class="py-3 px-5 w-full focus:outline-none rounded-s-full"
      :class="
        errors.search ? 'placeholder:text-red-400 font-semibold bg-red-100' : ''
      "
      :placeholder="errors.search ? 'Please enter the city' : 'Search by city'"
      :rules="validation"
      :validateOnBlur="false"
      :validateOnChange="false"
      :validateOnInput="true"
    />
    <button
      type="submit"
      class="bg-sky-600 hover:bg-sky-700 px-10 text-white font-bold"
    >
      Search
    </button>
  </Form>
</template>
<script setup>
import { string } from "yup";
const validation = string().required();

const onSubmit = (values) => {
  navigateTo(`/city/${values.search}/car`);
};
</script>
