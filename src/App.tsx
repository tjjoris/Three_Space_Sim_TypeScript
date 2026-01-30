import { useRef, useEffect, useState } from "react";
import { start, stop, setVerticalInversion } from './main';
import MenuContainer from "./reactUi/menu/menuContainer";
import { setCookie, logCookie } from './helpers/cookieHandler.ts';

export default function App() {
    const [isVerticalInverted, setIsVerticalInverted] = useState(true);


    const toggleInvertVertical = () => {
        const newVertical = !isVerticalInverted;
        setIsVerticalInverted(newVertical);
        setVerticalInversion(newVertical);
        setCookie('isVerticalInverted', newVertical.toString(), 365);
        logCookie();
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
            <MenuContainer
                isVerticalInverted={isVerticalInverted}
                toggleInvertVertical={toggleInvertVertical} />
            <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
        </>
    );
}