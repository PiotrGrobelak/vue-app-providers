<template>
  <div class="about">
    <ErrorProvider layout="ERROR_COMPONENT">
      <h1>This is an about page</h1>
      <TestComponent :data="faliMockedData" />
    </ErrorProvider>
  </div>
</template>

<script setup lang="ts">
import ErrorProvider from "@/services/ErrorProvider/ErrorProvider.vue";
import TestComponent from "@/components/TestComponent.vue";

const passMockedData = [
  {
    id: 34,
    description: "Some string",
  },
];

const faliMockedData = [
  {
    id: undefined,
    description: "Some string",
  },
];
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
