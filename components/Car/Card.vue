<template>
  <GenericCard>
    <template v-slot:image>
      <NuxtImg
        :src="`${config.public.supabase.url}/storage/v1/object/public/images/${car.image}`"
        class="w-max md:w-[300px] h-full cursor-pointer"
        @click="navigateTo(`/car/${car.make} ${car.model}/${car.id}`)"
      />
    </template>
    <template v-slot:title>
      <span
        class="cursor-pointer text-blue-700"
        @click="navigateTo(`/car/${car.make} ${car.model}/${car.id}`)"
      >
        {{ car.make }} {{ car.model }}
      </span>
    </template>
    <template v-slot:content>
      <span class="line-clamp-3">{{ car.description }}</span>
    </template>
    <template v-slot:append>
      <slot></slot>
    </template>
    <template v-slot:footer>
      <h1 class="mt-auto text-xl">${{ car.price }}</h1>
    </template>
  </GenericCard>
</template>
<script setup>
const config = useRuntimeConfig();
const props = defineProps({
  car: Object,
  favState: Boolean,
});
</script>
