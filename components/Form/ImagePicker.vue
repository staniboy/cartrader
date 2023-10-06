<template>
  <div class="flex flex-col gap-2">
    <label :for="name" class="text-sm font-semibold">{{ label }}</label>
    <input
      multiple
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
    <div v-for="image in images">
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

let images = reactive([]);

const clearImages = () => {
  images = [];
};

const onImageChange = (event) => {
  clearImages();
  const input = event.target;
  if (input.files.length > 0) {
    for (let i = 0; i < input.files.length; i++) {
      const image = {
        preview: null,
        file: null,
      };
      const file = input.files[i];
      const reader = new FileReader();
      reader.onload = async () => {
        image.preview = reader.result;
        image.file = file; // Store the file object directly
        images.push({ ...image });
        handleChange(Object.keys(input.files), true); // Update the field's value with the file object
      };
      reader.readAsDataURL(file);
    }
  } else {
    clearImages();
    handleChange(null, true); // Update the field's value with null when no file is selected
  }
};
</script>
