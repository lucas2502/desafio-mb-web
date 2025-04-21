<template>
  <div class="card">
    <section class="card__header">
      <AtomLabel
        >Etapa <span class="color-primary">{{ props.step }}</span> de
        4</AtomLabel
      >
      <AtomTitle type="h2" bold>{{ props.title }}</AtomTitle>
    </section>
    <section class="card__content">
      <slot></slot>
    </section>
    <section class="card__actions">
      <template v-if="slots.actions">
        <slot name="actions"></slot>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
import AtomLabel from "../../atom/label/AtomLabel.vue";
import AtomTitle from "../../atom/title/AtomTitle.vue";
const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
const slots = useSlots();
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  width: 100vw !important;
  padding: 5vmin 10vmin;

  &__header {
    padding: 3vmin 0;
    flex-grow: 0;
  }
  &__content {
    display: flex;
    height: auto;
    flex-grow: 1;
    flex-basis: auto;
    flex-direction: column;
    gap: 8px;
  }
  &__actions {
    padding: 3vmin 0;
    flex-grow: 0;
    display: flex;
    justify-content: space-between;
  }
}

@media only screen and (max-width: 600px) {
  .card {
    width: 100vw !important;
  }
}

@media only screen and (max-width: 1024px) {
  .card {
    width: 90vw;
  }
}

@media only screen and (min-width: 1024px) {
  .card {
    padding: 10vmin 50vmin;
  }
}
</style>
