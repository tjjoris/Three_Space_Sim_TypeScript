// import React from "react";
import HeaderButton from "./HeaderButton";
import MenuCheckbox from "./MenuCheckbox";
import Header from "./Header";
import MenuButton from "./MenuButton";
import { useState} from "react";

export default function MenuScreen({
    toggleMenu,
    isVerticalInverted,
    toggleInvertVertical
}: {
    toggleMenu: () => void,
    isVerticalInverted: boolean,
    toggleInvertVertical: () => void
}) {

	const [menuTab, setMenuTab] = useState("two"); 
    return (<>
        <div className="menu-screen">

            <div className="menu-header">
		<HeaderButton name="one" action={() => {}} currentTab ={menuTab} />
		<HeaderButton name="two" action={() => {}} currentTab={menuTab} />
		<HeaderButton name="three" action={() => {}} currentTab={menuTab} />
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
