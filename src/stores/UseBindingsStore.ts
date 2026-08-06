import { useSyncExternalStore } from "react";
import BindingsAndJoysState from "../input/bindingsAndJoysState"

/**
 * the store for linking the class object to the react component.
 * @param InputDiffState 
 * @returns 
 */
export default function useBindingStore(bindingState: BindingsAndJoysState) {
    return useSyncExternalStore(
        (callback) => bindingState.subscribe(callback),
        () => bindingState.getState()
    );
}
