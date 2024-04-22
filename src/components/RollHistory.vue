<script lang="ts" setup>
import { RollRecordInterface } from './interfaces/RollRecordInterface';

const records = defineModel<RollRecordInterface[]>()

const emits = defineEmits(['clear-history'])
</script>

<template>
    <div class="p-2 bg-zinc-700 shadow mx-auto rounded min-h-screen h-screen overflow-y-scroll sm:overscroll-contain">
        <h2 class="py-2 text-center text-2xl rounded-t">Roll History</h2>
        <!--Clear button-->
        <button role="button" type="button"
            @click="$emit('clear-history')"
            class="bg-slate-700 container mx-auto py-2 text-stone-200 text-2xl hover:bg-slate-400 hover:text-black active:bg-slate-400 active:text-gray-300 my-2 rounded-md active:opacity-50 active:shadow-slate-700">Clear</button>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded p-4 gap-1">
            <div v-for="(record, index) in records" :key="index" class="rounded shadow text-black">
                <ul class="bg-slate-500 rounded min-w-10 text-center text-stone-200 shadow shadow-zinc-900"
                    :class="(index == 0) ? 'shadow-rose-500 border-emerald-400 border' : ''">
                    <li class="">{{ record.id }}</li>
                    <li class="list-item">{{ record.eachDieResult }}</li>
                    <li class="list-item">{{ record.finalResult }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>