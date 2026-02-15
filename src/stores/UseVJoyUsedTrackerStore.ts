import { useSyncExternalStore } from "react";
import VJoyUsedTracker from "../ui/vjoy/vJoyUsedTracker";

/**
 * the store for linking the class object to the react component.
 * @param vJoyUsedObject 
 * @returns 
 */
export default function useLandscapeStore(vJoyUsedObject: VJoyUsedTracker) {
    console.log("ins use sync external store");
    return useSyncExternalStore(
        (callback) => vJoyUsedObject.subscribe(callback),
        () => vJoyUsedObject.getIsVJoyAlreadyUsed()
    );
}