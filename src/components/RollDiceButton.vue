<script setup>
import { ref } from 'vue';
import useDice from '../composables/useDice';

const diceAmount = ref(1)
const sides = ref(6)
let { result, roll } = useDice()
</script>


<template>
    <div class="rounded p-4 m-2 bg-gray-100 text-black content-center">
        <label v-if="true" for="diceAmount" class="text-black"><h2>Amount of Dice</h2></label>
        <input class="bg-white text-center" id="diceAmount" name="diceAmount" type="number" v-model="diceAmount">
    </div>
    <div class="rounded p-4 m-2 bg-gray-100 text-black content-center">
        <label for="diceAmount" class="text-black"><h2>Sides</h2></label>
        <input class="bg-white text-center" id="sides" name="sides" type="number" v-model="sides">
    </div>            
    <button class=" bg-slate-700 hover:bg-transparent active:bg-white active:text-gray-50 px-4 py-2 shadow border-2 rounded" type="button" name="rollDiceButton" @click="roll(diceAmount, sides)">Roll {{diceAmount}}d{{sides}}</button>
    <h2 class="border shadow m-1 p-10 rounded">{{ result }}</h2>
</template>