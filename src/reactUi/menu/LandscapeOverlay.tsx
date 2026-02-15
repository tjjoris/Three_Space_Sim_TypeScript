import { setRendererSize } from '../../main';
import useLandscapeStore from '../../stores/UseLandscapeStore';

/**
 * react component for encouraging users to switcht to landscape 
 * on mobile.
 * uses useSyncExternalStore (UseLandscapeStore.ts) to update from setRendererSize.ts
 * when the window is resied and orientation changes.
 * @param param0 
 * @returns 
 */
export default function LandscapeOverlay() {
    const state: { isLandscape: boolean; } = useLandscapeStore(setRendererSize);

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