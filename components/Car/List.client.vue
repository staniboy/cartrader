<template>
  <div class="w-full flex flex-col gap-3">
    <CarCard v-for="car in cars" :key="car.id" :car="car">
      <img
        :src="favStorage.includes(car.id) ? favChecked : favUnchecked"
        class="w-5 h-5 cursor-pointer"
        alt=""
        @click="handleFav(car.id)"
      />
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
