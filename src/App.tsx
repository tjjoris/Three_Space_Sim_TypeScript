import React, { useRef, useEffect } from "react";
import { start, stop } from './main';

export default function App() {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        //mountRef stands for the div container
        const container = mountRef.current!;

        start(container);
        return () => { stop(); };

    }, []);

    return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}