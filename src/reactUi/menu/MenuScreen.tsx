/*
 *MenuScreen.tsx
 @Author: Luke Johnson
 this is the react menu screen for the main menu. it contains the header and all components.
 */
import type {MenuTabsType} from "../../types/menuTabsType"
import MenuHeader from "./MenuHeader";
import SettingsMenuContent from "./SettingsMenuContent";
import InfoMenuContent from "./InfoMenuContent";
import KeybindsMenuContent from "./KeybindsMenuContent";
import MenuButton from "./MenuButton";
import { useState} from "react";

export default function MenuScreen({
    toggleMenu,
}: {
    toggleMenu: () => void,
}) {
	//menu tab state for storing menu tab your in.
	const [menuTab, setMenuTab] = useState<MenuTabsType>("info"); 
	//function to navigate to menu screen on tab click
//the arrow syntax is more common in react and no {} are needed because it is only calling one function.
	const gotoMenuScreen = (screenName: MenuTabsType) => {
		setMenuTab(screenName);
	};

    return (<>
        <div className="menu-screen">

	<MenuHeader menuTab = {menuTab} gotoMenuScreen = {gotoMenuScreen} setMenuTab = {setMenuTab} />
		{menuTab === "info" &&
			<InfoMenuContent />}
		{menuTab === "keybinds" &&
			<KeybindsMenuContent /> }
		{menuTab === "settings" &&	    
		<SettingsMenuContent />  }
		<MenuButton name="Close Menu" onClick={toggleMenu} />
        </div >
    </>)
}
