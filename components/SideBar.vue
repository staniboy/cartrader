<template>
  <div
    class="sticky top-20 shadow border flex flex-col sm:max-lg:flex-row md:max-lg:justify-start lg:w-72 divide-y sm:max-lg:divide-y-0 z-40 h-max bg-white"
  >
    <!-- LOCATION START -->
    <div class="relative flex gap-2 p-4 justify-between">
      <h3>Location:</h3>
      <h3
        class="text-blue-500 capitalize whitespace-nowrap cursor-pointer"
        @click="toggleModal('location')"
      >
        {{ route.params.city }}
      </h3>
      <div
        v-if="modal.location"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
      >
        <input type="text" class="border p-1 rounded" v-model="city" />
        <button
          class="bg-blue-500 w-full mt-2 rounded text-white p-1"
          @click="onChangeLocation"
        >
          Apply
        </button>
      </div>
    </div>
    <!-- LOCATION END -->
    <!-- MAKE START -->
    <div class="relative flex gap-2 p-4 justify-between">
      <h3>Make:</h3>
      <h3
        class="text-blue-500 capitalize whitespace-nowrap cursor-pointer"
        @click="toggleModal('make')"
      >
        {{ route.params.make || "Any" }}
      </h3>
      <div
        v-if="modal.make"
        class="absolute border shadow left-56 p-5 top-1 -m-1 w-[600px] flex justify-between flex-wrap bg-white"
      >
        <h4
          v-for="make in makes"
          :key="make"
          class="w-1/3 text-blue-500 cursor-pointer"
          @click="onChangeMake(make)"
        >
          {{ make }}
        </h4>
      </div>
    </div>
    <!-- MAKE END -->
    <!-- PRICE START -->
    <div class="relative flex gap-2 p-4 justify-between">
      <h3>Price:</h3>
      <h3
        class="text-blue-500 capitalize whitespace-nowrap cursor-pointer"
        @click="toggleModal('price')"
      >
        {{ priceRangeText }}
      </h3>
      <div
        v-if="modal.price"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white flex flex-col gap-2"
      >
        <input
          class="border p-1 rounded"
          type="number"
          placeholder="Min"
          min="0"
          v-model="priceRange.min"
        />
        <input
          class="border p-1 rounded"
          type="number"
          placeholder="Max"
          min="0"
          v-model="priceRange.max"
        />
        <button
          class="bg-blue-400 w-full rounded text-white p-1"
          @click="onChangePrice"
        >
          Apply
        </button>
      </div>
    </div>
    <!-- PRICE END -->
  </div>
</template>
<script setup>
const route = useRoute();
const router = useRouter();
const city = ref("");
const { makes } = useCars();
const priceRange = ref({
  min: 0,
  max: 0,
});
const priceRangeText = computed(() => {
  const minPrice = route.query.minPrice;
  const maxPrice = route.query.maxPrice;

  if (!minPrice && !maxPrice) return "Any";
  else if (!minPrice && maxPrice) return `< $${maxPrice}`;
  else if (minPrice && !maxPrice) return `> $${minPrice}`;
  else return `$${minPrice}-$${maxPrice}`;
});
const modal = ref({
  location: false,
  make: false,
  price: false,
});

const toggleModal = (key) => {
  modal.value[key] = !modal.value[key];
};

const onChangeLocation = () => {
  if (!city.value) return;
  if (!isNaN(parseInt(city.value))) {
    throw createError({
      statusCode: 400,
      message: "Invalid city",
    });
  }
  router.push({
    params: {
      city: city.value,
      make: route.params.make,
    },
    query: route.query,
  });
  city.value = "";
};
const onChangeMake = (make) => {
  toggleModal("make");
  router.push({
    params: {
      city: route.params.city,
      make: make,
    },
    query: route.query,
  });
};
const onChangePrice = () => {
  toggleModal("price");
  if (priceRange.value.min && priceRange.value.max) {
    if (priceRange.value.min > priceRange.value.max) return;
    else {
      router.push({
        query: {
          minPrice: priceRange.value.min,
          maxPrice: priceRange.value.max,
        },
      });
    }
  } else if (priceRange.value.min && !priceRange.value.max) {
    router.push({
      query: {
        minPrice: priceRange.value.min,
      },
    });
  } else if (!priceRange.value.min && priceRange.value.max) {
    router.push({
      query: {
        maxPrice: priceRange.value.max,
      },
    });
  } else {
    router.push({
      query: {},
    });
  }
};
</script>
