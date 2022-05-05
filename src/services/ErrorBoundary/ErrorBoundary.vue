<template>
  <template v-if="!slots.boundary">
    <slot v-if="!hasError"></slot>
    <component v-else :is="props.fallBack" />
  </template>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured, useSlots } from "vue";
import type { Component, ComponentPublicInstance } from "vue";
import ErrorFallback from "./ErrorFallback.vue";
import useError from "@/composables/useError";

export interface ErrorBoundaryProps {
  fallBack?: Component;
  params?: Record<any, any>;
  stopPropagation?: boolean;
}
const props = withDefaults(defineProps<ErrorBoundaryProps>(), {
  fallBack: ErrorFallback,
  params: () => ({}),
  stopPropagation: false,
});

// const emits = defineEmits(["error-captured"]);
const hasError = ref(false);
const err = ref<Error | null>(null);
const info = ref("");
const slots = useSlots();

if (!slots.default && !slots.boundary) {
  console.warn("ErrorBoundary component must have child components.");
}

onErrorCaptured(
  (
    error: Error,
    instance: ComponentPublicInstance | null,
    errorInfo: string
  ) => {
    hasError.value = true;
    err.value = error;
    info.value = errorInfo;
    // emits("error-captured", { error, instance, info });
    useError().setError({ error, instance, info });

    if (props.stopPropagation) return false;
  }
);
</script>
