<template>
  <component
    :is="props.type"
    :class="[
      {
        'title--bold': props.bold,
      },
    ]"
    ><slot></slot
  ></component>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String, // "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    required: true,
  },
  bold: Boolean,
});
</script>

<style scoped lang="scss">
* {
  font-weight: 300;
}
.title {
  &--bold {
    font-weight: 700;
  }
}
</style>
