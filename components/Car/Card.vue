<template>
  <Card class="md:h-[200px]">
    <div class="flex flex-col md:flex-row h-full">
      <!-- Image -->
      <div class="min-w-[300px]">
        <NuxtImg
          class="w-full h-full object-cover"
          :src="`${config.public.supabase.url}/storage/v1/object/public/images/${car.image}`"
          @click="navigateTo(`/car/${car.make} ${car.model}/${car.id}`)"
        />
      </div>
      <!-- Content -->
      <div class="p-4 flex flex-col gap-2 justify-between">
        <div class="flex flex-row justify-between">
          <div
            class="cursor-pointer text-blue-700 text-2xl"
            @click="navigateTo(`/car/${car.make} ${car.model}/${car.id}`)"
          >
            {{ car.make }} {{ car.model }}
          </div>
          <slot></slot>
        </div>
        <div class="line-clamp-3">{{ car.description }}</div>
        <div class="text-xl">${{ car.price }}</div>
      </div>
    </div>
  </Card>
</template>
<script setup>
const config = useRuntimeConfig();
const props = defineProps({
  car: Object,
  favState: Boolean,
});
</script>
