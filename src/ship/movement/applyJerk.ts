/**
 * applies jerk based on delta time.
 * @param deltaTime 
 * @param desiredValue 
 * @param currentValue 
 * @param increaseRate 
 * @returns 
 */
export default function applyJerk(
    deltaTime: number,
    desiredValue: number,
    currentValue: number,
    increaseRate: number): number {
    //if positve jerk and current equal or above:
    if ((increaseRate > 0) && (currentValue >= desiredValue)) {
        return currentValue;
    }
    //if negative jerk and current equal or below:
    if ((increaseRate < 0) && (currentValue <= desiredValue)) {
        return currentValue;
    }

    return currentValue += (increaseRate * deltaTime)
}