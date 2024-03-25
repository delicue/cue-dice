import { ref } from "vue"
import { RollRecordInterface } from "../components/interfaces/RollRecordInterface"

export default function useDice() {
    let result = ref<number>(0)
    let eachDieResult = ref<number[]>([])
    let roll_history = ref<RollRecordInterface[]>([])
    let id = 0

    let roll = async (diceAmount: number, sides: number, speed: number = 1) => {
        //reset result value each time the operation is executed.
        result.value = 0
        eachDieResult.value = []
        var resistance = Math.random()

        //roll for each individual die
        for (let current_die = 1; current_die <= diceAmount; current_die++, speed = 1, resistance = Math.random()) {
            //randomly choose an initial position for the die, even if it is not a whole number
            let current_side = Math.random() * sides + 1

            //start spinning the die
            while (speed > 0) {
                //spinning by changing the sides according to the set spin_velocity
                //important to know that this is NOT how a real die spins.
                current_side += speed
                //if current_side rolls over the amount of sides given, start over to 1, but accounting for any decimals
                if (current_side >= sides + 1)
                    current_side -= sides
                
                speed -= resistance
            }
            //end spin
            current_side = Math.round(current_side)

            /**
             * If the die result is greater than the amount of sides (due to decimals), roll to 1
             * Ex: 1d6, result: 6.7, 6.7 % 6 == 
             */
            const die_result = (current_side > sides) ? (current_side % sides) : (current_side)
            eachDieResult.value.push(die_result)
            //round to the nearest side
            result.value += die_result
        }
        ++id

        //add to roll_history
        roll_history.value.unshift(<RollRecordInterface>{
            id: "#" + id,
            eachDieResult: eachDieResult.value,
            finalResult: result.value
        })
    }

    return { result, eachDieResult, roll, roll_history }
}