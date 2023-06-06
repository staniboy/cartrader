<template>
  <div class="flex flex-col gap-2">
    <label :for="name" class="text-sm font-semibold">{{ label }}</label>
    <input
      :name="name"
      :id="name"
      type="file"
      accept="image/*"
      @change="onImageChange"
      @blur="handleBlur"
    />
    <span class="text-red-700 text-sm font-bold" v-show="errorMessage">{{
      errorMessage
    }}</span>
    <div v-if="image.preview">
      <img class="border p-4 w-60" :src="image.preview" alt="image preview" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "image",
  },
  label: {
    type: String,
    default: "Image *",
  },
  rules: {
    type: Object,
  },
});

const name = toRef(props, "name");
const { value, errorMessage, handleBlur, handleChange } = useField(
  () => props.name,
  props.rules
);

const image = useState("carImage", () => ({
  preview: null,
  file: null,
}));

const clearImage = () => {
  image.value.file = null;
  image.value.preview = null;
};

const onImageChange = (event) => {
  const input = event.target;
  if (input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      image.value.preview = reader.result;
    };
    reader.readAsDataURL(file);
    image.value.file = file; // Store the file object directly
    handleChange(file, true); // Update the field's value with the file object
  } else {
    clearImage();
    handleChange(null, true); // Update the field's value with null when no file is selected
  }
};

watch(value, (newValue) => {
  if (!newValue) {
    clearImage();
  }
});
</script>
