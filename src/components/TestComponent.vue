<template>
  <h1>Test Component</h1>
  <button type="button" @click="handleThrowError">Handle throw error</button>
  <ul v-for="(item, index) in renderData" :key="index">
    <li>
      <p v-text="item.id" />
      <p v-text="item.description" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import type { ComputedRef } from "vue";

export interface Data {
  description: string;
  id: number;
}

export interface ComputedData {
  description: string;
  id: string;
}

export interface TestComponentProps {
  shouldManualFail?: boolean;
  data: Data[] | null;
}

const props = withDefaults(defineProps<TestComponentProps>(), {
  shouldManualFail: true,
  data: null,
});

onMounted(() => {
  if (!props.shouldManualFail) {
    throw Error("Throw onMounted fail");
  }
});

const handleThrowError = (): void => {
  throw Error("Throw manual fail");
};

const renderData: ComputedRef<ComputedData[] | null> = computed(() => {
  if (!props.data) return null;
  return props.data.map((el: Data) => {
    return { description: el.description.toUpperCase(), id: el.id.toString() };
  });
});
</script>
