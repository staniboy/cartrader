<template>
  <div class="relative flex overflow-hidden select-none rounded">
    <div
      class="m-2 px-2 py-1 absolute text-white font-bold text-sm bg-black rounded opacity-75"
    >
      {{ imgIndex + 1 }} / {{ images.length }}
    </div>

    <Icon
      @click="imgIndex > 0 ? imgIndex-- : (imgIndex = images.length - 1)"
      class="m-2 absolute top-1/2 left-0 transform -translate-y-1/2 rounded-full opacity-50 hover:opacity-100"
      name="material-symbols:arrow-circle-left-rounded"
      color="black"
      size="3em"
    />

    <Icon
      @click="imgIndex < images.length - 1 ? imgIndex++ : (imgIndex = 0)"
      class="m-2 absolute top-1/2 right-0 transform -translate-y-1/2 rounded-full opacity-50 hover:opacity-100"
      name="material-symbols:arrow-circle-right-rounded"
      color="black"
      size="3em"
    />
    <NuxtImg
      class="w-full"
      :src="`${config.public.supabase.url}/storage/v1/object/public/images/${images[imgIndex]}`"
    />
  </div>
</template>
<script setup>
const config = useRuntimeConfig();
const props = defineProps({
  images: Array,
});
const imgIndex = ref(0);
</script>
