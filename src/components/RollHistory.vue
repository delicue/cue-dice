<script lang="ts" setup>
import { RollRecordInterface } from './interfaces/RollRecordInterface';

const records = defineModel<RollRecordInterface[]>()
</script>

<template>
    <h2>Roll History</h2>
    <div class="grid grid-cols-3 rounded p-4">
        <div v-for="(record, index) in records" :key="index" class="bg-gray-800 border rounded">
            <ul>
                <li>{{ record.id }}</li>
                <li>{{ record.eachDieResult }}</li>
                <li>{{ record.finalResult }}</li>
            </ul>
        </div>
    </div>
</template>