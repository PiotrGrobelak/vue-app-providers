<template>
  <template v-if="!slots.boundary">
    <slot v-if="!state.hasError"></slot>
    <component v-else-if="props.layout === 'ERROR_PAGE'" :is="ErrorPage" />
    <component v-else :is="props.fallBack" />
  </template>
  <slot v-else name="boundary"></slot>
</template>

<script setup lang="ts">
import {
  onErrorCaptured,
  provide,
  reactive,
  readonly,
  toRefs,
  useSlots,
  watch,
} from "vue";
import type { ComponentPublicInstance, Component } from "vue";
import { ErrorSetSymbol, ErrorClearSymbol, ErrorStateSymbol } from "./index";
import ErrorFallback from "@/services/ErrorBoundary/ErrorFallback.vue";
import ErrorPage from "./ErrorPage.vue";

export interface ErrorProviderProps {
  layout: string;
  fallBack?: Component | null;
  stopPropagation?: boolean;
}

const props = withDefaults(defineProps<ErrorProviderProps>(), {
  fallBack: null,
  stopPropagation: true,
  layout: "ERROR_PAGE",
});

export type ErrorType = {
  error: Error;
  instance: ComponentPublicInstance | null;
  info: string;
};

export interface ErrorState {
  hasError: boolean;
  error: ErrorType | null;
}

const state: ErrorState = reactive({
  hasError: false,
  error: null,
});

const slots = useSlots();

const setError = (error: ErrorType): void => {
  state.error = error;
};

const clearError = (): void => {
  state.error = null;
};

provide(ErrorStateSymbol, toRefs(readonly(state)));
provide(ErrorSetSymbol, setError);
provide(ErrorClearSymbol, clearError);

if (!slots.default && !slots.boundary) {
  console.warn("ErrorBoundary component must have child components.");
}

watch(
  () => slots,
  () => console.log(slots),
  { deep: true }
);

onErrorCaptured(
  (
    error: Error,
    instance: ComponentPublicInstance | null,
    errorInfo: string
  ) => {
    console.log("eneter");
    state.hasError = true;
    setError({ error: error, instance: instance, info: errorInfo });

    if (props.stopPropagation) return false;
  }
);
</script>
