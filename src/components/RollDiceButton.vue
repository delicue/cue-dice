<script setup>
import { ref } from 'vue';
import useDice from '../composables/useDice';
import RollHistory from './RollHistory.vue';

const diceAmount = ref(1)
const sides = ref(6)
const speed = ref(1)
let { result, eachDieResult, roll, roll_history } = useDice()

</script>

<template>
    <div class="rounded justify-items-center">
        <div>
            <div class="rounded p-4 m-2 bg-gray-100 text-black content-center">
                <label for="diceAmount" class="text-black">
                    <h2>Amount of Dice</h2>
                </label>
                <input class="bg-white text-center" id="diceAmount" name="diceAmount" type="number" v-model="diceAmount">
            </div>
            <div class="rounded p-4 m-2 bg-gray-100 text-black content-center">
                <label for="diceAmount" class="text-black">
                    <h2>Sides</h2>
                </label>
                <input class="bg-white text-center" id="sides" name="sides" type="number" v-model="sides">
            </div>
            <button
                class=" bg-slate-700 hover:bg-transparent active:bg-white active:text-gray-50 px-4 py-2 shadow border-2 rounded"
                type="button" name="rollDiceButton" @click="roll(diceAmount, sides, speed)">Roll {{ diceAmount }}d{{ sides }}
            </button>
        </div>

        <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ result }}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">{{ eachDieResult }}</p>
        </div>

        <RollHistory v-model="roll_history"/>
    </div>
</template>