// Define a function to handle the press-and-hold effect
/** */
export default function useButtonEffects() {
    let interval: number = 0
    let vel = 200
    const startButtonRepeat = async (fn: () => any) => {
        fn()
        interval = setInterval(() => {
            fn()
        }, vel)
    }
    const stopButtonRepeat = () => {
        clearInterval(interval)
    }
    
    return { startButtonRepeat, stopButtonRepeat }
}