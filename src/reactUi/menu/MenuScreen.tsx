// import React from "react";
import MenuButton from "./MenuButton";
import MenuCheckbox from "./MenuCheckbox";

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
            <div className="menu-padding">
                <div className="menu-div-column">
                    <div>
                        <MenuCheckbox
                            name="Invert Vertical"
                            isChecked={isVerticalInverted}
                            onToggle={toggleInvertVertical} />
                    </div>
                    <MenuButton name="Close Menu" onClick={toggleMenu} />
                </div>
            </div>
        </div >
    </>)
}