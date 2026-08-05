import { useSyncExternalStore } from "react";
import from "../input/"

/**
 * the store for linking the class object to the react component.
 * @param InputDiffState 
 * @returns 
 */
export default function useInputDiffStore(inputDiffState: InputDiffState) {
    // console.log("ins use sync external store");
    return useSyncExternalStore(
        (callback) => inputDiffState.subscribe(callback),
        () => inputDiffState.getState()
    );
}
