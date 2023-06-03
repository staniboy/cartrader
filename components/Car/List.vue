<template>
  <div class="w-full">
    <CarCard v-for="car in cars" :key="car.id" :car="car">
      <ClientOnly>
        <img
          :src="favStorage.includes(car.id) ? favChecked : favUnchecked"
          class="w-5 h-5 cursor-pointer"
          alt=""
          @click="handleFav(car.id)"
        />
        <template #fallback>
          <img
            src="@/assets/heartOutline.png"
            class="w-5 h-5 cursor-pointer"
            alt=""
          />
        </template>
      </ClientOnly>
    </CarCard>
  </div>
</template>
<script setup>
import favChecked from "@/assets/heartFilled.png";
import favUnchecked from "@/assets/heartOutline.png";

const props = defineProps({
  cars: Array,
});

const favStorage = useLocalStorage("favs", []);
const handleFav = (id) => {
  if (favStorage.value.includes(id)) {
    const index = favStorage.value.indexOf(id);
    favStorage.value.splice(index, 1);
  } else {
    favStorage.value.push(id);
  }
};
</script>
