import { useEffect, useState } from "react";
import { advancePopupQueue, peekNextPopup, setPopupAddedListener } from "./popupLifespan";

const DISPLAY_DURATION_MS = 3000;
const FADE_DURATION_MS = 500;

export default function Popup() {
    const [popupText, setPopupText] = useState<string | null>(() => peekNextPopup());
    const [className, setClassName] = useState("popup");
    const [popupCycle, setPopupCycle] = useState(0);

    useEffect(() => {
        setPopupAddedListener(() => {
            setPopupText((currentPopupText) => currentPopupText ?? peekNextPopup());
            setPopupCycle((currentCycle) => currentCycle + 1);
            setClassName("popup");
        });
        return () => setPopupAddedListener(null);
    }, []);

    useEffect(() => {
        if (!popupText) return;

        const fadeTimer = setTimeout(() => {
            setClassName("popup popup--fade-out");
        }, DISPLAY_DURATION_MS);

        const nextTimer = setTimeout(() => {
            advancePopupQueue();
            setPopupText(peekNextPopup());
            setPopupCycle((currentCycle) => currentCycle + 1);
            setClassName("popup");
        }, DISPLAY_DURATION_MS + FADE_DURATION_MS);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(nextTimer);
        };
    }, [popupText, popupCycle]);

    if (!popupText) return null;

    return <div className={className}>{popupText}</div>;
}