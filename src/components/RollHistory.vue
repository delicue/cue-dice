<script lang="ts" setup>
import { RollRecordInterface } from './interfaces/RollRecordInterface';

const records = defineModel<RollRecordInterface[]>()
</script>

<template>
    <div class="container overflow-auto max-h-fit rounded bg-gray-50 border border-slate-200">
        <h2 class="py-2 text-center text-gray-200 text-2xl bg-slate-700">Roll History</h2>
        <div class="grid grid-cols-3 rounded p-4 gap-1">
            <div v-for="(record, index) in records" :key="index" class="rounded" :class="(index == 0) ? 'bg-slate-500 text-white': ''">
                <ul>
                    <li class="">{{ record.id }}</li>
                    <li class="list-item">{{ record.eachDieResult }}</li>
                    <li class="list-item">{{ record.finalResult }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>