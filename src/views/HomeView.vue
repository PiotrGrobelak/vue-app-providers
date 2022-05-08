<template>
  <main>
    <ErrorBoundary>
      <TestComponent :shouldManualFail="false" :data="datas"
    /></ErrorBoundary>
  </main>
</template>

<script setup lang="ts">
import ErrorBoundary from "@/services/ErrorBoundary";
import TestComponent from "@/components/TestComponent.vue";

const datas = [
  {
    someString: "dsadas",
    someId: 43,
  },
];

// const handleError = (err: ErrorType) => {
//   console.log("Error obj", err);
//   console.log("Error message ====>", err.error.message);
//   console.log("Error stack ====>", err.error.stack);
//   console.log(
//     "Error instance ====>",
//     err.instance && err.instance.$.type.__file
//   );
//
//   console.log("Error info ====>", err.info.value);
// };
</script>
