<script setup>
const props = defineProps({
    records: {
        type: [],
        required: true,
        default: [],
    }
})
</script>

<template>
    <h2>
        <slot name="title"></slot>
    </h2>
    <ul class="bg-gray-200 rounded shadow"
        :key="index">
        <li v-for="(record, index) in props.records" class="text-center text-neutral-800">
            {{ record }}
        </li>
    </ul>
</template>