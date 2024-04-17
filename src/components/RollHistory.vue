<script lang="ts" setup>
import { RollRecordInterface } from './interfaces/RollRecordInterface';

const records = defineModel<RollRecordInterface[]>()
</script>

<template>
    <div class="p-2 bg-zinc-700 shadow mx-auto rounded min-h-screen h-screen overflow-y-scroll sm:overscroll-contain">
        <h2 class="py-2 text-center text-2xl rounded-t">Roll History</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded p-4 gap-1">
            <div v-for="(record, index) in records" :key="index" class="rounded shadow text-black">
                <ul class="bg-slate-400 rounded min-w-10 text-center shadow shadow-zinc-900"
                    :class="(index == 0) ? 'bg-white text-black' : ''">
                    <li class="">{{ record.id }}</li>
                    <li class="list-item">{{ record.eachDieResult }}</li>
                    <li class="list-item">{{ record.finalResult }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>