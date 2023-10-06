<template>
  <h1 class="text-4xl">Add New Listing</h1>
  <ClientOnly>
    <Form @submit="onSubmit" v-slot="{ isSubmitting }">
      <div class="flex flex-col gap-3 py-4">
        <FormDynamicFields :fields="dynamicFields" />
        <FormImagePicker :rules="validationSchema.fields.image" name="images" />
        <button
          type="submit"
          :disabled="isSubmitting"
          class="rounded-md p-2 bg-gray-200 hover:bg-sky-500 hover:text-white font-semibold"
        >
          Submit
        </button>
        <button
          type="reset"
          :disabled="isSubmitting"
          class="rounded-md p-2 bg-gray-200 hover:bg-sky-500 hover:text-white font-semibold"
        >
          Reset
        </button>
      </div>
      <Spinner v-if="isSubmitting" />
    </Form>
  </ClientOnly>
</template>
<script setup>
const supabase = useSupabaseClient();
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

const onSubmit = async (values) => {
  const imgPaths = [];
  for (const image of values.images) {
    // Upload image
    const fileName = Math.floor(Math.random() * 100000000);

    const { data, error } = await supabase.storage
      .from("images")
      .upload("public/" + fileName, image);

    if (error) {
      alert(error);
    }
    imgPaths.push(data.path);
  }

  // Fetch
  await $fetch("/api/car/listings", {
    method: "post",
    body: {
      ...values,
      userId: useSupabaseUser().value.id,
      images: imgPaths,
    },
  })
    .catch((error) => {
      //TODO: Implement error catch
      alert(error);
      for (const path of imgPaths) {
        supabase.storage.from("images").remove(path);
      }
    })
    .then(() => {
      navigateTo("/profile/listings");
    });
};
</script>
