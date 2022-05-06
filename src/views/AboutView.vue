<template>
  <div class="about">
    <ErrorProvider layout="ERROR_PAGE">
      <h1>This is an about page</h1>
    </ErrorProvider>
  </div>
</template>

<script setup lang="ts">
import ErrorProvider from "@/services/ErrorProvider/ErrorProvider.vue";
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
