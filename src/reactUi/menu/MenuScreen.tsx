import VerticalInverter from "./VerticalInverter"
import HeaderButton from "./HeaderButton";
import MenuButton from "./MenuButton";
import { useState} from "react";
export default function MenuScreen({
    toggleMenu,
}: {
    toggleMenu: () => void,
}) {

	//tabs state for different menu screens.
	const [menuTab, setMenuTab] = useState("info"); 
	
	//function to navigate to menu screen on tab click
//the arrow syntax is more common in react and no {} are needed because it is only calling one function.
	const gotoMenuScreen = (screenName: string) => {
		setMenuTab(screenName);
	};

    return (<>
        <div className="menu-screen">

            <div className="menu-header">
		<HeaderButton name="info" action={gotoMenuScreen} currentTab ={menuTab} />
		<HeaderButton name="keybinds" action={gotoMenuScreen} currentTab={menuTab} />
		<HeaderButton name="settings" action={gotoMenuScreen} currentTab={menuTab} />
            </div>
            <div className="menu-content">
                <div className="menu-div-column">
                    <div>
		    	<VerticalInverter />
                    </div>
                    <MenuButton name="Close Menu" onClick={toggleMenu} />
                </div>
            </div>
        </div >
    </>)
}
