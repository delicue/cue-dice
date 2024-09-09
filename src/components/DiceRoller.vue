<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';
import useDice from '../composables/useDice';
import RollHistory from './RollHistory.vue';
import useButtonEffects from '../composables/useButtonEffects';

const diceAmount = ref(1)
const sides = ref(6)
const speed = ref(10)
let { result, eachDieResult, roll, rollHistory } = useDice()
let { startButtonRepeat, stopButtonRepeat } = useButtonEffects()

const decrementDice = () => {
    if(diceAmount.value > 1)
        diceAmount.value--
}

const incrementDice = () => {
    if(diceAmount.value < 1000){
        diceAmount.value++
    }
}

const decrementSides = () => {
    if (sides.value > 1)
        sides.value--
}

const incrementSides = () => {
    if (sides.value < 1000)
        sides.value++
}

const reset = () => {
    diceAmount.value = 1
    sides.value = 6
    speed.value = 10
    result.value = 0
    eachDieResult.value = []
}
/*RollHistory emitting @clear-history. Must be done on this level due to seeming immutability when passed into RollHistory*/
const clearHistory = () => {
    while (rollHistory.value.length > 0)
        rollHistory.value.pop()
}
const showHistory = ref(true)
</script>

<template>
    <div class="h-screen max-h-screen bg-zinc-800 text-white lg:flex lg:flex-row items-center">
        <div
            class="text-center grid justify-items-center mx-auto container-fluid gap-8 text-gray-800 rounded sm:p-4 basis-8/12 lg:w-3/4 h-3/4">
            <!--Dice Rolling Card-->
            <div class="my-4 p-4 bg-transparent shadow rounded bg-zinc-600 w-3/4 sm:w-1/2 h-3/4 text-zinc-100">
                <h2 class="text-2xl mb-1">Roll Dice</h2>

                <!-----------------------------Amount of Dice--------------------------------------->
                <label class="grid text-center gap-2 m-2 p-2 justify-items-center bg-gray-700 shadow rounded"
                    for="diceAmount">
                    Amount of Dice
                    <div class="flex flex-1">
                        <button type="button" role="button"
                            class="rounded bg-red-400 py-1 sm:py-2 px-3 sm:px-6 hover:opacity-85 active:blur-sm active:rose-300 hover:text-red-400 hover:bg-gray-800 hover:border hover:border-red-400"
                            @mousedown="startButtonRepeat(decrementDice)" @mouseup="stopButtonRepeat"
                            @keydown.space="startButtonRepeat(decrementDice)" @keyup.space="stopButtonRepeat">-</button>
                        <input class="text-center bg-transparent text-white rounded shadow-2xl px-1 sm:px-4 py-1"
                            id="diceAmount" name="diceAmount" type="number" min="1" max="1000" v-model="diceAmount"
                            readonly>
                        <button type="button" role="button"
                            class="rounded bg-emerald-400 py-1 sm:py-2 px-3 sm:px-6 active:blur-sm hover:opacity-85 hover:text-emerald-400 hover:bg-gray-800 hover:border hover:border-emerald-400"
                            @mousedown="startButtonRepeat(incrementDice)" @mouseup="stopButtonRepeat"
                            @keydown.space="startButtonRepeat(decrementDice)" @keyup.space="stopButtonRepeat">+</button>
                    </div>
                </label>
                <!------------------------------Amount of Sides----------------------------------->
                <label class="grid text-center gap-2 m-2 p-2 justify-items-center bg-gray-700 shadow rounded"
                    for="sideAmount">
                    Amount of Sides
                    <div class="flex flex-1">
                        <button type="button" role="button"
                            class="rounded bg-red-400 py-1 sm:py-2 px-3 sm:px-6 hover:opacity-85 active:blur-sm active:rose-300 hover:text-red-400 hover:bg-gray-800 hover:border hover:border-red-400"
                            @mousedown="startButtonRepeat(decrementSides)" @mouseup="stopButtonRepeat"
                            @keydown.space="startButtonRepeat(decrementDice)" @keyup.space="stopButtonRepeat">-</button>
                        <input class="text-center bg-transparent text-white rounded shadow-2xl px-1 sm:px-4 py-1"
                            id="diceAmount" name="sideAmount" type="number" min="1" max="1000" v-model="sides" readonly>
                        <button type="button" role="button"
                            class="rounded bg-emerald-400 py-1 sm:py-2 px-3 sm:px-6 active:blur-sm hover:opacity-85 hover:text-emerald-400 hover:bg-gray-800 hover:border hover:border-emerald-400"
                            @mousedown="startButtonRepeat(incrementSides)" @mouseup="stopButtonRepeat"
                            @keydown.space="startButtonRepeat(decrementDice)" @keyup.space="stopButtonRepeat">+</button>
                    </div>
                </label>

                <!-----------------------------Roll and Reset buttons-------------------------------------------->
                <div class="sm:grid sm:grid-cols-2 gap-2">
                    <!--Roll-->
                    <input
                        class="bg-gray-800 hover:animate-pulse text-2xl hover:bg-slate-400 hover:text-black active:bg-slate-400 active:text-gray-300 px-4 py-2 my-2 shadow-2xl rounded-md mx-1"
                        type="button" role="button" name="rollDiceButton" @click="roll(diceAmount, sides, speed)"
                        :value="'Roll ' + diceAmount + 'd' + sides">
                    <!--Reset-->
                    <input
                        class="text-stone-200 mx-1 from-slate-500 to-stone-500 bg-gradient-to-tl hover:animate-pulse text-2xl hover:bg-slate-400 hover:text-black active:bg-slate-400 active:text-gray-300 px-4 py-2 my-2 shadow-2xl rounded-md"
                        type="button" role="button" name="resetButton" @click="reset" value="Reset">
                </div>

                <!-----------------------------Result Box--------------------------------------------------->
                <div
                    class="h-1/3 p-4 mx-auto my-2 bg-gray-800 border-gray-800 border rounded-md shadow overflow-y-scroll overscroll-contain">
                    <h5 class="mb-2 text-2xl font-bold">{{ result }}</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        {{ eachDieResult }}
                    </p>
                </div>
            </div>
        </div>
        <button
            class="text-gray-900 rounded p-4 basis-1/12 self-start my-4 grid mx-auto lg:mx-4 hover:opacity-85 hover:animate-pulse active:bg-slate-200 active:text-gray-800 active:outline-2"
            :class="showHistory? 'bg-red-400':'bg-emerald-300'" @click="showHistory = !showHistory">
            {{ showHistory ? 'Hide History' : 'Show History' }}
        </button>
        <Transition name="slide-fade">
            <RollHistory v-show="showHistory" v-model="rollHistory" @clear-history="clearHistory" class="basis-3/12" />
        </Transition>
    </div>
</template>
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}
/* we will explain what these classes do next! */
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>