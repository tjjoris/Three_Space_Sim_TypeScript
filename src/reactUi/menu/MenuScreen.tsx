// import React from "react";
import HeaderButton from "./HeaderButton";
import MenuCheckbox from "./MenuCheckbox";
import Header from "./Header";
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
	<Header />
	<HeaderButton name="one" action={() => {}} tag="unselected-header-button" />
            <div className="unselected-header-button">
                behind
            </div>
            <div className="selected-header-button">
                in front
            </div>
            <div className="unselected-header-button">
                behind
            </div>
            <div className="menu-content">
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
