<template>
  <GenericCard>
    <template v-slot:title>John Smith</template>
    <template v-slot:content
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet omnis
      culpa soluta ducimus, repellat quod maxime quis cum rem consequuntur
      repudiandae, saepe mollitia velit numquam nostrum voluptatibus suscipit
      quam provident.
    </template>
    <template v-slot:footer>
      <div class="flex flex-row gap-4">
        <p class="text-green-700 text-sm cursor-pointer">johnsmith@gmail.com</p>
        <p class="text-blue-700 text-sm cursor-pointer">555-555-5555</p>
      </div>
    </template>
  </GenericCard>
</template>
<script setup></script>
