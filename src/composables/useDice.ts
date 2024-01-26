import { ref } from "vue"

export default function useDice() {
    let result = ref<number>()

    const slow = 1
    const normal = 2
    const fast = 3

    let roll = async (amount: number, sides: number) => {
        //reset result value each time the operation is executed.
        result.value = 0
        let spin_velocity = fast
        var resistance = Math.random()

        //roll for each individual die
        for (let current_die = 0, die_result = 0; current_die < amount; current_die++, spin_velocity = 1, resistance = Math.random()) {
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
                console.log("...spun to " + current_side)
                //if current_side rolls over the amount of sides given, start over to 1, but accounting for any decimals
                if (current_side >= sides + 1) {
                    current_side -= sides
                    console.log("...back to " + current_side)
                }
                spin_velocity -= resistance
                console.log("velocity is now: " + spin_velocity)
                //resistance *= 2
                console.log("resistance is now: " + resistance)
            }
            console.log("Stopped.")
            console.log("Current Velocity: " + spin_velocity)
            console.log("Current Resistance: " + resistance)
            //round the current_side for the die to land on, just in case it's spun more than half-way to another side
            die_result = Math.round(current_side)
            result.value += die_result
        }
    }

    return { result, roll }
}