import { useSyncExternalStore } from "react";
import GameState from "../ui/menu/gameState"
//import type { GameStateType } from "../types/gameStateType";

/**
 * the store for linking the class object to the react component.
 * @param GameState 
 * @returns 
 */
export default function useGameStateStore(gameState: GameState) {
    return useSyncExternalStore(
        (callback) => gameState.subscribe(callback),
        () => gameState.getState()
    );
}
