import React, { useRef, useEffect, useState } from "react";
import { start, stop } from './main';
import MenuContainer from "./reactUi/menu/menuContainer";

export default function App() {
    const [verticalInverted, setVerticalInverted] = useState(true);

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
            <MenuContainer />
            <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
        </>
    );
}