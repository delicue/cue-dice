import { ref } from "vue"

export default function useDice () {
    let result = ref(1)

    function roll (amount: number, sides: number) {
        result.value = amount * Math.floor(Math.random() * sides + 1);
    }

    return { result, roll }
}