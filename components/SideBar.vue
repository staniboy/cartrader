<template>
  <div
    class="bg-white sticky top-20 shadow border flex flex-col shrink-0 justify-between sm:max-lg:flex-row min-w-0 min-w-[280px] min-h-[68px] h-full divide-y sm:max-lg:divide-y-0 z-40"
  >
    <div v-if="!modal.price" class="basis-1/3 truncate">
      <!-- LOCATION START -->
      <div class="flex items-center p-4 justify-between gap-2 w-full h-[68px]">
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
    </div>
    <div v-if="!modal.price" class="basis-1/3">
      <!-- MAKE START -->
      <div class="flex items-center gap-2 p-4 justify-between h-[68px]">
        <h3>Make:</h3>
        <h3 class="text-blue-500 capitalize whitespace-nowrap cursor-pointer">
          <!-- TODO: Reflect current route -->
          <select
            name="cars"
            id="cars"
            @change="onChangeMake"
            v-model="selected"
          >
            <option value="all">All</option>
            <option v-for="make in makes" :value="make">
              {{ make }}
            </option>
          </select>
        </h3>
      </div>
      <!-- MAKE END -->
    </div>
    <div class="basis-1/3 grow">
      <!-- PRICE START -->
      <div
        class="flex items-center grow gap-2 p-4 justify-between min-h-[68px]"
      >
        <div v-if="!modal.price" class="flex grow justify-between">
          <div>Price:</div>
          <div
            class="text-blue-500 capitalize whitespace-nowrap cursor-pointer"
            @click="toggleModal('price')"
          >
            {{ priceRangeText }}
          </div>
        </div>
        <div v-else class="flex flex-col grow gap-2 sm:max-lg:flex-row grow">
          <div
            class="flex flex-row grow shrink-0 items-center gap-2 basis-2/5 justify-between"
          >
            <label for="min">Min:</label>
            <input
              name="min"
              class="border p-1 rounded sm:max-lg:w-full"
              type="number"
              placeholder="Min"
              min="0"
              v-model="priceRange.min"
            />
          </div>
          <div
            class="flex flex-row shrink-0 items-center gap-2 basis-2/5 justify-between"
          >
            <label for="max">Max:</label>
            <input
              name="max"
              class="border p-1 rounded sm:max-lg:w-full"
              type="number"
              placeholder="Max"
              min="0"
              v-model="priceRange.max"
            />
          </div>
          <button
            class="bg-blue-400 w-full rounded text-white p-1 basis-1/5"
            @click="onChangePrice"
          >
            Apply
          </button>
        </div>
      </div>
      <!-- PRICE END -->
    </div>
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
