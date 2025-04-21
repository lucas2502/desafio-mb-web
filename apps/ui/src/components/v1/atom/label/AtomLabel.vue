<template>
  <label :class="['label']"><slot></slot> </label>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.label {
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
}
</style>
