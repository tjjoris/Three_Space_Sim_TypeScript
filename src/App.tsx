/** App.tsx
 *@Author: Luke Johnson
 *this renders the game as well as the menu.
 *it pauses and unpauses the game.
 *
 * **/
import { useRef, useEffect, useState } from "react";
import { start, stop} from './main';
import MenuContainer from "./reactUi/menu/MenuContainer.tsx";
import LandscapeOverlay from "./reactUi/menu/LandscapeOverlay.tsx";
import VJoyUsedOverlay from "./reactUi/menu/VJoyUsedOverlay.tsx";
import Popup from "./reactUi/popup/Popup.tsx";

export default function App() {
    //mountRef is the div that will contain the renderer
    //useRef is used to get a reference to the div
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        //mountRef stands for the div container
        const container = mountRef.current!;

        start(container);
        return () => { stop(); };

    }, []);

    return (
        <>
            <div className="top-overlay" />
            <Popup />
            <LandscapeOverlay />
            <VJoyUsedOverlay />
            <MenuContainer />
            <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
        </>
    );

}
