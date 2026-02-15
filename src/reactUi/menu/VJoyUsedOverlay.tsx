import VJoyUsedTracker from "../../ui/vjoy/vJoyUsedTracker";
import UseVJoyUsedTrackerStore from "../../stores/UseVJoyUsedTrackerStore"

/**
 * react component for encouraging users to switcht to landscape 
 * on mobile.
 * uses useSyncExternalStore (UseLandscapeStore.ts) to update from setRendererSize.ts
 * when the window is resied and orientation changes.
 * @param param0 
 * @returns 
 */
export default function VJoyUsedOverlay() {
    const isVJoyAlreadyUsed: boolean = UseVJoyUsedTrackerStore(VJoyUsedTracker.getVJoyUsedTracker());

    console.log("vjoy used component updated");
    return (

        //if VJoy is already used, show the div component
        !isVJoyAlreadyUsed && (
            <>
                <div className="overlay">
                    Drag the bottom circles to control your ship.
                </div>
            </>
        )
    )
}