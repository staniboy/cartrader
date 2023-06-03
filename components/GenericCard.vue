<template>
  <div class="relative shadow border w-full overflow-hidden mb-5 lg:h-[200px]">
    <div class="flex flex-col md:flex-row w-full h-full">
      <!-- Card Image Slot -->
      <slot name="image"></slot>

      <div class="p-4 w-full flex flex-col">
        <div>
          <div class="flex items-center justify-between mb-5">
            <!-- Card Title -->
            <h1 class="text-2xl">
              <slot name="title"></slot>
            </h1>
            <div class="flex flex-row gap-3">
              <!-- Card Title Append -->
              <slot name="append"></slot>
            </div>
          </div>
          <p class="text-gray-700">
            <!-- Card Content -->
            <slot name="content"></slot>
          </p>
        </div>
        <h1 class="mt-auto text-xl">
          <!-- Card Price Slot -->
          <slot name="footer"></slot>
        </h1>
      </div>
    </div>
  </div>
</template>
