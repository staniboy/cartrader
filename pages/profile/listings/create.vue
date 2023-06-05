<template>
  <h1 class="text-4xl">Add New Listing</h1>
  <ClientOnly>
    <Form @submit="onSubmit">
      <div class="flex flex-col gap-3 py-4">
        <FormDynamicFields :fields="dynamicFields" />
        <FormImagePicker :rules="validationSchema.fields.image" name="image" />
        <button
          type="submit"
          class="rounded-md p-2 bg-gray-200 hover:bg-sky-500 hover:text-white font-semibold"
        >
          Submit
        </button>
        <button
          type="reset"
          class="rounded-md p-2 bg-gray-200 hover:bg-sky-500 hover:text-white font-semibold"
        >
          Reset
        </button>
      </div>
    </Form>
  </ClientOnly>
</template>
<script setup>
const { makes } = useCars();

const { listing: validationSchema, currentYear } = useValidation();
const dynamicFields = [
  {
    label: "Make *",
    name: "make",
    as: "select",
    children: makes.map((make) => {
      return { tag: "option", value: make, text: make };
    }),
    rules: validationSchema.fields.make,
  },
  {
    label: "Model *",
    name: "model",
    as: "input",
    placeholder: "Car's Model",
    rules: validationSchema.fields.model,
  },
  {
    label: "Price *",
    name: "price",
    as: "input",
    type: "number",
    min: "0",
    placeholder: "ex. 150000",
    rules: validationSchema.fields.price,
  },
  {
    label: "Year *",
    name: "year",
    as: "input",
    type: "number",
    min: "1900",
    max: currentYear,
    placeholder: "ex. 2000",
    rules: validationSchema.fields.year,
  },
  {
    label: "Miles *",
    name: "miles",
    as: "input",
    type: "number",
    placeholder: "ex. 20000",
    min: "0",
    rules: validationSchema.fields.miles,
  },
  {
    label: "City *",
    name: "city",
    as: "input",
    placeholder: "ex. Los Angeles",
    rules: validationSchema.fields.city,
  },
  {
    label: "Number of seats *",
    name: "seats",
    as: "input",
    type: "number",
    placeholder: "ex. 4",
    min: "1",
    max: "20",
    rules: validationSchema.fields.seats,
  },
  {
    label: "Features",
    name: "features",
    as: "input",
    rulese: validationSchema.fields.features,
  },
  {
    label: "Description *",
    name: "description",
    as: "textarea",
    rules: validationSchema.fields.description,
  },
];

const onSubmit = async (values, actions) => {
  await $fetch("/api/car/listings", {
    method: "post",
    body: {
      ...values,
      userId: useSupabaseUser().value.id,
      image: values.image,
    },
  })
    .catch((err) => {
      //TODO: Implement error catch
    })
    .then(() => {
      navigateTo("/profile/listings");
    });
};
</script>
