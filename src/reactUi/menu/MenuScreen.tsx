import type {MenuTabsType} from "../../types/menuTabsType"
import SettingsMenuContent from "./SettingsMenuContent";
import InfoMenuContent from "./InfoMenuContent";
import HeaderButton from "./HeaderButton";
import MenuButton from "./MenuButton";
import { useState} from "react";
export default function MenuScreen({
    toggleMenu,
}: {
    toggleMenu: () => void,
}) {

	//tabs state for different menu screens.
	const [menuTab, setMenuTab] = useState<MenuTabsType>("info"); 
	
	//function to navigate to menu screen on tab click
//the arrow syntax is more common in react and no {} are needed because it is only calling one function.
	const gotoMenuScreen = (screenName: MenuTabsType) => {
		setMenuTab(screenName);
	};

    return (<>
        <div className="menu-screen">

            <div className="menu-header">
		<HeaderButton name="info" action={gotoMenuScreen} currentTab ={menuTab} />
		<HeaderButton name="keybinds" action={gotoMenuScreen} currentTab={menuTab} />
		<HeaderButton name="settings" action={gotoMenuScreen} currentTab={menuTab} />
            </div>
		{menuTab === "settings" &&	    
		<SettingsMenuContent />  }
		{menuTab === "info" &&
			<InfoMenuContent />}
		<MenuButton name="Close Menu" onClick={toggleMenu} />
        </div >
    </>)
}
