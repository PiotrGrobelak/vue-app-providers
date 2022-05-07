<template>
  <div class="about">
    <ErrorProvider layout="ERROR_COMPONENT">
      <h1>This is an about page</h1>
      <TheWelcome />
    </ErrorProvider>
  </div>
</template>

<script setup lang="ts">
import ErrorProvider from "@/services/ErrorProvider/ErrorProvider.vue";
import TheWelcome from "@/components/TheWelcome.vue";
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
