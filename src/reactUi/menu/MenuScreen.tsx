import React from "react";
import MenuButton from "./MenuButton";

export default function MenuScreen({
    toggleMenu,
    isVerticalInverted,
    toggleInvertVertical
}: {
    toggleMenu: () => void,
    isVerticalInverted: boolean,
    toggleInvertVertical: () => void
}) {
    return (<>
        <div className="menu-screen">
            <MenuButton name="Close Menu" onClick={toggleMenu} />
        </div>
    </>)
}