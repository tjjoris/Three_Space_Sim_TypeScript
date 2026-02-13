import { useSyncExternalStore } from "react";
import SetRendererSize from "../game/setRendererSize";

export default function useLandscapeStore(landscapeStore: SetRendererSize) {
    return useSyncExternalStore(
        (callback) => landscapeStore.subscribe(callback),
        () => landscapeStore.getState()
    );
}