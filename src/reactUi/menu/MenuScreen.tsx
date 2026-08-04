/*
 *MenuScreen.tsx
 @Author: Luke Johnson
 this is the react menu screen for the main menu. it contains the header and all components.
 */
import type {MenuTabsType} from "../../types/menuTabsType"
import SettingsMenuContent from "./SettingsMenuContent";
import InfoMenuContent from "./InfoMenuContent";
import KeybindsMenuContent from "./KeybindsMenuContent";
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
	const tabs:MenuTabsType[] = ['info', 'keybinds', 'settings'];


	/*
	 *function for returning all header buttons. 
	 this function loops through all header buttons, it stores the z-index and if the button is the current one. if it passes the current one, it lowers the z-index by 1.
	 @TODO: make this a seperate component.
	 */
	function retrunHeaderButtons(): React.ReactElement {
		//this is the array of react elements to return.
		let headerButtons: React.ReactElement[] = [];
		//this is the boolean to check if the button is the current menu.
		let localHeaderTabPassedTop: boolean = false;
		//this is the actual z index used in the component it is set to 100 when it is the selected button, otherwise it is 1 if before the selected button, or 49 if after and lowers by 1.
		let localZIndexToBeUsed:number = 1;
		let zIndexTrackedForStacking = 49;
		//loop all elements i the tabs array of MenuTabsType.
		for (let headerButtonIndex:number = 0; headerButtonIndex < tabs.length; headerButtonIndex ++) {
			//check if this is the button for the current tab 
			if (tabs[headerButtonIndex] == menuTab) {
				//set the boolean for tracking.
				localHeaderTabPassedTop = true;
				//set the z index to appear above the menu
				localZIndexToBeUsed = 100;
			}
			else {
				//set the z index behind the menu but with room to lower for additional tabs appearing behind this one.
				localZIndexToBeUsed = zIndexTrackedForStacking;
			}
			//true if has already looped past the current button.
			if (localHeaderTabPassedTop == true) {
				zIndexTrackedForStacking --;
			}
			//add a header button to the array.
			headerButtons.push(
				<HeaderButton name={tabs[headerButtonIndex]} action={gotoMenuScreen} currentTab={menuTab} zIndex={localZIndexToBeUsed} />);
			
		}
		//return the array of header buttons.
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
