<template>
  <div>
    <div>Error fallback with</div>
    <button type="button" @click="handleReload">Ok reload</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{
  params: any;
}>();

console.log("params", props.params);

const router = useRouter();

const handleReload = () => {
  router.go(0);
};
</script>
