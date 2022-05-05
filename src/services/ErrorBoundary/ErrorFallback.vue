<template>
  <div>
    <div>Error fallback with</div>
    <button type="button" @click="handleReload">Ok reload</button>
    <h2>err content</h2>
    <div v-if="renderError">
      <span class="m">message: {{ renderError.message }} </span>
      <br />
      <span class="m">stack: {{ renderError.stack }} </span>
      <br />
      <span class="m">instance: {{ renderError.instance }} </span>
      <br />
      <span class="m">info: {{ renderError.info }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import useError from "@/composables/useError";
import type { ErrorType } from "@/composables/useError";
import type { ComputedRef } from "vue";
import { computed } from "vue";

const router = useRouter();

const handleReload = () => {
  router.go(0);
};

const renderError: ComputedRef<any> = computed(() => {
  const error = useError().getError();

  if (error) {
    return {
      message: error.error.message,
      stack: error.error.stack,
      instance: error.instance && error.instance.$.type.__file,
      info: error.info,
    };
  }
  return null;
});
</script>

<style lang="css">
.m {
  display: block;
  margin-bottom: 50px;
}
</style>
