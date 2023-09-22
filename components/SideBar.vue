<template>
  <div
    class="sticky top-20 shadow border flex shrink-0 flex-col max-sm:h-[64px] sm:max-lg:flex-row md:max-lg:justify-start w-full divide-y sm:max-lg:divide-y-0 z-40 h-max bg-white min-w-0"
  >
    <!-- LOCATION START -->
    <div
      class="flex h-[64px] items-center p-4 justify-between flex gap-2 w-full basis-1/3"
    >
      <h3>Location:</h3>
      <div
        v-if="!modal.location"
        class="text-blue-500 capitalize cursor-pointer truncate"
        @click="toggleModal('location')"
      >
        {{ route.params.city }}
      </div>
      <input
        v-else
        ref="locationInput"
        type="text"
        class="border p-1 rounded w-full"
        @keyup.enter="onChangeLocation"
        @blur="toggleModal('location')"
      />
    </div>
    <!-- LOCATION END -->
    <!-- MAKE START -->
    <div class="flex h-[64px] items-center gap-2 p-4 justify-between basis-1/3">
      <h3>Make:</h3>
      <h3 class="text-blue-500 capitalize whitespace-nowrap cursor-pointer">
        <!-- TODO: Reflect current route -->
        <select name="cars" id="cars" @change="onChangeMake" v-model="selected">
          <option value="all">All</option>
          <option v-for="make in makes" :value="make">
            {{ make }}
          </option>
        </select>
      </h3>
    </div>
    <!-- MAKE END -->
    <!-- PRICE START -->
    <div
      class="relative flex h-[64px] items-center flex gap-2 p-4 justify-between basis-1/3"
    >
      <h3>Price:</h3>
      <h3
        class="text-blue-500 capitalize whitespace-nowrap cursor-pointer"
        @click="toggleModal('price')"
      >
        {{ priceRangeText }}
      </h3>
      <div
        v-if="modal.price"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white flex flex-col gap-2 z-50"
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
const { makes } = useCars();
const selected = ref(route.params.make || "all");
const priceRange = ref({
  min: 0,
  max: 0,
});
const locationInput = ref();
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
  if (key === "location" && modal.value[key]) {
    console.log(locationInput.value);
    nextTick(() => locationInput.value.focus());
  }
};

const onChangeLocation = (e) => {
  const city = e.target.value;
  if (!city) return;
  if (!isNaN(parseInt(city))) {
    throw createError({
      statusCode: 400,
      message: "Invalid city",
    });
  }
  router.push({
    params: {
      city: city,
      make: route.params.make,
    },
    query: route.query,
  });
};
const onChangeMake = (e) => {
  const make = e.target.value;
  if (make === "all") {
    router.push({ path: `/city/${route.params.city}/car/` });
  } else {
    router.push({
      params: {
        city: route.params.city,
        make: make,
      },
      query: route.query,
    });
  }
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
