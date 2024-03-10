import { ref } from "vue"
import { RollRecordInterface } from "../components/RollRecordInterface"

export default function useDice() {
    let result = ref<number>()
    let eachDieResult = ref<number[]>([])
    let roll_history = ref<RollRecordInterface[]>([])
    let id = 0

    let roll = async (amount: number, sides: number, speed: number = 1) => {
        //reset result value each time the operation is executed.
        result.value = 0
        eachDieResult.value = []
        let spin_velocity = speed
        var resistance = Math.random()

        //roll for each individual die
        for (let current_die = 1; current_die <= amount; current_die++, spin_velocity = 1, resistance = Math.random(), ++id) {
            //randomly choose an initial position for the die, even if it is not a whole number
            let current_side = Math.random() * sides + 1
            console.log("Die #: " + current_die + "\nCurrent Side: " + current_side)
            console.log("Current Velocity: " + spin_velocity)
            console.log("Current Resistance: " + resistance)

            //start spinning the die
            while (spin_velocity > 0) {
                //spinning by changing the sides according to the set spin_velocity
                //important to know that this is NOT how a real die spins.
                current_side += spin_velocity
                //if current_side rolls over the amount of sides given, start over to 1, but accounting for any decimals
                if (current_side >= sides + 1)
                    current_side -= sides
                
                spin_velocity -= resistance
                console.log("velocity is now: " + spin_velocity)
                //resistance *= 2
                console.log("resistance is now: " + resistance)
            }
            //end spin
            console.log("Stopped.")
            console.log("Current Velocity: " + spin_velocity)
            console.log("Current Resistance: " + resistance)
            console.log("Before Finished Result: " + current_side)
            current_side = Math.round(current_side)
            console.log("Rounded Result: " + current_side)

            const die_result = (current_side > sides) ? (current_side % sides) : (current_side)
            eachDieResult.value.push(die_result)
            console.log("Added " + die_result + " to " + eachDieResult)
            //round to the nearest side
            result.value += die_result
            console.log("Finished Result: " + result.value)

        }

        //add to roll_history
        roll_history.value.push({
            id: "#" + id,
            eachDieResult: eachDieResult.value,
            finalResult: result.value
        })
    }

    return { result, each_result: eachDieResult, roll, roll_history }
}