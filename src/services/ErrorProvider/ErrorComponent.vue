<template>
  <div>Error component</div>
  <button type="button" @click="handleReload">Okm try to reload</button>
  <div>
    {{ renderError }}
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import type { ComputedRef } from "vue";
import { useRouter } from "vue-router";
import { ErrorStateSymbol } from "@/services/ErrorProvider";
import type { ErrorState } from "@/services/ErrorProvider/ErrorProvider.model";

const getError = inject(ErrorStateSymbol) as ErrorState;

const router = useRouter();

const handleReload = () => {
  router.go(0);
};

const renderError: ComputedRef<any> = computed(() => {
  if (getError) {
    return {
      getError,
    };
  }
  return null;
});
</script>
