<template>
  <div
    class="flex flex-col gap-2"
    v-for="{ label, name, as, children, event, func, ...attrs } in props.fields"
    :key="name"
  >
    <label :for="name" class="text-sm font-semibold">{{ label }}</label>
    <Field
      :as="as"
      :id="name"
      :name="name"
      v-bind="attrs"
      v-on:[event]="func"
      class="bg-gray-100 rounded-md border-solid border-gray-200 border w-full p-2"
    >
      <template v-if="children && children.length">
        <component
          v-for="({ tag, text, ...childAttrs }, idx) in children"
          :key="idx"
          :is="tag"
          v-bind="childAttrs"
        >
          {{ text }}
        </component>
      </template>
    </Field>
    <ErrorMessage
      as="span"
      :name="name"
      class="text-red-700 text-sm font-bold"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  fields: Object,
});
</script>
