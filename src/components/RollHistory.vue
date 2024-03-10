<script lang="ts" setup>
import { RollRecordInterface } from './RollRecordInterface';


const records = defineModel<RollRecordInterface[]>()
</script>

<template>
    <h2>Roll History</h2>
    <div class="grid grid-cols-3 border border-blue-200 rounded-2xl p-4">
        
        <div v-for="(record, index) in records" :key="index" class="">
            <ul>
                <li>{{ record.id }}</li>
            </ul>
        </div>
        
    </div>
</template>