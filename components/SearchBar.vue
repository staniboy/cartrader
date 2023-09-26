<template>
  <Form
    v-slot="{ errors }"
    @submit="onSubmit"
    class="relative overflow-visible w-full font-sans text-lg rounded flex justify-between overflow-hidden drop-shadow-md mx-auto h-11"
  >
    <div class="flex flex-row w-full">
      <Field
        v-model="searchTerm"
        autocomplete="off"
        name="search"
        as="input"
        type="search"
        class="py-3 px-5 w-full focus:outline-none rounded-s"
        :class="
          errors.search
            ? 'placeholder:text-red-400 font-semibold bg-red-100'
            : ''
        "
        :placeholder="
          errors.search ? 'Please enter the city' : 'Search by city'
        "
        :rules="validation"
        :validateOnBlur="false"
        :validateOnChange="false"
        :validateOnInput="true"
        @focus="showSuggestions = true"
        @blur="showSuggestions = false"
      />
      <button
        type="submit"
        class="bg-sky-500 hover:bg-sky-600 px-5 text-white font-bold rounded-r"
      >
        Find
      </button>
    </div>
    <ul
      v-if="citiesSuggestions.length && showSuggestions"
      class="absolute p-1 top-12 bg-white text-left rounded z-0 w-full"
    >
      <li
        v-for="city in citiesSuggestions"
        :key="city"
        @mousedown="onSelectCity(city)"
        class="px-2 py-1 hover:bg-sky-500 hover:text-white rounded cursor-pointer"
      >
        {{ city }}
      </li>
    </ul>
  </Form>
</template>
<script setup>
import { string } from "yup";

const { data: citiesData } = await useCities();
let searchTerm = ref("");
const showSuggestions = ref(false);
const citiesSuggestions = computed(() => {
  let matches = 0;

  return citiesData.value.filter((city) => {
    if (
      city.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
      matches < 10
    ) {
      matches++;
      return city;
    }
  });
});

const validation = string().required();

const onSelectCity = (city) => {
  showSuggestions.value = false;
  searchTerm.value = city;
};

const onSubmit = (values) => {
  navigateTo(`/city/${values.search}/car`);
};
</script>
