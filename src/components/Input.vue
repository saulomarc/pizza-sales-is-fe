<script setup lang="ts">

defineProps<{
    type: string,
    id: string,
    name: string
}>()

</script>

<template>
    <input v-bind="$attrs" class="border p-1 rounded-md">
</template>