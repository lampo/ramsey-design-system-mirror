---
to: components/<%= h.inflection.camelize( name ) %>/<%= h.inflection.camelize( name ) %>.vue
---

<script>
export default {
  name: "Rds<%= h.inflection.camelize( name ) %>"
}
</script>

<script setup>
import { computed, ref } from "vue";

const el = ref(null);
defineExpose({ el });

const props = defineProps({});

const <%= h.inflection.camelize( name ) %>Classes = computed(() => [
  "rds-<%= h.inflection.camelize( name ) %>"
]);
</script>

<template>
    <div :class="<%=h.inflection.camelize(name)%>Classes">
    </div>
</template>
