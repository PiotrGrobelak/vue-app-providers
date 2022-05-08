<template>
  <template v-if="!slots.boundary">
    <slot v-if="!state.hasError"></slot>
    <component v-else-if="props.layout === 'ERROR_PAGE'" :is="ErrorPage" />
    <component
      v-else-if="props.layout === 'ERROR_COMPONENT'"
      :is="ErrorComponent"
    />
    <component
      v-else-if="props.layout === 'ERROR_CUSTOM_COMPONENT'"
      :is="props.customLayout"
    />
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
} from "vue";
import type { Component, ComponentPublicInstance } from "vue";
import ErrorPage from "./ErrorPage.vue";
import ErrorComponent from "./ErrorComponent.vue";
import { ErrorSetSymbol, ErrorClearSymbol, ErrorStateSymbol } from "./index";
import type {
  ErrorLayout,
  ErrorState,
  ErrorCaptured,
} from "./ErrorProvider.model";

/**
 * Docs onErrorCaptured
 * https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured
 */

/**
 * Answer why interface is declared here
 * [@vue/compiler-sfc] type argument passed to defineProps() must be a literal type, or a reference to an interface or literal type.
 * Issue link => https://github.com/vuejs/core/issues/4294
 * In the future the case should be fixed by Vue developers
 */

export interface ErrorProviderProps {
  layout: ErrorLayout;
  customLayout?: Component | null;
  stopPropagation?: boolean;
}

const props = withDefaults(defineProps<ErrorProviderProps>(), {
  layout: "ERROR_PAGE" as ErrorLayout,
  customLayout: null,
  stopPropagation: true,
});

const state: ErrorState = reactive({
  hasError: false,
  error: null,
});

const slots = useSlots();

const setError = (error: ErrorCaptured): void => {
  state.error = error;
};

const clearError = (): void => {
  state.error = null;
};

provide(ErrorStateSymbol, state);
provide(ErrorSetSymbol, setError);
provide(ErrorClearSymbol, clearError);

if (!slots.default && !slots.boundary) {
  console.warn("ErrorProvider component must have child components.");
}

if (props.layout === "ERROR_CUSTOM_COMPONENT" && !props.customLayout) {
  console.warn(
    "If ErrorProvider component have prop ErrorLayout as `ERROR_CUSTOM_COMPONENT` must have declared customLayout prop"
  );
}

onErrorCaptured(
  (error: unknown, instance: ComponentPublicInstance | null, info: string) => {
    // console.log("__CACHED__ERROR__", error);
    state.hasError = true;
    setError({ error, instance, info });

    if (props.stopPropagation) return false;
  }
);

defineExpose({ onErrorCaptured });
</script>
