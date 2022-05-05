<template>
  <main>
    <ErrorBoundary> <TheWelcome /></ErrorBoundary>
  </main>
</template>

<script setup lang="ts">
import TheWelcome from "@/components/TheWelcome.vue";
import ErrorBoundary from "@/services/ErrorBoundary";
import type { ComponentPublicInstance } from "vue";

type ErrorType = {
  error: Error;
  instance: ComponentPublicInstance | null;
  info: any;
};

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
