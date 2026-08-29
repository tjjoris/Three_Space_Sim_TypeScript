import { useContext } from "react";
import { setRendererSize } from '../../main';
import useLandscapeStore from '../../stores/UseLandscapeStore';
import UseGameStateStore from "../../stores/UseGameStateStore";
import { GameStateContext } from "../contexts/GameStateContext";
import type { GameStateType } from "../../types/gameStateType";

/**
 * react component for encouraging users to switcht to landscape 
 * on mobile.
 * uses useSyncExternalStore (UseLandscapeStore.ts) to update from setRendererSize.ts
 * when the window is resied and orientation changes.
 * @param param0 
 * @returns 
 */
export default function LandscapeOverlay() {
	const gameStateContext = useContext(GameStateContext);
    //const state: { isLandscape: boolean; } = useLandscapeStore(setRendererSize);
	const gameStateType: GameStateType | null = UseGameStateStore(gameStateContext);
	const state: boolean =  gameStateType.landscapeMode  ;

	console.log("in landscape overlay, gamestatetype: ", gameStateType);
    // console.log("component updated");
    return (

        //if is landscape is false, show the div component
        !state && (
            <div className="overlay">
                Landscape mode is recommended on your mobile device.
            </div>
        )
    )
}
