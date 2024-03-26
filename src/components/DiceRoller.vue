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
    <div class="text-center my-4 mx-auto container border border-slate-50 shadow-2xl rounded p-4 flex flex-wrap gap-4">
        <!--Dice Rolling Card-->
        <div class="p-4 m-3 flex-col basis-1/2 self-center border shadow inline-flex mx-auto rounded-md">
            <label for="diceAmount">
                <h2>Amount of Dice</h2>
                <input class="text-center rounded border mx-2" id="diceAmount" name="diceAmount" type="number"
                    v-model="diceAmount">
            </label>
            <label for="diceAmount" class="text-black">
                <h2>Sides</h2>
                <input class="text-center rounded border mx-2" id="sides" name="sides" type="number" v-model="sides">
            </label>
            <input
                class="text-gray-50 text-2xl bg-slate-600 hover:bg-transparent hover:text-black active:bg-slate-800 active:text-gray-200 px-4 py-2 my-2 border rounded-md"
                type="button" role="button" name="rollDiceButton" @click="roll(diceAmount, sides, speed)"
                :value="diceAmount + 'd' + sides">
        </div>
        <div
            class="container mx-auto flex-col basis-1/2 max-w-sm p-4 self-center my-2 border border-gray-200 rounded-md shadow hover:bg-gray-100">
            <h5 class="mb-2 text-2xl font-bold tracking-tight">{{ result }}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">{{ eachDieResult }}</p>
        </div>

        <RollHistory v-model="roll_history" />
    </div>
</template>