<template>
  <h1 class="text-4xl">Add New Listing</h1>
  <ClientOnly>
    <Form @submit="onSubmit">
      <div class="flex flex-col gap-3 py-4">
        <DynamicFields :fields="dynamicFields" />
        <!-- Image Picker Start -->
        <div class="flex flex-col gap-2">
          <label for="image" class="text-sm font-semibold">Image *</label>
          <Field
            name="image"
            as="input"
            type="file"
            accept="image/*"
            @change="onImageChange"
            :rules="validationSchema.fields.image"
          />
          <ErrorMessage
            name="image"
            as="span"
            class="text-red-700 text-sm font-bold"
          />
          <div v-if="image.preview">
            <img
              class="border p-4 w-60"
              :src="image.preview"
              alt="image preview"
            />
          </div>
        </div>
        <!-- Image Picker End -->
        <button
          type="submit"
          class="rounded-md p-2 bg-gray-200 hover:bg-sky-500 hover:text-white font-semibold"
        >
          Submit
        </button>
      </div>
    </Form>
  </ClientOnly>
</template>
<script setup>
//TODO: Handle form after seccusesful submit
//TODO: Rewatch form vids
//TODO: Make image picker component
//TODO: Start git
const { makes } = useCars();
const image = useState("carImage", () => {
  return {
    preview: null,
    image: null,
  };
});

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

const onImageChange = (e) => {
  const input = e.target;
  if (input.files.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value.preview = e.target.result;
    };
    image.value.image = input.files[0];
    reader.readAsDataURL(input.files[0]);
  } else {
    (image.value.preview = null), (image.value.image = null);
  }
};

const onSubmit = async (values) => {
  try {
    const response = await $fetch("/api/listings", {
      method: "post",
      body: {
        ...values,
        userId: useSupabaseUser().value.id,
        image: values.image.name,
      },
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
};
</script>
