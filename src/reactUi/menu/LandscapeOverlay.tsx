import { useState } from 'react';
import useLandscapeStore from '../../stores/UseLandscapeStore';
import SetRendererSize from '../../game/setRendererSize';

export default function LandscapeOverlay({ setRenderSize }: { setRenderSize: SetRendererSize }) {
    const state: { isLandscape: boolean; } = useLandscapeStore(setRenderSize);

    return (
        //if is landscape is false, show the div component
        !state.isLandscape && (
            <div className="overlay">
                Landscape mode is recommended on your mobile device.
            </div>
        )
    )
}