import type {MenuTabsType} from "../../types/menuTabsType"
import SettingsMenuContent from "./SettingsMenuContent";
import InfoMenuContent from "./InfoMenuContent";
import KeybindsMenuContent from "./KeybindsMenuContent";
import HeaderButton from "./HeaderButton";
import MenuButton from "./MenuButton";
import { useState, useRef} from "react";
export default function MenuScreen({
    toggleMenu,
}: {
    toggleMenu: () => void,
}) {

	//tabs state for different menu screens.
	const [menuTab, setMenuTab] = useState<MenuTabsType>("info"); 
	const tabs:MenuTabsType[] = ['info', 'keybinds', 'settings'];


	/*
	 *function for returning all header buttons. 
	 this function loops through all header buttons, it stores the z-index and if the button is the current one. if it passes the current one, it lowers the z-index by 1.
	 @TODO: make this a seperate component.
	 */
	function retrunHeaderButtons(): React.ReactElement {
		let headerButtons: React.ReactElement[] = [];
		let localHeaderTabPassedTop: boolean = false;
		let localZIndex:number = 100;
		for (let headerButtonIndex:number = 0; headerButtonIndex < tabs.length; headerButtonIndex ++) {
			if (localHeaderTabPassedTop == true) {
				localZIndex --;
			}
			if (tabs[headerButtonIndex] == menuTab) {
				localHeaderTabPassedTop = true;
			}
			headerButtons.push(
				<HeaderButton name={tabs[headerButtonIndex]} action={gotoMenuScreen} currentTab={menuTab} zIndex={localZIndex} />);
			
		}
		return (<>
				{headerButtons}
			</>);

	}

	//function to navigate to menu screen on tab click
//the arrow syntax is more common in react and no {} are needed because it is only calling one function.
	const gotoMenuScreen = (screenName: MenuTabsType) => {
		setMenuTab(screenName);
	};

    return (<>
        <div className="menu-screen">

            <div className="menu-header">
	    	{retrunHeaderButtons()}
            </div>
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
