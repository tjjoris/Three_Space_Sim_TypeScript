import { useSyncExternalStore } from "react";
import SetRendererSize from "../game/setRendererSize";

/**
 * the store for linking the class object to the react component.
 * links setRendererSize.ts to LandscapeOverlay.tsx.
 * @param landscapeStore 
 * @returns 
 */
export default function useLandscapeStore(landscapeStore: SetRendererSize) {
    console.log("ins use sync external store");
    return useSyncExternalStore(
        (callback) => landscapeStore.subscribe(callback),
        () => landscapeStore.getState()
    );
}