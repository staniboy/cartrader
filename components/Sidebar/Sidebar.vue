<template>
  <card
    class="h-full sticky top-20 w-min-0 lg:w-[280px] flex flex-col shrink-0 sm:max-lg:flex-row divide-y sm:max-lg:divide-y-0"
  >
    <!-- Location -->
    <sidebar-item v-if="!modal.price" :title="'Location: '">
      <div
        class="truncate"
        v-if="!modal.location"
        @click="toggleModal('location')"
      >
        {{ route.params.city }}
      </div>
      <input
        v-else
        ref="locationInput"
        type="text"
        class="border p-1 rounded w-full text-black"
        @keyup.enter="onChangeLocation"
        @blur="toggleModal('location')"
      />
    </sidebar-item>
    <!-- Make -->
    <sidebar-item v-if="!modal.price" :title="'Make: '">
      <!-- TODO: Reflect current route -->
      <select name="cars" id="cars" @change="onChangeMake" v-model="selected">
        <option value="all">All</option>
        <option v-for="make in makes" :value="make">
          {{ make }}
        </option>
      </select>
    </sidebar-item>
    <sidebar-item v-if="!modal.price" :title="'Price: '">
      <div @click="toggleModal('price')">
        {{ priceRangeText }}
      </div>
    </sidebar-item>
    <div v-else class="flex flex-col grow gap-2 sm:max-lg:flex-row grow p-4">
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
  </card>
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
