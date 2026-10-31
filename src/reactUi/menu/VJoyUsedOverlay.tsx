import UseGameStateStore from "../../stores/UseGameStateStore";
import { getGameState } from "../../main.ts";

/**
 * react component for encouraging users to switcht to landscape 
 * on mobile.
 * uses useSyncExternalStore (UseGameStateStore.ts) to update from setRendererSize.ts
 * when the window is resied and orientation changes.
 * @param param0 
 * @returns 
 */
export default function VJoyUsedOverlay() {
	const gameState = getGameState();
    const gameStateStore = UseGameStateStore(gameState);
    const isVJoyAlreadyUsed: boolean =  gameStateStore.vJoyUsed;

    // console.log("vjoy used component updated");
    return (

        //if VJoy is already used, show the div component
        !isVJoyAlreadyUsed && (
            <>
                <div className="overlay">
                    Drag the bottom circles, or use your gamepad to control your ship.
                </div>
            </>
        )
    )
}
