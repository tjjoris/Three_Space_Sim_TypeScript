import { useState } from 'react';
import useLandscapeStore from '../../stores/UseLandscapeStore';
import SetRendererSize from '../../game/setRendererSize';

/**
 * react component for encouraging users to switcht to landscape 
 * on mobile.
 * uses useSyncExternalStore (UseLandscapeStore.ts) to update from setRendererSize.ts
 * when the window is resied and orientation changes.
 * @param param0 
 * @returns 
 */
export default function LandscapeOverlay({ setRenderSize }: { setRenderSize: SetRendererSize }) {
    const state: { isLandscape: boolean; } = useLandscapeStore(setRenderSize);

    console.log("component updated");
    return (

        //if is landscape is false, show the div component
        !state.isLandscape && (
            <div className="overlay">
                Landscape mode is recommended on your mobile device.
            </div>
        )
    )
}