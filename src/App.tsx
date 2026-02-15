import { useRef, useEffect, useState } from "react";
import { start, stop, setVerticalInversion } from './main';
import MenuContainer from "./reactUi/menu/MenuContainer.tsx";
import { setCookie, getCookie } from './helpers/cookieHandler.ts';
import LandscapeOverlay from "./reactUi/menu/LandscapeOverlay.tsx";
import VJoyUsedOverlay from "./reactUi/menu/VJoyUsedOverlay.tsx";

export default function App() {
    //read cookie for vertical inversion.
    const isVerticalCookieBool: string | null = getCookie('isVerticalInverted');
    //initially set to false
    let isVerticalBool: boolean = false;
    //if true set
    if (isVerticalCookieBool === "true") {
        isVerticalBool = true;
    }

    //set vertical inversoin for game from the cookie value.
    setVerticalInversion(isVerticalBool);
    //state for vertical inverstion
    const [isVerticalInverted, setIsVerticalInverted] = useState(isVerticalBool);

    //function to toggle vertical inversion
    const toggleInvertVertical = () => {
        const newVertical = !isVerticalInverted;
        setIsVerticalInverted(newVertical);
        setVerticalInversion(newVertical);
        setCookie('isVerticalInverted', newVertical.toString(), 365);
    };

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
            <LandscapeOverlay />
            <VJoyUsedOverlay />
            <MenuContainer
                isVerticalInverted={isVerticalInverted}
                toggleInvertVertical={toggleInvertVertical} />
            <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
        </>
    );
}