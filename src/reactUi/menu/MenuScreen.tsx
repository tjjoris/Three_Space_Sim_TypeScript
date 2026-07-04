import HeaderButton from "./HeaderButton";
import MenuCheckbox from "./MenuCheckbox";
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

	//tabs state for different menu screens.
	const [menuTab, setMenuTab] = useState("two"); 
	
	//function to navigate to menu screen on tab click
//the arrow syntax is more common in react and no {} are needed because it is only calling one function.
	const gotoMenuScreen = (screenName: string) => {
		setMenuTab(screenName);
	};

    return (<>
        <div className="menu-screen">

            <div className="menu-header">
		<HeaderButton name="one" action={gotoMenuScreen} currentTab ={menuTab} />
		<HeaderButton name="two" action={gotoMenuScreen} currentTab={menuTab} />
		<HeaderButton name="three" action={gotoMenuScreen} currentTab={menuTab} />
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
