<template>
  <div>
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import OrganismFormStep1 from "./components/v1/organism/form-steps/OrganismFormStep1.vue";
import OrganismFormStep2 from "./components/v1/organism/form-steps/OrganismFormStep2.vue";
import OrganismFormStep3 from "./components/v1/organism/form-steps/OrganismFormStep3.vue";
import OrganismFormStep4 from "./components/v1/organism/form-steps/OrganismFormStep4.vue";
import useRegister from "@/composables/useRegister";

const { getStep, getDataByStep } = useRegister();

const step = computed(() => {
  return getStep();
});

const currentComponent = computed(() => {
  const components = {
    1: OrganismFormStep1,
    2: OrganismFormStep2,
    3: OrganismFormStep3,
    4: OrganismFormStep4,
  };
  return components[step.value];
});
</script>

<style scoped></style>
